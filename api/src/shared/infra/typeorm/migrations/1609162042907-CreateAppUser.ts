import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAppUser1609162042907 implements MigrationInterface {
    name = 'CreateAppUser1609162042907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_institution" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "tb_donator" DROP CONSTRAINT "UQ_f1daf01ab26cb684e61190067b4"`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ALTER COLUMN "avatar" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_donator" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ADD "birthday" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_institution" DROP CONSTRAINT "UQ_a3c8ca74b8e4629a18593b4931a"`);
        await queryRunner.query(`ALTER TABLE "tb_institution" ALTER COLUMN "avatar" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_institution" ALTER COLUMN "avatar" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_institution" ADD CONSTRAINT "UQ_a3c8ca74b8e4629a18593b4931a" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "tb_donator" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ADD "birthday" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ALTER COLUMN "avatar" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ADD CONSTRAINT "UQ_f1daf01ab26cb684e61190067b4" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "tb_institution" ADD "birthday" character varying NOT NULL`);
    }

}
