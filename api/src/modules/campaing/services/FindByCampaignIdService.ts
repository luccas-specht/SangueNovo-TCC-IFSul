import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '../IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';

interface Request {
  campaign_id: string;
}

@injectable()
export class FindByCampaignIdService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository
  ) {}

  public async execute({ campaign_id }: Request): Promise<{}> {
    const campaign = await this.campaignRepository.findById(campaign_id);
    if (!campaign) throw new AppError(MESSAGEINVALID.campaignNotExists);

    return this.mapperCampaign(campaign);
  }

  private mapperCampaign(campaign: AppCampaign) {
    return {
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
    };
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
