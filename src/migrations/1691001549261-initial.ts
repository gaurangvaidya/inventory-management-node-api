import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1691001549261 implements MigrationInterface {
  name = 'Initial1691001549261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "inventories" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_7b1946392ffdcb50cfc6ac78c0e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "inventories"`);
  }
}
