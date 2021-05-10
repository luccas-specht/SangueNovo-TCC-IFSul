import { getRepository, Repository } from 'typeorm';

import { AppCampaign } from '../entities/AppCampaign';
import { ICampaignRepository } from '../../../IRepository/ICampaingRepository';

export class CampaignRepository implements ICampaignRepository {
  private ormRepository: Repository<AppCampaign>;

  constructor() {
    this.ormRepository = getRepository(AppCampaign);
  }

  public async save(campaign: AppCampaign): Promise<AppCampaign> {
    return await this.ormRepository.save(campaign);
  }

  public async ListAllCampaigns(): Promise<AppCampaign[]> {
    return await this.ormRepository.find({ relations: ['user'] });
  }
}
