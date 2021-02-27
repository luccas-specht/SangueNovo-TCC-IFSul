import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1614466564743 implements MigrationInterface {
  name = 'CreateTables1614466564743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ebe445a8233800b2f59004d8ddc" UNIQUE ("email"), CONSTRAINT "PK_1943338f8f00e074a3c5bb48d5e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tb_user_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_34632f3af5cc77818d0431e64b5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tb_donator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "birthday" date NOT NULL, "cpf" character varying NOT NULL, "tb_user_fk" uuid, CONSTRAINT "UQ_26f72e449e71f9c461d2e921b85" UNIQUE ("cpf"), CONSTRAINT "REL_607cb85b2827dded54474b9010" UNIQUE ("tb_user_fk"), CONSTRAINT "PK_0a69da6ca4a8b4dfcafc2a6510c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tb_institution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "razao_social" character varying NOT NULL, "cep" character varying NOT NULL, "cnpj" character varying NOT NULL, "tb_user_fk" uuid, CONSTRAINT "UQ_259a88abe9e751f595a99e836d3" UNIQUE ("cnpj"), CONSTRAINT "REL_d23ab5202773704b99539e5f8d" UNIQUE ("tb_user_fk"), CONSTRAINT "PK_ca01d7e8e4b324993beba935885" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donator" ADD CONSTRAINT "FK_607cb85b2827dded54474b90107" FOREIGN KEY ("tb_user_fk") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_institution" ADD CONSTRAINT "FK_d23ab5202773704b99539e5f8df" FOREIGN KEY ("tb_user_fk") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_institution" DROP CONSTRAINT "FK_d23ab5202773704b99539e5f8df"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donator" DROP CONSTRAINT "FK_607cb85b2827dded54474b90107"`
    );
    await queryRunner.query(`DROP TABLE "tb_institution"`);
    await queryRunner.query(`DROP TABLE "tb_donator"`);
    await queryRunner.query(`DROP TABLE "tb_user_token"`);
    await queryRunner.query(`DROP TABLE "tb_user"`);
  }
}
