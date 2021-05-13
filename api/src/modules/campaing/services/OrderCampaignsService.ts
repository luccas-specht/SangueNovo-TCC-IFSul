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

  private campaignsFiltered: AppCampaign[] = [];

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

    filters.title = title;
    await this.verifyInstitutionExist(institutionId);
    filters.institutionId = institutionId;
    this.verifyArrayElementsAreValid(
      priorities,
      this.PRIORITIES,
      MESSAGEINVALID.invalidPriority
    );
    filters.priorities = priorities;
    this.verifyArrayElementsAreValid(
      bloodTypes,
      this.BLOOD_TYPES,
      MESSAGEINVALID.invalidTypeBlood
    );
    filters.bloodTypes = bloodTypes;
    return filters;
  }

  private async verifyInstitutionExist(institutionId: string | null) {
    if (institutionId) {
      const institution = await this.institutionRepository.findById(
        institutionId
      );
      if (!institution) throw new AppError(MESSAGEINVALID.institutionNotExists);
    }
  }

  private verifyArrayElementsAreValid(
    array: string[],
    arrayToCompare: Array<any>,
    errorMessage: string
  ) {
    if (array.length > 0) {
      const hasValues = arrayToCompare.filter((value) => array.includes(value));
      if (hasValues.length === 0) throw new AppError(errorMessage);
    }
  }

  private addToCampaignFiltered(filter: any, campaigns: any) {
    if (filter || filter?.length > 0) {
      if (campaigns?.length > 0) this.campaignsFiltered.push(...campaigns);
    }
  }

  private async applyFilters(
    filters: Request,
    campaigns: AppCampaign[]
  ): Promise<any> {
    this.addToCampaignFiltered(
      filters.institutionId,
      campaigns.filter(
        (campaign) => campaign.institution.id === filters.institutionId
      )
    );

    this.addToCampaignFiltered(
      filters.title,
      campaigns.filter((campaign) => campaign.title === filters.title)
    );

    this.addToCampaignFiltered(
      filters.priorities,
      campaigns.filter((campaign) =>
        filters.priorities.includes(campaign.priority)
      )
    );

    this.addToCampaignFiltered(
      filters.bloodTypes,
      campaigns.filter((campaign) =>
        filters.bloodTypes.includes(campaign.typeBlood)
      )
    );

    const uniqueValues = [...new Set(this.campaignsFiltered)] as AppCampaign[];
    return this.mapperCampaigns(uniqueValues);
  }
}
