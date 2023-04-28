import { MigrationInterface, QueryRunner } from "typeorm"

export class Testmi1682671836525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "test" RENAME COLUMN "createdAt" TO "name"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
