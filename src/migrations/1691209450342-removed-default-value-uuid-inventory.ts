import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedDefaultValueUuidInventory1691209450342 implements MigrationInterface {
    name = 'RemovedDefaultValueUuidInventory1691209450342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT 'a1963bcf-305f-416b-a4ed-2f24164f8aa9'`);
        await queryRunner.query(`ALTER TABLE "inventories" ALTER COLUMN "uuid" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" ALTER COLUMN "uuid" SET DEFAULT 'dde049d0-c30f-42c6-aebc-e2687e944ea4'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT 'bc55a66f-b5a6-485f-bf24-1de9e8ba946e'`);
    }

}
