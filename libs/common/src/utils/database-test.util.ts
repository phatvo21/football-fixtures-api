import { getAdapter } from '@app/common/utils/fastify.util';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { exec } from 'child_process';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import supertest from 'supertest';
// eslint-disable-next-line unicorn/import-style
import util from 'util';

export const execAsync = util.promisify(exec);
export interface ServerType {
  app: NestFastifyApplication;
  module: TestingModule
}
export interface RequestType {
  agent: supertest.SuperTest<supertest.Test>;
}

export const generateRequest = (server: { app: NestFastifyApplication }): RequestType => {
  const agent: supertest.SuperAgentTest = supertest.agent(server.app.getHttpServer());
  return {
    agent,
  };
};

export const generateMockServer = async (modules: any[] = []): Promise<ServerType> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: modules,
  }).compile();

  const adapter: FastifyAdapter = getAdapter();
  const app: NestFastifyApplication = moduleFixture.createNestApplication<NestFastifyApplication>(adapter);

  await app.register(fastifyCookie);
  await app.register(fastifyCsrf);
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
  return {
    app,
    module: moduleFixture
  };
};

export const getEntity = <T extends EntityClassOrSchema>(entity: T) => getRepositoryToken(entity);

export const wait = async (time = 500): Promise<unknown> => new Promise((resolve) => setTimeout(() => resolve(''), time));
