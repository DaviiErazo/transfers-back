require('dotenv').config()
const Sequelize = require('sequelize');

const { 
  RIPLEY_DB_USER, 
  RIPLEY_DB_PASS, 
  RIPLEY_DB_HOST,
  RIPLEY_DB_NAME,
  NODE_ENV,
  RIPLEY_IS_PRODUCTION,
  CLEARDB_DATABASE_URL
} = process.env;

const databaseCredentials = {
  "development": {
    "username": RIPLEY_DB_USER,
    "password": RIPLEY_DB_PASS,
    "database": RIPLEY_DB_NAME,
    "host":   RIPLEY_DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": RIPLEY_DB_USER,
    "password": RIPLEY_DB_PASS,
    "database": RIPLEY_DB_NAME,
    "host":   RIPLEY_DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": RIPLEY_DB_USER,
    "password": RIPLEY_DB_PASS,
    "database": RIPLEY_DB_NAME,
    "host":   RIPLEY_DB_HOST,
    "dialect": "mysql"
  }
};

const { 
  username, password, database, host, dialect 
} = databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

const mode = RIPLEY_IS_PRODUCTION === "true" ? 'prod' : 'dev';

console.log(`[DB]: Connecting to the database in ${mode} mode.`)

module.exports.connection = RIPLEY_IS_PRODUCTION === "true"
  ? new Sequelize(CLEARDB_DATABASE_URL) 
  : new Sequelize(database, username, password, {
    host,
    dialect,
    port: 3306,
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false,
  },
);
