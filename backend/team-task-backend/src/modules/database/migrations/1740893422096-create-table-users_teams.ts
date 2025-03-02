import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTeamsTable1626888221893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_teams" (
        "userId" UUID NOT NULL,
        "teamId" UUID NOT NULL,
        CONSTRAINT "PK_user_teams" PRIMARY KEY ("userId", "teamId"),
        CONSTRAINT "FK_user_teams_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_user_teams_team" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "user_teams";
    `);
  }
}
