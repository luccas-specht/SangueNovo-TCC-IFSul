import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';

export interface ICampaignRepository {
  save(donator: AppCampaign): Promise<AppCampaign>;
  ListAllCampaigns(): Promise<AppCampaign[]>;
}
