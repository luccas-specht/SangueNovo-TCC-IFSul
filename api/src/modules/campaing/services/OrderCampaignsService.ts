import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';

type Request = {
  title: string | null;
  distance: {
    userPosition: string[];
    kilometers: string[];
  };
  bloodTypes: string[];
  institutionsIds: string[];
  prioritys: string[];
};

@injectable()
export class OrderCampaignsService {
  constructor(
    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository,

    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository
  ) {}

  public async execute({
    title,
    distance,
    prioritys,
    bloodTypes,
    institutionsIds,
  }: Request): Promise<any> {
    const allCampaigns = await this.campaignRepository.ListAllCampaigns(
      CampaignStatus.ACTIVE
    );

    return this.verifyFiltersExist({
      title,
      distance,
      prioritys,
      bloodTypes,
      institutionsIds,
    })
      ? 'tem filtro'
      : this.mapperCampaigns(allCampaigns);
  }

  private verifyFiltersExist({
    title,
    distance,
    prioritys,
    bloodTypes,
    institutionsIds,
  }: Request): boolean {
    if (
      !title &&
      Object.keys(distance).length === 0 &&
      prioritys.length === 0 &&
      bloodTypes.length === 0 &&
      institutionsIds.length === 0
    )
      return false;
    return true;
  }

  private mapperCampaigns(campaigns: AppCampaign[]) {
    return campaigns.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      avatar: campaign.avatar,
      goal: campaign.goal,
      availableDate: campaign.availableDate,
      typeBlood: campaign.typeBlood,
      campaignStatus: campaign.campaignStatus,
      priority: campaign.priority,
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
}
