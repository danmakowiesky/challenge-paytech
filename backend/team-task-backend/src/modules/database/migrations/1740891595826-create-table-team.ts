import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTeam1740891595826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "team" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),  
        "name" character varying(255) NOT NULL,         
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  
        CONSTRAINT "PK_team_id" PRIMARY KEY ("id")      
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_team_name" ON "team" ("name");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_team_name";
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS "team";
    `);
  }
}
