import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableTbDonator1609160669551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tb_donator',
                columns: [
                    {
                      name: 'id',
                      type: 'uuid',
                      isPrimary: true,
                      generationStrategy: 'uuid',
                      default: 'uuid_generate_v4()'
                    },
                    {
                      name: 'name',
                      type: 'varchar',
                    },
                    {
                      name: 'birthday',
                      type: 'timestamp',
                    },
                    {
                      name: 'cpf',
                      type: 'varchar',
                    },
                    {
                      name: 'avatar',
                      type: 'varchar',
                      isNullable: true,
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
                    }
                ]
            })
        );
    };
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_donator');
    };

}
