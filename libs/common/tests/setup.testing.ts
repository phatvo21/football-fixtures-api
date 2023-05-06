/** Load the test environment */

/** App Config */
process.env.NODE_ENV = 'testing';
process.env.PORT = '4000';
process.env.HOST = 'localhost';

/** DB Config */
process.env.DB_TYPE = 'mysql';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'root';
process.env.DB_NAME = 'football';
process.env.DB_HOST = '127.0.0.1';
process.env.DB_PORT = '3306';

jest.setTimeout(60_000);
