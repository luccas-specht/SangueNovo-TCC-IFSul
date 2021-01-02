import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterFkNameTbDonatorTbInstitution1609595398400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_donator" RENAME COLUMN "tbUserFkId" TO "tb_user_fk"`);
        await queryRunner.query(`ALTER TABLE "tb_institution" RENAME COLUMN "tbUserFkId" TO "tb_user_fk"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
