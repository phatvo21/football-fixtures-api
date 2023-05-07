import { getAdapter } from '@app/common/utils/fastify.util';
import { getCommitHash } from '@app/common/utils/gitCommitHash.util';
import { AddSwagger } from '@app/common/utils/swagger.util';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import { Logger } from 'nestjs-pino';

import { AllExceptionsFilter } from './all-exceptions.filter';

export const bootstrap = async (appModule, swaggerConfig: { title: string; server: string }): Promise<void> => {
  const adapter: FastifyAdapter = getAdapter();
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(appModule, adapter);

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config: ConfigService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: (_, cb) => {
      cb(null, true);
    },
  });

  await app.register(fastifyCookie);
  await app.register(fastifyCsrf);

  app.useGlobalFilters(new AllExceptionsFilter());
  const appHost: string = config.get<string>('app.host', '0.0.0.0');
  const appPort: number = config.get<number>('app.port', 4000);

  const commitHash: string = config.get<string>('COMMIT_HASH') || getCommitHash();
  AddSwagger(app, swaggerConfig.title, swaggerConfig.server, commitHash);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(appPort, appHost);
  console.info(`Swagger Url: ${appHost}:${appPort}${swaggerConfig.server}`);
};
