import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1609599307599 implements MigrationInterface {
    name = 'CreateTables1609599307599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, , "password" character varying NOT NULL, "avatar" character varying, "active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1943338f8f00e074a3c5bb48d5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_user_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_34632f3af5cc77818d0431e64b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_donator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "birthday" date NOT NULL, "cpf" character varying NOT NULL, "tbUserFkId" uuid, NOT NULL, CONSTRAINT "REL_e3a1f19716356dc1e32cebf4f1" UNIQUE ("tbUserFkId"), CONSTRAINT "PK_0a69da6ca4a8b4dfcafc2a6510c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_institution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "razao_social" character varying NOT NULL, "cnpj" character varying NOT NULL, "tbUserFkId" uuid, CONSTRAINT "REL_18139ec5708b6a4dd8111f8acd" UNIQUE ("tbUserFkId"), CONSTRAINT "PK_ca01d7e8e4b324993beba935885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_donator" ADD CONSTRAINT "FK_e3a1f19716356dc1e32cebf4f14" FOREIGN KEY ("tbUserFkId") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_institution" ADD CONSTRAINT "FK_18139ec5708b6a4dd8111f8acd2" FOREIGN KEY ("tbUserFkId") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_institution" DROP CONSTRAINT "FK_18139ec5708b6a4dd8111f8acd2"`);
        await queryRunner.query(`ALTER TABLE "tb_donator" DROP CONSTRAINT "FK_e3a1f19716356dc1e32cebf4f14"`);
        await queryRunner.query(`DROP TABLE "tb_institution"`);
        await queryRunner.query(`DROP TABLE "tb_donator"`);
        await queryRunner.query(`DROP TABLE "tb_user_token"`);
        await queryRunner.query(`DROP TABLE "tb_user"`);
    }

}
