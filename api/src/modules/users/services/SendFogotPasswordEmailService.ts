import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(    
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvier: IMailProvider,
) {}
  
  public async execute({ email }: Request): Promise<void> {
      const checkUserExists = await this.usersRepository.findByEmail(email);
      
      if(!checkUserExists) throw new AppError('e-mail não cadastrado.', 400);

      this.mailProvier.sendMail(email, 'recupera ai cpx')
  };

};

export { SendForgotPasswordEmailService };
