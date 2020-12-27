import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDonator1601853845032 implements MigrationInterface {
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
            default: 'uuid_generate_v4()',
          },
          {
            name: 'donator_tb_user_fk',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'birthday',
            type: 'date',
          },
          {
            name: 'avatar',
            type: 'varchar',
          }
        ],
      })
    );
    await queryRunner.createForeignKey('tb_donator', new TableForeignKey({
        name: 'tb_donator_tb_user_fk',
        columnNames: ['donator_tb_user_fk'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_donator');
  }
};
