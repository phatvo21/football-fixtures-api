import { DataSource } from 'typeorm';
import {MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SeederOptions } from 'typeorm-extension';

console.log("I MAKE SURES THIS WORKS");

const config: MysqlConnectionOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'football',
  entities: [`${__dirname  }/src/db/entities/*.entity.ts`],
  migrations: [ `${__dirname  }/src/db/migrations/*.ts`],
  seeds: [`${__dirname  }/src/db/seeds/*.seed.ts`],
  factories: [`${__dirname  }/src/db/factories/*.factory.ts`],
  synchronize: false,
  logging: false,
  migrationsRun: true,
};

export default new DataSource(config);