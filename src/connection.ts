export const k =require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        port:'5432',
        user : 'postgres',
        password : 'postgres',
        database : 'postgres'
      },
    searchPath: ['knex', 'public'],

  });