import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';

export interface ICampaignRepository {
  save(donator: AppCampaign): Promise<AppCampaign>;
  ListAllCampaigns(campaignStatus: string): Promise<AppCampaign[]>;
  findById(id: string): Promise<AppCampaign | undefined>;
  findByInstitutionId(institurionId: string): Promise<AppCampaign[]>;
  updateCampaign(campaign: AppCampaign): Promise<AppCampaign>;
}
