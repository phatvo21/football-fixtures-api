import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BaseDatabaseModule {}
