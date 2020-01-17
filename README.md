# StarGrapht

Road to star, with graphQL.

Here is the strapi HomeTest from Benoit CHESNAIS, in TYPESCRIPT.


## Install

1. clone this repository
2. `cd stargrapht && npm install && tsc`

here, You need to setup a postgre database with `postgres` in `NAME`, `USER` and `PASSWORD` on `localhost:5432`

for example you can use :
 `docker run --name some-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres`

3. to init db do `npm run init`
4. to start your graphQl Endpoint `npm run start`

Options:
- to run Units test (found in `src/test`) : `npm run test`
- to run e2e test (found in `src/e2e`) : `npm run e2e`


## authentification

To authenticate on the api, you need to give a valid token.

A valid token  is any random string starting with `TOKEN_`

you have tho pass it in header.Authorization
```
{
    "header" :{
        "Authorization" : "TOKEN_MyrandomPhrase"
    }

}
```



