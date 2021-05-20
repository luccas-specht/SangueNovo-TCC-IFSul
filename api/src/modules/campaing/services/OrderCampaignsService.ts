import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { Priority } from '../infra/typeorm/entities/EnumPriority';
import { TypeBlood } from '../infra/typeorm/entities/EnumTypeBlood';
import { isUuid } from 'uuidv4';

type Request = {
  title: any;
  bloodType: any;
  institutionId: any;
  priority: any;
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
    priority,
    bloodType,
    institutionId,
  }: Request): Promise<any> {
    const campaigns = await this.campaignRepository.ListAllCampaigns(
      CampaignStatus.ACTIVE
    );

    const filters = await this.verifyFiltersExist({
      title,
      priority,
      bloodType,
      institutionId,
    });

    return filters
      ? this.applyFilters(filters, campaigns)
      : this.mapperCampaigns(campaigns);
  }

  private mapperCampaigns(list: AppCampaign[]): any[] {
    return list.map((campaign) => ({
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
    }));
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

  private async verifyFiltersExist({
    title,
    priority,
    bloodType,
    institutionId,
  }: Request) {
    const filters = {
      title: '',
      institutionId: '',
      priority: '',
      bloodType: '',
    };

    if (!title && !institutionId && !priority && !bloodType) return false;

    filters.title = title;
    await this.verifyInstitutionExist(institutionId);
    filters.institutionId = institutionId;
    this.verifyArrayElementsAreValid(
      priority,
      this.PRIORITIES,
      MESSAGEINVALID.invalidPriority
    );
    filters.priority = priority;

    this.verifyArrayElementsAreValid(
      bloodType,
      this.BLOOD_TYPES,
      MESSAGEINVALID.invalidTypeBlood
    );
    filters.bloodType = bloodType;
    return filters;
  }

  private async verifyInstitutionExist(institutionId: string | null) {
    if (institutionId) {
      if (!isUuid(institutionId))
        throw new AppError(MESSAGEINVALID.institutionNotExists);

      const institution = await this.institutionRepository.findById(
        institutionId
      );
      if (!institution) throw new AppError(MESSAGEINVALID.institutionNotExists);
    }
  }

  private verifyArrayElementsAreValid(
    value: string | null,
    arrayToCompare: string[],
    errorMessage: string
  ) {
    if (value) {
      const hasValues = arrayToCompare.filter((e) => e === value);
      if (hasValues.length === 0) throw new AppError(errorMessage);
    }
  }

  private async applyFilters(
    filters: Request,
    campaigns: AppCampaign[]
  ): Promise<any> {
    if (filters.institutionId) {
      const campaignsFil = campaigns.filter(
        (campaign) => campaign.institution.id === filters.institutionId
      );
      if (campaignsFil?.length > 0)
        this.campaignsFiltered.push(...campaignsFil);
    }

    if (filters.title) {
      const campaignsFil = campaigns.filter(
        (campaign) => campaign.title === filters.title
      );
      if (campaignsFil?.length > 0)
        this.campaignsFiltered.push(...campaignsFil);
    }

    if (filters.bloodType) {
      const campaignsFil = campaigns.filter(
        (campaign) => campaign.typeBlood === filters.bloodType
      );
      if (campaignsFil?.length > 0)
        this.campaignsFiltered.push(...campaignsFil);
    }

    if (filters.priority) {
      const campaignsFil = campaigns.filter(
        (campaign) => campaign.priority === filters.priority
      );
      if (campaignsFil?.length > 0)
        this.campaignsFiltered.push(...campaignsFil);
    }
    const uniqueValues = [...new Set(this.campaignsFiltered)] as AppCampaign[];
    return this.mapperCampaigns(uniqueValues);
  }
}
