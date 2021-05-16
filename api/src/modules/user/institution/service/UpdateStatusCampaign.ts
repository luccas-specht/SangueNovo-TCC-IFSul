import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { CampaignStatus } from '@modules/campaing/infra/typeorm/entities/EnumCampaignStatus';
import { IInstitutionRepository } from '../IRepository/IInstitutionRepository';

interface Request {
  institution_id: string;
  campaign_id: string;
  new_status: any;
}

@injectable()
export class UpdateStatusCampaignService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({
    institution_id,
    campaign_id,
    new_status,
  }: Request): Promise<void> {
    const campaign = await this.campaignRepository.findById(campaign_id);
    if (!campaign) throw new AppError(MESSAGEINVALID.campaignNotExists);

    const institution = await this.institutionRepository.findById(
      institution_id
    );
    if (!institution) throw new AppError(MESSAGEINVALID.institutionNotExists);

    if (campaign.institution.id !== institution_id)
      throw new AppError(MESSAGEINVALID.institutionNotMatchWithCampaign);

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
