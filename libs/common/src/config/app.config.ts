import { registerAs } from '@nestjs/config';

/**
 * Configuration params
 * @typedef {Object}  Configuration
 * @property {string} nodeEnv - Indicates the current environment of the application
 * @property {string} host - Indicates the application host
 * @property {number} port - Indicates the application running under this port
 * @property {string} databaseUser - Indicates the user's name of the database
 * @property {string} databasePassword - Indicates the user's password of the database
 * @property {string} databaseName - Indicates the name of the database
 * @property {string} databaseHost - Indicates the host of the database
 * @property {number} databasePort - Indicates the port of the database
 * @property {string} databaseType - Indicates the type of the database (Ex: mysql, postgres, mongodb)
 */

/**
 * Application configuration
 * @param {Configuration} config - Configuration object
 */
export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'production',
  host: process.env.HOST ?? '127.0.0.1',
  port: +process.env.PORT ?? 4000,
  databaseUser: process.env.DB_USER ?? 'root',
  databasePassword: process.env.DB_PASSWORD ?? 'root',
  databaseName: process.env.DB_NAME ?? 'football',
  databaseHost: process.env.DB_HOST ?? '127.0.0.1',
  databasePort: +process.env.DB_PORT ?? 3306,
  databaseType: process.env.DB_TYPE ?? 'mysql',
}));
