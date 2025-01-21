/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import * as dotenv from 'dotenv'

dotenv.config()

export const development = {
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

export const staging = {
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
export const production = {
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME_PROD,
    user: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
