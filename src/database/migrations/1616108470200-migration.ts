import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1616108470200 implements MigrationInterface {
  name = 'migration1616108470200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, 
      "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "genres" character varying NOT NULL, 
      CONSTRAINT "PK_h2b16b62917b7651ji982d98740" PRIMARY KEY("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "orders" character varying NOT NULL, 
      CONSTRAINT "PK_u2y54b87621b7651ji982d76532" PRIMARY KEY("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_orders_orders" ("usersId" uuid NOT NULL, "ordersId" 
      uuid NOT NULL CONSTRAINT "PK_ak89i8d45l09oi887g693h7j43k" 
      PRIMARY KEY ("usersId", "ordersId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "games_genres_genres" ("gamesId" uuid NOT NULL, "genresId" 
      uuid NOT NULL CONSTRAINT "PK_kl7890d45g61kki87g693bc6598" 
      PRIMARY KEY ("gamesId", "genresId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_games_games" ("usersId" uuid NOT NULL, "gamesId" uuid 
      NOT NULL, CONSTRAINT "PK_cd4067d574477fd5c7693bc7872" 
      PRIMARY KEY ("usersId", "gamesId"))`,
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_j87yu6oi23g49kh8uh1u7lki98u" ON "users_orders_orders" ("usersId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_jk85h6o1jk8u7th8uh1u8j7g54" ON "users_orders_orders" ("ordersId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ok97h3oi98s265h8uh1u7t65c35" ON "games_genres_genres" ("gamesId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ik8h76oik8u7yiu8761u7i8u76t" ON "games_genres_genres" ("genresId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_e5263d029d8644de829aae5c35" ON "users_games_games" ("usersId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_934b0d8f9d0084c97d3876ad32" ON "users_games_games" ("gamesId") ',
    );
    await queryRunner.query(
      `ALTER TABLE "users_orders_orders" ADD CONSTRAINT "FK_jk85h6o1jk8u7th8uh1u8j7g54a" 
      FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_orders_orders" ADD CONSTRAINT "FK_j87yu6oi23g49kh8uh1u7lki98ud" 
      FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "games_genres_genres" ADD CONSTRAINT "FK_ok97h3oi98s265h8uh1u7t65c35a" 
      FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "games_genres_genres" ADD CONSTRAINT "FK_ik8h76oik8u7yiu8761u7i8u76td" 
      FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_e5263d029d8644de829aae5c35a" 
      FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d" 
      FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "games_genres_genres" DROP CONSTRAINT "FK_ok97h3oi98s265h8uh1u7t65c35a"',
    );
    await queryRunner.query(
      'ALTER TABLE "games_genres_genres" DROP CONSTRAINT "FK_ik8h76oik8u7yiu8761u7i8u76td"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_orders_orders" DROP CONSTRAINT "FK_jk85h6o1jk8u7th8uh1u8j7g54a"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_orders_orders" DROP CONSTRAINT "FK_j87yu6oi23g49kh8uh1u7lki98ud"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_e5263d029d8644de829aae5c33a"',
    );
    await queryRunner.query('DROP INDEX "IDX_ik8h76oik8u7yiu8761u7i8u76t"');
    await queryRunner.query('DROP INDEX "IDX_ok97h3oi98s265h8uh1u7t65c35"');
    await queryRunner.query('DROP INDEX "IDX_jk85h6o1jk8u7th8uh1u8j7g54"');
    await queryRunner.query('DROP INDEX "IDX_j87yu6oi23g49kh8uh1u7lki98u"');
    await queryRunner.query('DROP INDEX "IDX_934b0d8f9d0084c97d3876ad32"');
    await queryRunner.query('DROP INDEX "IDX_e5263d029d8644de829aae5c35"');
    await queryRunner.query('DROP TABLE "games_genres_genres"');
    await queryRunner.query('DROP TABLE "users_orders_orders"');
    await queryRunner.query('DROP TABLE "users_games_games"');
    await queryRunner.query('DROP TABLE "genres"');
    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query('DROP TABLE "games"');
    await queryRunner.query('DROP TABLE "users"');
  }
}
