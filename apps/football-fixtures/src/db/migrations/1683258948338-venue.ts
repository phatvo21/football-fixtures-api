import { defaultColumns } from '@app/football-fixtures/db/migrations/default-columns';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Venue1683258948338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'venues',
        columns: [
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          ...defaultColumns,
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('venues');
  }
}
