# StarGrapht

Road to star, with graphQL

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