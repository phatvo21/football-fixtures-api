import { defaultColumns } from '@app/football-fixtures/db/migrations/default-columns';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Team1683257487159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: "team",
              columns: [
                  {
                      name: "name",
                      type: "varchar",
                  },
                  {
                      name: "code",
                      type: "varchar",
                  },
                  {
                      name: "logo",
                      type: "varchar",
                  },
                ...defaultColumns
              ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("team");
        const foreignKey = table.foreignKeys.find(
          (fk) => fk.columnNames?.indexOf("tournamentId") !== -1,
        );
        await queryRunner.dropForeignKey("team", foreignKey);
        await queryRunner.dropColumn("team", "tournamentId");
        await queryRunner.dropTable("team");
    }

}
