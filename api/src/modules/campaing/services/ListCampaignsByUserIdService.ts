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
  priority: string;
  creatorUserId: string;
  institution: {
    id: string;
    razao_social: string;
    address: {
      latitude: number;
      longitude: number;
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

  public async execute({ user_id }: Request): Promise<any[]> {
    console.log('user', user_id);
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    const campaigns = await this.campaignRepository.ListAllCampaigns(
      CampaignStatus.ACTIVE
    );

    return campaigns.length > 0 ? this.filterByUserId(campaigns, user_id) : [];
  }

  private filterByUserId(list: AppCampaign[], userId: string): any[] {
    const filteredList = list.filter((campaign) => campaign.user.id === userId);
    return this.mapperCampaigns(filteredList);
  }

  private mapperCampaigns(list: AppCampaign[]): any[] {
    return list.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      avatar: campaign.avatar,
      currentGoal: this.calculatePercentage(
        campaign.goal,
        campaign.donations.length
      ),
      availableDate: campaign.availableDate,
      bloodType: campaign.typeBlood,
      priority: campaign.priority,
      creatorUserId: campaign.user.id,
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

  private calculatePercentage(inicialGoal: number, actualDonations: number) {
    if (actualDonations) {
      actualDonations = actualDonations * 50;
      const result = actualDonations / inicialGoal;
      return result.toPrecision(4);
    } else {
      return '0';
    }
  }
}
