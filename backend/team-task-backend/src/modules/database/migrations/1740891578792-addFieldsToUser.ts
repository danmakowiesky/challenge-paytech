import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsToUser1740891578792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionando as colunas sem a restrição NOT NULL inicialmente
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "name" VARCHAR(255),
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
    `);

    // Definindo valores padrão para a coluna "name" se necessário
    await queryRunner.query(`
      UPDATE "user" SET "name" = 'Default Name' WHERE "name" IS NULL;
    `);

    // Agora podemos adicionar a restrição NOT NULL
    await queryRunner.query(`
      ALTER TABLE "user"
      ALTER COLUMN "name" SET NOT NULL;
    `);

    // Criando o índice único
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_user_email" ON "user" ("email");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_user_email";
    `);

    // Remover as colunas
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN "name",
      DROP COLUMN "createdAt",
      DROP COLUMN "updatedAt";
    `);
  }
}
