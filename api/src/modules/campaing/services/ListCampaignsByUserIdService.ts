import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';

interface Request {
  user_id: string;
}

@injectable()
export class ListCampaignsByUserIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository
  ) {}

  public async execute({ user_id }: Request): Promise<AppCampaign[]> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    const campaigns = await this.campaignRepository.ListAllCampaigns();

    return campaigns.length > 0
      ? campaigns.filter((campaign) => campaign.user.id === user_id)
      : campaigns;
  }
}
