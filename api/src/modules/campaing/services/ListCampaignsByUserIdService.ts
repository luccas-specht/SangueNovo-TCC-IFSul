import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';

interface Request {
  user_id: string;
}

interface Response {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  goal: number;
  availableDate: Date;
  typeBlood: string;
  campaignStatus: string;
  priority: string;
  creatorUser: string;
  institution: {
    id: string;
    razao_social: string;
    address: {
      latitude: string;
      longitude: string;
    };
  };
}

@injectable()
export class ListCampaignsByUserIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository
  ) {}

  public async execute({ user_id }: Request): Promise<Response[]> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    const campaigns = await this.campaignRepository.ListAllCampaigns(
      CampaignStatus.ACTIVE
    );

    return campaigns.length > 0
      ? this.filterByUserId(this.mapperCampaigns(campaigns), user_id)
      : [];
  }

  private mapperCampaigns(list: AppCampaign[]): Response[] {
    return list.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      avatar: campaign.avatar,
      goal: campaign.goal,
      availableDate: campaign.availableDate,
      typeBlood: campaign.typeBlood,
      campaignStatus: campaign.campaignStatus,
      priority: campaign.priority,
      creatorUser: campaign.user.id,
      institution: {
        id: campaign.institution.id,
        razao_social: campaign.institution.razao_social,
        address: {
          latitude: campaign.institution.latitude,
          longitude: campaign.institution.longitude,
        },
      },
    }));
  }

  private filterByUserId(list: Response[], userId: string): Response[] {
    return list.filter((campaign) => campaign.creatorUser === userId);
  }
}
