import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewsColumns1622403773409 implements MigrationInterface {
  name = 'AddNewsColumns1622403773409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_donator" ALTER COLUMN "date_last_donation" SET DEFAULT null`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."tb_donation_donationstatus_enum" RENAME TO "tb_donation_donationstatus_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "tb_donation_donationstatus_enum" AS ENUM('Solicitado', 'Ativo', 'Finalizado', 'Recusado', 'Nao compareceu')`
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
      `CREATE TYPE "tb_donation_donationstatus_enum_old" AS ENUM('Solicitado', 'Ativo', 'Finalizado', 'Recusado', 'Não compareceu')`
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
    await queryRunner.query(
      `ALTER TABLE "tb_donator" ALTER COLUMN "date_last_donation" DROP DEFAULT`
    );
  }
}
