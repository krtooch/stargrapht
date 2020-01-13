//Authentification is quite simple
// All token Starting with TOKEN_ are valid,
// the string is returned in response
// or an error is thrown

export const auth = (token : string) : string | Error =>{
     if(token.match(/^TOKEN_/)) return token.slice(6)
    throw new Error('Authentification issue, Token malformed')
}