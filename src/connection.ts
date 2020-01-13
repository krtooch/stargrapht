export const k =require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        user : 'postgres',
        password : 'password',
        database : 'postgres'
      },
    searchPath: ['knex', 'public'],

  });