import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '../IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';

interface Request {
  status: any;
}

@injectable()
export class ListCampaignsByStatusService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository
  ) {}

  public async execute({ status }: Request): Promise<any[]> {
    if (
      ![
        CampaignStatus.ACTIVE,
        CampaignStatus.REQUESTED,
        CampaignStatus.FINISHED,
        CampaignStatus.REFUSED,
      ].includes(status)
    )
      throw new AppError(MESSAGEINVALID.invalidStatus);

    const campaigns = await this.campaignRepository.ListAllCampaigns(status);
    return campaigns.length > 0 ? this.mapperCampaign(campaigns) : [];
  }

  private mapperCampaign(campaigns: AppCampaign[]): AppCampaign[] {
    return campaigns.map(
      (campaign) =>
        ({
          id: campaign.id,
          title: campaign.title,
          avatar: campaign.avatar,
          priority: campaign.priority,
          typeBlood: campaign.typeBlood,
          description: campaign.description,
          availableDate: campaign.availableDate,
          campaignStatus: campaign.campaignStatus,
        } as AppCampaign)
    );
  }
}
