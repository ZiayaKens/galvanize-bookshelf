'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_dev',
    seeds: {
      directory: './seeds/dev'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_test',
    seeds: {
      directory: './seeds/test'
    }
  },

  production: {}
};
