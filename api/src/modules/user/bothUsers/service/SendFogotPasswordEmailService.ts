import { injectable, inject } from 'tsyringe';
import path from 'path';

import { AppError } from '@shared/errors/appError';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

import { IUserRepository } from '../IRepository/IUserRepository';
import { IUserTokenRepository } from '../IRepository/IUserTokenRepository';
import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';

import { MESSAGEINVALID } from '@constants/messageToUser';

interface Request {
  email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository,

    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError(MESSAGEINVALID.emailNotFound, 400);

    const { token_id } = await this.userTokenRepository.generate(user.id);

    const userName = await this.findUserAssociated(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: userName,
        email: user.email,
      },
      subject: '[Sangue Novo] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userName,
          link: `http://localhost:3000/redefinir-senha?token=${token_id}`,
        },
      },
    });
  }

  private async findUserAssociated(userId: string): Promise<string> {
    let userType: any;

    userType = await this.donatorRepository.findByIdUser(userId);

    if (!userType)
      userType = await this.institutionRepository.findByIdUser(userId);

    const { name, razao_social } = userType;

    return name ?? razao_social;
  }
}
