import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '../IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { DonationStatus } from '@modules/donation/infra/typeorm/entities/EnumDonationStatus';

interface Request {
  status: any;
  institution_id: string;
}

@injectable()
export class ListCampaignsByStatusService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({ status, institution_id }: Request): Promise<any[]> {
    if (
      ![
        CampaignStatus.ACTIVE,
        CampaignStatus.REQUESTED,
        CampaignStatus.FINISHED,
        CampaignStatus.REFUSED,
      ].includes(status)
    )
      throw new AppError(MESSAGEINVALID.invalidStatus);

    const institution = await this.institutionRepository.findById(
      institution_id
    );
    if (!institution) throw new AppError(MESSAGEINVALID.institutionNotExists);

    const campaigns = await this.campaignRepository.ListAllCampaigns(status);
    return campaigns.length > 0
      ? this.mapperCampaign(campaigns, institution_id)
      : [];
  }

  private mapperCampaign(
    campaigns: AppCampaign[],
    institution_id: string
  ): any[] {
    const filteredCampaignsByInstitutionId = campaigns.filter(
      (campaign) => campaign.institution.id === institution_id
    );

    return filteredCampaignsByInstitutionId.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      avatar: campaign.avatar,
      currentGoal: this.calculatePercentage(campaign.goal, campaign.donations),
      priority: campaign.priority,
      bloodType: campaign.typeBlood,
      description: campaign.description,
      availableDate: campaign.availableDate,
      campaignStatus: campaign.campaignStatus,
    }));
  }

  private calculatePercentage(inicialGoal: number, actualDonations: any[]) {
    const currentDonationsFinished = actualDonations.filter(
      (donations) => donations?.donationStatus === DonationStatus.FINISHED
    );
    let totalDonations = currentDonationsFinished.length;
    if (totalDonations) {
      totalDonations = totalDonations * 50;
      const result = totalDonations / inicialGoal;
      return result.toPrecision(2);
    } else {
      return '0';
    }
  }
}
