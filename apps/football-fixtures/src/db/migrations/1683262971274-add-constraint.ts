import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddConstraint1683262971274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add constraints to team table
        await queryRunner.addColumn(
          "team",
          new TableColumn({
              name: "tournamentId",
              type: "varchar",
          }),
        );

        await queryRunner.createForeignKey(
          "team",
          new TableForeignKey({
              columnNames: ["tournamentId"],
              referencedColumnNames: ["id"],
              referencedTableName: "tournament",
              onDelete: "CASCADE",
          }),
        )

        // Add constraint to fixture table
        await queryRunner.addColumn(
          "fixture",
          new TableColumn({
              name: "tournamentId",
              type: "varchar",
          }),
        );

        await queryRunner.addColumn(
          "fixture",
          new TableColumn({
              name: "seasonId",
              type: "varchar",
          }),
        );

        await queryRunner.addColumn(
          "fixture",
          new TableColumn({
              name: "homeTeamId",
              type: "varchar",
          }),
        );

        await queryRunner.addColumn(
          "fixture",
          new TableColumn({
              name: "awayTeamId",
              type: "varchar",
          }),
        );

        await queryRunner.addColumn(
          "fixture",
          new TableColumn({
              name: "scoreId",
              type: "varchar",
          }),
        );

        await queryRunner.addColumn(
          "fixture",
          new TableColumn({
              name: "venueId",
              type: "varchar",
          }),
        );

        await queryRunner.createForeignKey(
          "fixture",
          new TableForeignKey({
              columnNames: ["tournamentId"],
              referencedColumnNames: ["id"],
              referencedTableName: "tournament",
              onDelete: "CASCADE",
          }),
        );

        await queryRunner.createForeignKey(
          "fixture",
          new TableForeignKey({
              columnNames: ["seasonId"],
              referencedColumnNames: ["id"],
              referencedTableName: "season",
              onDelete: "CASCADE",
          }),
        );

        await queryRunner.createForeignKey(
          "fixture",
          new TableForeignKey({
              columnNames: ["homeTeamId"],
              referencedColumnNames: ["id"],
              referencedTableName: "team",
              onDelete: "CASCADE",
          }),
        );

        await queryRunner.createForeignKey(
          "fixture",
          new TableForeignKey({
              columnNames: ["awayTeamId"],
              referencedColumnNames: ["id"],
              referencedTableName: "team",
              onDelete: "CASCADE",
          }),
        );

        await queryRunner.createForeignKey(
          "fixture",
          new TableForeignKey({
              columnNames: ["scoreId"],
              referencedColumnNames: ["id"],
              referencedTableName: "score",
              onDelete: "CASCADE",
          }),
        );

        await queryRunner.createForeignKey(
          "fixture",
          new TableForeignKey({
              columnNames: ["venueId"],
              referencedColumnNames: ["id"],
              referencedTableName: "venue",
              onDelete: "CASCADE",
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
