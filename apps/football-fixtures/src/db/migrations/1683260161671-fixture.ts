import { defaultColumns } from '@app/football-fixtures/db/migrations/default-columns';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Fixture1683260161671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fixtures',
        columns: [
          {
            name: 'matchStatus',
            type: 'enum',
            enum: ['PLAYED', 'NEW', 'IN-MATCH'],
            isNullable: true,
          },
          {
            name: 'matchDate',
            type: 'varchar',
          },
          {
            name: 'matchTime',
            type: 'varchar',
          },
          {
            name: 'round',
            type: 'int',
          },
          ...defaultColumns,
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('fixtures');
    const seasonForeignKey = table.foreignKeys.find((fk) => fk.columnNames?.indexOf('seasonId') !== -1);
    const tournamentForeignKey = table.foreignKeys.find((fk) => fk.columnNames?.indexOf('tournamentId') !== -1);
    const homeTeamForeignKey = table.foreignKeys.find((fk) => fk.columnNames?.indexOf('homeTeamId') !== -1);
    const awayTeamForeignKey = table.foreignKeys.find((fk) => fk.columnNames?.indexOf('awayTeamId') !== -1);
    const scoreForeignKey = table.foreignKeys.find((fk) => fk.columnNames?.indexOf('scoreId') !== -1);
    const venueForeignKey = table.foreignKeys.find((fk) => fk.columnNames?.indexOf('venueId') !== -1);
    await queryRunner.dropForeignKey('fixtures', seasonForeignKey);
    await queryRunner.dropForeignKey('fixtures', tournamentForeignKey);
    await queryRunner.dropForeignKey('fixtures', homeTeamForeignKey);
    await queryRunner.dropForeignKey('fixtures', awayTeamForeignKey);
    await queryRunner.dropForeignKey('fixtures', scoreForeignKey);
    await queryRunner.dropForeignKey('fixtures', venueForeignKey);
    await queryRunner.dropColumn('fixtures', 'seasonId');
    await queryRunner.dropColumn('fixtures', 'tournamentId');
    await queryRunner.dropColumn('fixtures', 'homeTeamId');
    await queryRunner.dropColumn('fixtures', 'awayTeamId');
    await queryRunner.dropColumn('fixtures', 'scoreId');
    await queryRunner.dropColumn('fixtures', 'venueId');
    await queryRunner.dropTable('fixtures');
  }
}
