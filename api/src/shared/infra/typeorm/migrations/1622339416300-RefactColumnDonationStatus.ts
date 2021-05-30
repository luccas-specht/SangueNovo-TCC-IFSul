import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactColumnDonationStatus1622339416300
  implements MigrationInterface
{
  name = 'RefactColumnDonationStatus1622339416300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."tb_donation_donationstatus_enum" RENAME TO "tb_donation_donationstatus_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "tb_donation_donationstatus_enum" AS ENUM('Solicitado', 'Ativo', 'Finalizado', 'Recusado')`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ALTER COLUMN "donationStatus" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ALTER COLUMN "donationStatus" TYPE "tb_donation_donationstatus_enum" USING "donationStatus"::"text"::"tb_donation_donationstatus_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ALTER COLUMN "donationStatus" SET DEFAULT 'Solicitado'`
    );
    await queryRunner.query(`DROP TYPE "tb_donation_donationstatus_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "tb_donation_donationstatus_enum_old" AS ENUM('Solicitado', 'Ativo', 'Finalizado')`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ALTER COLUMN "donationStatus" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ALTER COLUMN "donationStatus" TYPE "tb_donation_donationstatus_enum_old" USING "donationStatus"::"text"::"tb_donation_donationstatus_enum_old"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ALTER COLUMN "donationStatus" SET DEFAULT 'Solicitado'`
    );
    await queryRunner.query(`DROP TYPE "tb_donation_donationstatus_enum"`);
    await queryRunner.query(
      `ALTER TYPE "tb_donation_donationstatus_enum_old" RENAME TO  "tb_donation_donationstatus_enum"`
    );
  }
}
