import { defaultColumns } from '@app/football-fixtures/db/migrations/default-columns';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Score1683257858198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: "score",
              columns: [
                  {
                      name: "homeTeamScore",
                      type: "int",
                  },
                  {
                      name: "awayTeamScore",
                      type: "int",
                  },
                  ...defaultColumns
              ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("score");
    }

}
