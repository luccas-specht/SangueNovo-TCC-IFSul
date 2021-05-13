import { getRepository, Repository } from 'typeorm';

import { AppCampaign } from '../entities/AppCampaign';
import { ICampaignRepository } from '../../../IRepository/ICampaingRepository';
import { CampaignStatus } from '../entities/EnumCampaignStatus';

export class CampaignRepository implements ICampaignRepository {
  private ormRepository: Repository<AppCampaign>;

  constructor() {
    this.ormRepository = getRepository(AppCampaign);
  }

  public async save(campaign: AppCampaign): Promise<AppCampaign> {
    return await this.ormRepository.save(campaign);
  }

  public async ListAllCampaigns(
    campaignStatus: string
  ): Promise<AppCampaign[]> {
    return await this.ormRepository.find({
      relations: ['institution', 'user', 'donations'],
      where: { campaignStatus },
    });
  }

  public async updateCampaign(campaign: AppCampaign): Promise<AppCampaign> {
    return await this.ormRepository.save(campaign);
  }

  public async findById(id: string): Promise<AppCampaign | undefined> {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByInstitutionId(
    institutionId: string
  ): Promise<AppCampaign[]> {
    return await this.ormRepository.find({
      relations: ['institution', 'user', 'donations'],
      where: {
        institution: institutionId,
        campaignStatus: CampaignStatus.ACTIVE,
      },
    });
  }
}
