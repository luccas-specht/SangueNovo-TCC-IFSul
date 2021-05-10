import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllTables1620619327486 implements MigrationInterface {
  name = 'CreateAllTables1620619327486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ebe445a8233800b2f59004d8ddc" UNIQUE ("email"), CONSTRAINT "UQ_f187fcd151cb766f5a466d07990" UNIQUE ("phone"), CONSTRAINT "PK_1943338f8f00e074a3c5bb48d5e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tb_donator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "tb_user_fk" uuid, CONSTRAINT "REL_607cb85b2827dded54474b9010" UNIQUE ("tb_user_fk"), CONSTRAINT "PK_0a69da6ca4a8b4dfcafc2a6510c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tb_donation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointment_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "donatorId" uuid, "campaignId" uuid, CONSTRAINT "PK_8394e1eb4761c2442917a4a876a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tb_institution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "razao_social" character varying NOT NULL, "cep" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "cnpj" character varying NOT NULL, "tb_user_fk" uuid, "campaignId" uuid, CONSTRAINT "UQ_259a88abe9e751f595a99e836d3" UNIQUE ("cnpj"), CONSTRAINT "REL_d23ab5202773704b99539e5f8d" UNIQUE ("tb_user_fk"), CONSTRAINT "REL_e91ba99dc53f0f06405ffac375" UNIQUE ("campaignId"), CONSTRAINT "PK_ca01d7e8e4b324993beba935885" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "tb_campaign_typeblood_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')`
    );
    await queryRunner.query(
      `CREATE TYPE "tb_campaign_campaignstatus_enum" AS ENUM('Ativo', 'Solicitado', 'Concluído', 'Recusado')`
    );
    await queryRunner.query(
      `CREATE TYPE "tb_campaign_priority_enum" AS ENUM('Alta', 'Média', 'Baixa')`
    );
    await queryRunner.query(
      `CREATE TABLE "tb_campaign" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "avatar" character varying, "availableDate" date NOT NULL, "goal" integer NOT NULL, "typeBlood" "tb_campaign_typeblood_enum" NOT NULL DEFAULT 'A+', "campaignStatus" "tb_campaign_campaignstatus_enum" NOT NULL DEFAULT 'Solicitado', "priority" "tb_campaign_priority_enum" NOT NULL DEFAULT 'Baixa', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_db65ab6f801c975e3f6937bb6bb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tb_user_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_34632f3af5cc77818d0431e64b5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donator" ADD CONSTRAINT "FK_607cb85b2827dded54474b90107" FOREIGN KEY ("tb_user_fk") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ADD CONSTRAINT "FK_1d1016b7e9909ffd1524fb56fea" FOREIGN KEY ("donatorId") REFERENCES "tb_donator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" ADD CONSTRAINT "FK_4f69e8e713ec885d66669078a6c" FOREIGN KEY ("campaignId") REFERENCES "tb_campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_institution" ADD CONSTRAINT "FK_d23ab5202773704b99539e5f8df" FOREIGN KEY ("tb_user_fk") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_institution" ADD CONSTRAINT "FK_e91ba99dc53f0f06405ffac3754" FOREIGN KEY ("campaignId") REFERENCES "tb_campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" ADD CONSTRAINT "FK_dcab2dd41ac6954e38d5f8cc19b" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_campaign" DROP CONSTRAINT "FK_dcab2dd41ac6954e38d5f8cc19b"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_institution" DROP CONSTRAINT "FK_e91ba99dc53f0f06405ffac3754"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_institution" DROP CONSTRAINT "FK_d23ab5202773704b99539e5f8df"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" DROP CONSTRAINT "FK_4f69e8e713ec885d66669078a6c"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donation" DROP CONSTRAINT "FK_1d1016b7e9909ffd1524fb56fea"`
    );
    await queryRunner.query(
      `ALTER TABLE "tb_donator" DROP CONSTRAINT "FK_607cb85b2827dded54474b90107"`
    );
    await queryRunner.query(`DROP TABLE "tb_user_token"`);
    await queryRunner.query(`DROP TABLE "tb_campaign"`);
    await queryRunner.query(`DROP TYPE "tb_campaign_priority_enum"`);
    await queryRunner.query(`DROP TYPE "tb_campaign_campaignstatus_enum"`);
    await queryRunner.query(`DROP TYPE "tb_campaign_typeblood_enum"`);
    await queryRunner.query(`DROP TABLE "tb_institution"`);
    await queryRunner.query(`DROP TABLE "tb_donation"`);
    await queryRunner.query(`DROP TABLE "tb_donator"`);
    await queryRunner.query(`DROP TABLE "tb_user"`);
  }
}
