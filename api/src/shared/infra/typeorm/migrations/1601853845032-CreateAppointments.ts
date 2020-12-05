import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

class CreateAppointments1601853845032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      })
    );
    await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'appointment-provider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointment-provider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.dropColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
      })
    );
    await queryRunner.dropTable('appointments');
  }
}
export { CreateAppointments1601853845032 };
