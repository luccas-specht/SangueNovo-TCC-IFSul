import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAppUser1609341633017 implements MigrationInterface {
    name = 'CreateAppUser1609341633017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_donator" DROP CONSTRAINT "UQ_f1daf01ab26cb684e61190067b4"`);
        await queryRunner.query(`ALTER TABLE "tb_donator" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ADD "birthday" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_donator" DROP CONSTRAINT "UQ_26f72e449e71f9c461d2e921b85"`);
        await queryRunner.query(`ALTER TABLE "tb_institution" DROP CONSTRAINT "UQ_a3c8ca74b8e4629a18593b4931a"`);
        await queryRunner.query(`ALTER TABLE "tb_institution" DROP CONSTRAINT "UQ_259a88abe9e751f595a99e836d3"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_institution" ADD CONSTRAINT "UQ_259a88abe9e751f595a99e836d3" UNIQUE ("cnpj")`);
        await queryRunner.query(`ALTER TABLE "tb_institution" ADD CONSTRAINT "UQ_a3c8ca74b8e4629a18593b4931a" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ADD CONSTRAINT "UQ_26f72e449e71f9c461d2e921b85" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "tb_donator" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ADD "birthday" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ADD CONSTRAINT "UQ_f1daf01ab26cb684e61190067b4" UNIQUE ("email")`);
    }

}
