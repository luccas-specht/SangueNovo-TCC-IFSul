import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableTbInstitution1609160687551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tb_institution',
                columns: [
                    {
                      name: 'id',
                      type: 'uuid',
                      isPrimary: true,
                      generationStrategy: 'uuid',
                      default: 'uuid_generate_v4()'
                    },
                    {
                      name: 'email',
                      type: 'varchar',
                      isUnique: true,
                    },
                    {
                      name: 'password',
                      type: 'varchar',
                    },
                    {
                      name: 'active',
                      type: 'boolean',
                    },
                    {
                      name: 'created_at',
                      type: 'timestamp',
                      default: 'now()',
                    },
                    {
                      name: 'updated_at',
                      type: 'timestamp',
                      default: 'now()',
                    },
                    {
                      name: 'razao_social',
                      type: 'varchar',
                    },
                    {
                      name: 'birthday',
                      type: 'varchar',
                    },
                    {
                      name: 'cnpj',
                      type: 'varchar',
                    },
                    {
                      name: 'avatar',
                      type: 'varchar',
                      isNullable: true,
                    }
                ]
            })
        );
    };
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_institution');
    };

}
