import { defaultColumns } from '@app/football-fixtures/db/migrations/default-columns';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Fixture1683260161671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: "fixture",
              columns: [
                  {
                      name: "matchStatus",
                      type: 'enum',
                      enum: ['PLAYED', 'NEW', 'IN-MATCH'],
                      isNullable: true
                  },
                  {
                      name: "matchDateTime",
                      type: "varchar",
                  },
                ...defaultColumns
              ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("fixture");
        const seasonForeignKey = table.foreignKeys.find(
          (fk) => fk.columnNames?.indexOf("seasonId") !== -1,
        );
        const tournamentForeignKey = table.foreignKeys.find(
          (fk) => fk.columnNames?.indexOf("tournamentId") !== -1,
        );
        const homeTeamForeignKey = table.foreignKeys.find(
          (fk) => fk.columnNames?.indexOf("homeTeamId") !== -1,
        );
        const awayTeamForeignKey = table.foreignKeys.find(
          (fk) => fk.columnNames?.indexOf("awayTeamId") !== -1,
        );
        const scoreForeignKey = table.foreignKeys.find(
          (fk) => fk.columnNames?.indexOf("scoreId") !== -1,
        );
        const venueForeignKey = table.foreignKeys.find(
          (fk) => fk.columnNames?.indexOf("venueId") !== -1,
        );
        await queryRunner.dropForeignKey("fixture", seasonForeignKey);
        await queryRunner.dropForeignKey("fixture", tournamentForeignKey);
        await queryRunner.dropForeignKey("fixture", homeTeamForeignKey);
        await queryRunner.dropForeignKey("fixture", awayTeamForeignKey);
        await queryRunner.dropForeignKey("fixture", scoreForeignKey);
        await queryRunner.dropForeignKey("fixture", venueForeignKey);
        await queryRunner.dropColumn("fixture", "seasonId");
        await queryRunner.dropColumn("fixture", "tournamentId");
        await queryRunner.dropColumn("fixture", "homeTeamId");
        await queryRunner.dropColumn("fixture", "awayTeamId");
        await queryRunner.dropColumn("fixture", "scoreId");
        await queryRunner.dropColumn("fixture", "venueId");
        await queryRunner.dropTable("fixture");
    }

}
