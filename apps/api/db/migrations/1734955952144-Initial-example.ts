import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialExample1734955952144 implements MigrationInterface {
  name = 'Initial1734955952144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_identity_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(40) NOT NULL, "password" character varying(250) NOT NULL, "refreshToken" character varying(250), CONSTRAINT "UQ_df5bb527c6423d0a20f91f81b0d" UNIQUE ("email"), CONSTRAINT "PK_12c2e010faf893995d6949b8da5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying(40) NOT NULL, "userIdentityId" uuid, CONSTRAINT "REL_84998b60e2941c78355506b3d5" UNIQUE ("userIdentityId"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(40) NOT NULL, "ownerId" uuid, CONSTRAINT "PK_07e65670b36d025a69930ae6f2e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(200) NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "chatId" uuid, "authorId" uuid, CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_entity_members_user_entity" ("chatEntityId" uuid NOT NULL, "userEntityId" uuid NOT NULL, CONSTRAINT "PK_de8c759df7656edadab6bdfdc2d" PRIMARY KEY ("chatEntityId", "userEntityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b6a465200ca1e24a44b6930f15" ON "chat_entity_members_user_entity" ("chatEntityId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_56af96c799a6be444c345bb60e" ON "chat_entity_members_user_entity" ("userEntityId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD CONSTRAINT "FK_84998b60e2941c78355506b3d52" FOREIGN KEY ("userIdentityId") REFERENCES "user_identity_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_entity" ADD CONSTRAINT "FK_b9d16b00a84a4d203721cd38158" FOREIGN KEY ("ownerId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_entity" ADD CONSTRAINT "FK_ed96c9fd7ed83ee4ec5c286e3b9" FOREIGN KEY ("chatId") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_entity" ADD CONSTRAINT "FK_de22f7b0fb1909b9c0d1cc0c3e0" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_entity_members_user_entity" ADD CONSTRAINT "FK_b6a465200ca1e24a44b6930f158" FOREIGN KEY ("chatEntityId") REFERENCES "chat_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_entity_members_user_entity" ADD CONSTRAINT "FK_56af96c799a6be444c345bb60ed" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat_entity_members_user_entity" DROP CONSTRAINT "FK_56af96c799a6be444c345bb60ed"`);
    await queryRunner.query(`ALTER TABLE "chat_entity_members_user_entity" DROP CONSTRAINT "FK_b6a465200ca1e24a44b6930f158"`);
    await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_de22f7b0fb1909b9c0d1cc0c3e0"`);
    await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_ed96c9fd7ed83ee4ec5c286e3b9"`);
    await queryRunner.query(`ALTER TABLE "chat_entity" DROP CONSTRAINT "FK_b9d16b00a84a4d203721cd38158"`);
    await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_84998b60e2941c78355506b3d52"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_56af96c799a6be444c345bb60e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b6a465200ca1e24a44b6930f15"`);
    await queryRunner.query(`DROP TABLE "chat_entity_members_user_entity"`);
    await queryRunner.query(`DROP TABLE "message_entity"`);
    await queryRunner.query(`DROP TABLE "chat_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TABLE "user_identity_entity"`);
  }
}
