import { MigrationInterface, QueryRunner } from 'typeorm';
import { GetSeedQuery } from './queries';

export class SeedExample1727625459361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    GetSeedQuery.users.forEach(async ({ email, name }) => await queryRunner.query(GetSeedQuery.createUser(email, name)));

    GetSeedQuery.chats.forEach(
      async ({ name, ownerEmail, membersEmails }) =>
        await queryRunner.query(GetSeedQuery.createChat(name, ownerEmail, membersEmails ?? [])),
    );

    GetSeedQuery.messages.forEach(
      async ({ content, chatName, authorEmail }) =>
        await queryRunner.query(GetSeedQuery.createMessage(content, chatName, authorEmail)),
    );
  }

  public async down(): Promise<void> {}
}
