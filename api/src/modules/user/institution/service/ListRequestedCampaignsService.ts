import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { CampaignStatus } from '@modules/campaing/infra/typeorm/entities/EnumCampaignStatus';
import { AppCampaign } from '@modules/campaing/infra/typeorm/entities/AppCampaign';

import { IInstitutionRepository } from '../IRepository/IInstitutionRepository';

interface Request {
  institution_id: string;
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
}

@injectable()
export class ListRequestedCampaignsService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({ institution_id }: Request): Promise<Response[]> {
    const institution = await this.institutionRepository.findById(
      institution_id
    );
    if (!institution) throw new AppError(MESSAGEINVALID.userNotExists);

    const campaigns = await this.campaignRepository.ListAllCampaigns(
      CampaignStatus.REQUESTED
    );
    return campaigns.length > 0
      ? this.mapperCampaigns(campaigns, institution_id)
      : [];
  }

  private filterByInstitutionId(
    list: AppCampaign[],
    institution_id: string
  ): AppCampaign[] {
    return list.filter(
      (campaign) => campaign.institution.id === institution_id
    );
  }

  private mapperCampaigns(
    list: AppCampaign[],
    institution_id: string
  ): Response[] {
    const filterCampaigns = this.filterByInstitutionId(list, institution_id);
    return filterCampaigns.map((campaign) => ({
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
    }));
  }
}
