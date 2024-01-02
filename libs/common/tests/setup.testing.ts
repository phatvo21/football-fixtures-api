// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';

dotenv.config({
  path: 'apps/football-fixtures/.env',
});

/** Load the test environment */

/** App Config */
process.env.NODE_ENV = 'testing';
process.env.PORT = process.env.PORT ?? '4000';
process.env.HOST = process.env.HOST ?? 'localhost';

/** DB Config */
process.env.DB_TYPE = 'mysql';
process.env.DB_USER = process.env.DB_USER ?? 'root';
process.env.DB_PASSWORD = process.env.DB_PASSWORD ?? 'root';
process.env.DB_NAME = process.env.DB_NAME ?? 'football';
process.env.DB_HOST = process.env.DB_HOST ?? '127.0.0.1';
process.env.DB_PORT = process.env.DB_PORT ?? '3306';

jest.setTimeout(60_000);
