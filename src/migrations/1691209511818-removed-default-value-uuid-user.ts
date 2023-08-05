import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedDefaultValueUuidUser1691209511818 implements MigrationInterface {
    name = 'RemovedDefaultValueUuidUser1691209511818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT 'a1963bcf-305f-416b-a4ed-2f24164f8aa9'`);
    }

}
