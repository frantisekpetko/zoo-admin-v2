import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1668858298706 implements MigrationInterface {
    name = 'initial1668858298706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "urlName" varchar NOT NULL, "animalId" integer)`);
        await queryRunner.query(`CREATE TABLE "extlink" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "link" varchar NOT NULL, "animalId" integer)`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "latinname" varchar NOT NULL, "description" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "message" varchar NOT NULL, "sender" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "salt" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "temporary_image" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "urlName" varchar NOT NULL, "animalId" integer, CONSTRAINT "FK_3fc0d04b947bf0ee2e909173caf" FOREIGN KEY ("animalId") REFERENCES "animal" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_image"("id", "urlName", "animalId") SELECT "id", "urlName", "animalId" FROM "image"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`ALTER TABLE "temporary_image" RENAME TO "image"`);
        await queryRunner.query(`CREATE TABLE "temporary_extlink" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "link" varchar NOT NULL, "animalId" integer, CONSTRAINT "FK_9fc968e26229bfbaf9c32158b7d" FOREIGN KEY ("animalId") REFERENCES "animal" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_extlink"("id", "link", "animalId") SELECT "id", "link", "animalId" FROM "extlink"`);
        await queryRunner.query(`DROP TABLE "extlink"`);
        await queryRunner.query(`ALTER TABLE "temporary_extlink" RENAME TO "extlink"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extlink" RENAME TO "temporary_extlink"`);
        await queryRunner.query(`CREATE TABLE "extlink" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "link" varchar NOT NULL, "animalId" integer)`);
        await queryRunner.query(`INSERT INTO "extlink"("id", "link", "animalId") SELECT "id", "link", "animalId" FROM "temporary_extlink"`);
        await queryRunner.query(`DROP TABLE "temporary_extlink"`);
        await queryRunner.query(`ALTER TABLE "image" RENAME TO "temporary_image"`);
        await queryRunner.query(`CREATE TABLE "image" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "urlName" varchar NOT NULL, "animalId" integer)`);
        await queryRunner.query(`INSERT INTO "image"("id", "urlName", "animalId") SELECT "id", "urlName", "animalId" FROM "temporary_image"`);
        await queryRunner.query(`DROP TABLE "temporary_image"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`DROP TABLE "extlink"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
