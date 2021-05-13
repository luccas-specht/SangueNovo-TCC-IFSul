import { injectable, inject } from 'tsyringe';
import { isBefore, isEqual, parseISO } from 'date-fns';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { ICampaignRepository } from '../IRepository/ICampaingRepository';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';
import { Priority } from '../infra/typeorm/entities/EnumPriority';
import { TypeBlood } from '../infra/typeorm/entities/EnumTypeBlood';

interface Request {
  title: string;
  description: string;
  availableDate: string;
  goal: number;
  typeBlood: any;
  priority: any;
  user_id: string;
  institution_id: string;
  // avatar: any;
}

@injectable()
export class CreateCampaignService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({
    title,
    description,
    availableDate,
    goal,
    typeBlood,
    priority,
    // avatar,
    user_id,
    institution_id,
  }: Request): Promise<void> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    const institution = await this.institutionRepository.findById(
      institution_id
    );
    if (!institution) throw new AppError(MESSAGEINVALID.institutionNotExists);

    if (goal <= 0) throw new AppError(MESSAGEINVALID.invalidNumber);

    if (![Priority.HIGH, Priority.LESS, Priority.MEDIUM].includes(priority))
      throw new AppError(MESSAGEINVALID.invalidPriority);

    if (
      ![
        TypeBlood.TYPE_AB_NEGATIVE,
        TypeBlood.TYPE_AB_POSITIVE,
        TypeBlood.TYPE_A_NEGATIVE,
        TypeBlood.TYPE_A_POSITIVE,
        TypeBlood.TYPE_B_NEGATIVE,
        TypeBlood.TYPE_B_POSITIVE,
        TypeBlood.TYPE_O_NEGATIVE,
        TypeBlood.TYPE_O_POSITIVE,
      ].includes(typeBlood)
    )
      throw new AppError(MESSAGEINVALID.invalidTypeBlood);

    /*TODO: não pode ser possivel criar uma campanha com data menor que a atual*/
    /*TODO: não pode ser possivel criar uma campanha data igual a atual*/

    const campaign = {
      title: title,
      description: description,
      availableDate: parseISO(availableDate),
      goal: goal,
      typeBlood: typeBlood,
      priority: priority,
      campaignStatus: CampaignStatus.REQUESTED,
      user: user,
      institution: institution,
    } as AppCampaign;

    await this.campaignRepository.save(campaign);
  }
}
