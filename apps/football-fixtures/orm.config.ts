import { DataSource } from 'typeorm';
import {MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'football',
  entities: [`${__dirname  }/src/**/data/entities/*.entity.ts`],
  migrations: [ `${__dirname  }/src/**/data/migrations/*.ts`],
  synchronize: false,
  logging: false,
  migrationsRun: true,
};

export default new DataSource(config);