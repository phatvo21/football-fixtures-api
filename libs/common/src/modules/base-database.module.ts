import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

const entityPath: string = path.join(__dirname, 'src/**/data/entities/*.entity.js');
const migrationPath: string = path.join(__dirname, 'src/**/data/migrations/*.js');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('app.databaseHost'),
        port: configService.get('app.databasePort'),
        username: configService.get('app.databaseUser'),
        password: configService.get('app.databasePassword'),
        database:  configService.get('app.databaseName'),
        entities: [entityPath],
        migrations: [migrationPath],
        synchronize: true,
        autoLoadEntities: true,
        cli: {
          entitiesDir: `apps/${process.env.SERVICE_NAME}/src/**/data/entities`,
          migrationsDir:  `apps/${process.env.SERVICE_NAME}/src/**/data/migrations`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BaseDatabaseModule {}
