import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddForeignKey1620090465234 implements MigrationInterface {
  name = 'AddForeignKey1620090465234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tb_user" ADD "donatitonId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tb_scheduling" ADD "donatitonId" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_scheduling" ADD "institutionId" uuid`
    );
    await queryRunner.query(`ALTER TABLE "tb_donation" ADD "campaignId" uuid`);
    await queryRunner.query(`ALTER TABLE "tb_donation" ADD "donatorId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" ADD "available_date" TIMESTAMP WITH TIME ZONE NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" ADD "institutionId" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" ADD CONSTRAINT "UQ_0f05ad6d2e3bc0758c08c93891d" UNIQUE ("institutionId")`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_user" ADD CONSTRAINT "FK_d7588f54c63a19426dd1921ed6d" FOREIGN KEY ("donatitonId") REFERENCES "tb_campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_scheduling" ADD CONSTRAINT "FK_bb1d8dfbb91be6c708fb7b5aa83" FOREIGN KEY ("donatitonId") REFERENCES "tb_donation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_scheduling" ADD CONSTRAINT "FK_c00766cd2cfe9411cfaa710abc2" FOREIGN KEY ("institutionId") REFERENCES "tb_institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ADD CONSTRAINT "FK_4f69e8e713ec885d66669078a6c" FOREIGN KEY ("campaignId") REFERENCES "tb_campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ADD CONSTRAINT "FK_1d1016b7e9909ffd1524fb56fea" FOREIGN KEY ("donatorId") REFERENCES "tb_donator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" ADD CONSTRAINT "FK_0f05ad6d2e3bc0758c08c93891d" FOREIGN KEY ("institutionId") REFERENCES "tb_institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" DROP CONSTRAINT "FK_0f05ad6d2e3bc0758c08c93891d"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" DROP CONSTRAINT "FK_1d1016b7e9909ffd1524fb56fea"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" DROP CONSTRAINT "FK_4f69e8e713ec885d66669078a6c"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_scheduling" DROP CONSTRAINT "FK_c00766cd2cfe9411cfaa710abc2"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_scheduling" DROP CONSTRAINT "FK_bb1d8dfbb91be6c708fb7b5aa83"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_user" DROP CONSTRAINT "FK_d7588f54c63a19426dd1921ed6d"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" DROP CONSTRAINT "UQ_0f05ad6d2e3bc0758c08c93891d"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" DROP COLUMN "institutionId"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" DROP COLUMN "available_date"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" DROP COLUMN "donatorId"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" DROP COLUMN "campaignId"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_scheduling" DROP COLUMN "institutionId"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_scheduling" DROP COLUMN "donatitonId"`
    );
    await queryRunner.query(`ALTER TABLE "tb_user" DROP COLUMN "donatitonId"`);
  }
}
