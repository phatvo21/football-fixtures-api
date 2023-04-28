import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Testmi1682671836525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          "test",
          new TableColumn({
              name: "questionId",
              type: "int",
          }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
