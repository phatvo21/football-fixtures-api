// import { getAdapter } from '@app/common/utils/fastify.util';
// import { NestFastifyApplication } from '@nestjs/platform-fastify';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getModelToken } from '@nestjs/mongoose';
// import { exec } from 'child_process';
// import fastifyCookie from 'fastify-cookie';
// import fastifyCsrf from 'fastify-csrf';
// import supertest from 'supertest';
// // eslint-disable-next-line unicorn/import-style
// import util from 'util';
//
// export const execAsync = util.promisify(exec);
//
// export const restoreDb = async (database = 'simple-api.archive', collection = '*', dbPath = 'database') => {
//   console.info('Begin restore', database, collection);
//   const path = `${process.cwd()}/${dbPath}`;
//
//   await execAsync(
//     `mongorestore --host localhost:27017 -u mongo -p mongo --authenticationDatabase admin --nsInclude="simple-api.${collection}" --archive=${path}/${database} --drop --noIndexRestore --quiet --numParallelCollections=4 --numInsertionWorkersPerCollection=2`,
//   );
//   console.info('Restored:', database, collection);
// };
// export interface ServerType {
//   app: NestFastifyApplication;
// }
// export interface RequestType {
//   agent: supertest.SuperTest<supertest.Test>;
// }
//
// export const generateRequest = (server: { app: NestFastifyApplication }): RequestType => {
//   const agent = supertest.agent(server.app.getHttpServer());
//   return {
//     agent,
//   };
// };
//
// export const generateMockServer = async (modules = []) => {
//   const moduleFixture: TestingModule = await Test.createTestingModule({
//     imports: modules,
//   }).compile();
//
//   const adapter = getAdapter();
//   const app = moduleFixture.createNestApplication<NestFastifyApplication>(adapter);
//
//   await app.register(fastifyCookie);
//   await app.register(fastifyCsrf);
//   await app.init();
//   await app.getHttpAdapter().getInstance().ready();
//   return {
//     app,
//   };
// };
//
// export const getModel = (server: { app: NestFastifyApplication }, entityName: string) => getModelToken(entityName);
//
// export const wait = async (time = 500) => new Promise((resolve) => setTimeout(() => resolve(''), time));
