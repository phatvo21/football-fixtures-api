import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddConstraint1683262971274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add constraints to team table
    await queryRunner.addColumn(
      'teams',
      new TableColumn({
        name: 'tournamentId',
        type: 'varchar',
      }),
    );

    await queryRunner.createForeignKey(
      'teams',
      new TableForeignKey({
        columnNames: ['tournamentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tournaments',
        onDelete: 'CASCADE',
      }),
    );

    // Add constraint to fixture table
    await queryRunner.addColumn(
      'fixtures',
      new TableColumn({
        name: 'tournamentId',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'fixtures',
      new TableColumn({
        name: 'seasonId',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'fixtures',
      new TableColumn({
        name: 'homeTeamId',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'fixtures',
      new TableColumn({
        name: 'awayTeamId',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'fixtures',
      new TableColumn({
        name: 'scoreId',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'fixtures',
      new TableColumn({
        name: 'venueId',
        type: 'varchar',
      }),
    );

    await queryRunner.createForeignKey(
      'fixtures',
      new TableForeignKey({
        columnNames: ['tournamentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tournaments',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'fixtures',
      new TableForeignKey({
        columnNames: ['seasonId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seasons',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'fixtures',
      new TableForeignKey({
        columnNames: ['homeTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teams',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'fixtures',
      new TableForeignKey({
        columnNames: ['awayTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teams',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'fixtures',
      new TableForeignKey({
        columnNames: ['scoreId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'scores',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'fixtures',
      new TableForeignKey({
        columnNames: ['venueId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'venues',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
