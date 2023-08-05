import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserUpdateInventory1691209252755 implements MigrationInterface {
    name = 'CreateUserUpdateInventory1691209252755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "uuid" character varying NOT NULL DEFAULT 'bc55a66f-b5a6-485f-bf24-1de9e8ba946e', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD "uuid" character varying NOT NULL DEFAULT 'dde049d0-c30f-42c6-aebc-e2687e944ea4'`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventories" ADD CONSTRAINT "FK_0af24dcac4257167eebaf5695ed" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventories" DROP CONSTRAINT "FK_0af24dcac4257167eebaf5695ed"`);
        await queryRunner.query(`ALTER TABLE "inventories" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "inventories" DROP COLUMN "uuid"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
