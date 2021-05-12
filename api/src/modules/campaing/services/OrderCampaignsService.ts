import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { AppInstitution } from '@modules/user/institution/infra/typeorm/entities/AppInstitution';
import { Priority } from '../infra/typeorm/entities/EnumPriority';
import { TypeBlood } from '../infra/typeorm/entities/EnumTypeBlood';

type Request = {
  title: string | null;
  bloodTypes: string[];
  institutionId: string;
  priorities: string[];
};

interface ApplyFilter extends Request {
  campaigns: AppCampaign[];
}

type ResponseVerifyFilters = Request | false;

@injectable()
export class OrderCampaignsService {
  private PRIORITIES_VALIDS = [Priority.HIGH, Priority.MEDIUM, Priority.LESS];

  private BLOOD_TYPES_VALIDS = [
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

    const filters = this.verifyFiltersExist({
      title,
      priorities,
      bloodTypes,
      institutionId,
    });

    return filters
      ? this.applyFilters({ ...filters, campaigns })
      : this.mapperCampaigns(campaigns);
  }

  private verifyFiltersExist({
    title,
    priorities,
    bloodTypes,
    institutionId,
  }: Request): ResponseVerifyFilters {
    const filters = {
      title: '',
      priorities: [] as any,
      bloodTypes: [] as any,
      institutionId: '',
    };
    if (
      !title &&
      !institutionId &&
      priorities.length === 0 &&
      bloodTypes.length === 0
    )
      return false;

    if (title) filters.title = title;
    this.verifyInstitutionExist(institutionId);
    filters.institutionId = institutionId;
    this.verifyPrioritiesIsValid(priorities);
    filters.priorities = priorities;
    this.verifyBloodTypesIsValid(bloodTypes);
    filters.bloodTypes = bloodTypes;
    return filters;
  }

  public async verifyInstitutionExist(institutionId: string): Promise<void> {
    const institution = await this.institutionRepository.findById(
      institutionId
    );
    if (!institution) throw new AppError(MESSAGEINVALID.institutionNotExists);
  }

  private verifyPrioritiesIsValid(priorities: string[]): void {
    if (priorities.length > 0) {
      const hasValues = this.PRIORITIES_VALIDS.filter((priority) =>
        priorities.includes(priority)
      );
      if (hasValues.length === 0)
        throw new AppError(MESSAGEINVALID.invalidPriority);
    }
  }

  private verifyBloodTypesIsValid(bloodTypes: string[]): void {
    if (bloodTypes.length > 0) {
      const hasValues = this.BLOOD_TYPES_VALIDS.filter((priority) =>
        bloodTypes.includes(priority)
      );
      if (hasValues.length === 0)
        throw new AppError(MESSAGEINVALID.invalidTypeBlood);
    }
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

  private async applyFilters(filters: ApplyFilter): Promise<AppCampaign[]> {
    let filteredCampaigns = filters.campaigns;

    if (filters.institutionId) {
      filteredCampaigns = filteredCampaigns.filter(
        (e) => e.institution.id === filters.institutionId
      );
    }

    if (filters.title) {
      filteredCampaigns = filteredCampaigns.filter(
        (e) => e.title === filters.title
      );
    }

    return filteredCampaigns;
  }
}
