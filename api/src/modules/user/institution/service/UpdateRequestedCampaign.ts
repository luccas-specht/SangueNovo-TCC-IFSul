import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { CampaignStatus } from '@modules/campaing/infra/typeorm/entities/EnumCampaignStatus';

interface Request {
  campaign_id: string;
  new_status: any;
}

@injectable()
export class UpdateRequestedCampaignService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository
  ) {}

  public async execute({ campaign_id, new_status }: Request): Promise<void> {
    const campaign = await this.campaignRepository.findById(campaign_id);
    if (!campaign) throw new AppError(MESSAGEINVALID.campaignNotExists);

    if (
      ![
        CampaignStatus.ACTIVE,
        CampaignStatus.FINISHED,
        CampaignStatus.REFUSED,
        CampaignStatus.REQUESTED,
      ].includes(new_status)
    )
      throw new AppError(MESSAGEINVALID.invalidStatus);

    if (campaign.campaignStatus === new_status)
      throw new AppError(MESSAGEINVALID.statusNotChanged);

    campaign.campaignStatus = new_status;
    await this.campaignRepository.updateCampaign(campaign);
  }
}
