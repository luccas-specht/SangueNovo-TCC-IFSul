import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { Priority } from '../infra/typeorm/entities/EnumPriority';
import { TypeBlood } from '../infra/typeorm/entities/EnumTypeBlood';

type Request = {
  title: string | null;
  bloodTypes: string[];
  institutionId: string | null;
  priorities: string[];
};

@injectable()
export class OrderCampaignsService {
  private PRIORITIES = [Priority.HIGH, Priority.MEDIUM, Priority.LESS];

  private BLOOD_TYPES = [
    TypeBlood.TYPE_AB_NEGATIVE,
    TypeBlood.TYPE_AB_POSITIVE,
    TypeBlood.TYPE_A_NEGATIVE,
    TypeBlood.TYPE_A_POSITIVE,
    TypeBlood.TYPE_B_NEGATIVE,
    TypeBlood.TYPE_B_POSITIVE,
    TypeBlood.TYPE_O_NEGATIVE,
    TypeBlood.TYPE_O_POSITIVE,
  ];

  constructor(
    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository,

    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository
  ) {}

  public async execute({
    title,
    priorities,
    bloodTypes,
    institutionId,
  }: Request): Promise<any> {
    const campaigns = await this.campaignRepository.ListAllCampaigns(
      CampaignStatus.ACTIVE
    );

    const filters = await this.verifyFiltersExist({
      title,
      priorities,
      bloodTypes,
      institutionId,
    });

    return filters
      ? this.applyFilters(filters, campaigns)
      : this.mapperCampaigns(campaigns);
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

  private async verifyFiltersExist({
    title,
    priorities,
    bloodTypes,
    institutionId,
  }: Request) {
    const filters = {} as any;
    if (
      !title &&
      !institutionId &&
      priorities.length === 0 &&
      bloodTypes.length === 0
    )
      return false;

    if (title) filters.title = title;
    await this.verifyInstitutionExist(institutionId);
    filters.institutionId = institutionId;
    this.verifyPrioritiesIsValid(priorities);
    filters.priorities = priorities;
    this.verifyBloodTypesIsValid(bloodTypes);
    filters.bloodTypes = bloodTypes;
    return filters;
  }

  public async verifyInstitutionExist(institutionId: string | null) {
    if (institutionId) {
      const institution = await this.institutionRepository.findById(
        institutionId
      );
      if (!institution) throw new AppError(MESSAGEINVALID.institutionNotExists);
    }
  }

  private verifyPrioritiesIsValid(priorities: string[]): void {
    if (priorities.length > 0) {
      const hasValues = this.PRIORITIES.filter((priority) =>
        priorities.includes(priority)
      );
      if (hasValues.length === 0)
        throw new AppError(MESSAGEINVALID.invalidPriority);
    }
  }

  private verifyBloodTypesIsValid(bloodTypes: string[]): void {
    if (bloodTypes.length > 0) {
      const hasValues = this.BLOOD_TYPES.filter((priority) =>
        bloodTypes.includes(priority)
      );
      if (hasValues.length === 0)
        throw new AppError(MESSAGEINVALID.invalidTypeBlood);
    }
  }

  private async applyFilters(
    filters: Request,
    campaigns: AppCampaign[]
  ): Promise<any> {
    const campaignsFiltered: AppCampaign[] = [];

    if (filters.institutionId) {
      const campaignsFilteredByInstitutionId = campaigns.filter(
        (campaign) => campaign.institution.id === filters.institutionId
      );
      if (campaignsFilteredByInstitutionId.length > 0)
        campaignsFiltered.push(...campaignsFilteredByInstitutionId);
    }

    if (filters.title) {
      const campaignsFilteredByTitle = campaigns.filter(
        (campaign) => campaign.title === filters.title
      );
      if (campaignsFilteredByTitle.length > 0)
        campaignsFiltered.push(...campaignsFilteredByTitle);
    }

    if (filters.priorities.length > 0) {
      const campaignsFilteredByPriorities = campaigns.filter((campaign) =>
        filters.priorities.includes(campaign.priority)
      );
      if (campaignsFilteredByPriorities.length > 0)
        campaignsFiltered.push(...campaignsFilteredByPriorities);
    }

    if (filters.bloodTypes.length > 0) {
      const campaignsFilteredByBloodTypes = campaigns.filter((campaign) =>
        filters.bloodTypes.includes(campaign.typeBlood)
      );
      if (campaignsFilteredByBloodTypes.length > 0)
        campaignsFiltered.push(...campaignsFilteredByBloodTypes);
    }

    const uniqueValues = [...new Set(campaignsFiltered)] as AppCampaign[];
    return this.mapperCampaigns(uniqueValues);
  }
}
