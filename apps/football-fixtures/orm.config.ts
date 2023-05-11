import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SeederOptions } from 'typeorm-extension';

dotenv.config({
  path: "apps/football-fixtures/.env"
});

/**
 * Data source configuration that serves the database migration and seeds runs
 */
const config: MysqlConnectionOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/src/db/entities/*.entity.ts`],
  migrations: [`${__dirname}/src/db/migrations/*.ts`],
  seeds: [`${__dirname}/src/db/seeds/*.seed.ts`],
  factories: [`${__dirname}/src/db/factories/*.factory.ts`],
  synchronize: false,
  logging: false,
  migrationsRun: true,
};

export default new DataSource(config);
