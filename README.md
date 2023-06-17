# Introduction

Node.js package crud operation function just pass values

# Installation

`npm install auth-crud`

# Usage

`node`

```js
var ZAIN = require("auth-crud"); 
// Pass your mongoose uri and connect simple.
ZAIN.mongodb(URI)
```

`node`

```js
var ZAIN = require("auth-crud");
// register just by passing model and values
// You can pass dynamically passes arguments
// no limit depends on yout model
//register
let response = await ZAIN.registerWithBcryptjs(Users,{name,email,password})
res.json(response)

let response = await ZAIN.registerWithPlaintext(Users,{name,email,password})
res.json(response)

//login
//Response will be jwt token
let response = await ZAIN.loginWithJwtonly(Users,{email,password})
res.json(response)
//Response will be user detail with jwt token
let response = await ZAIN.loginWithJwtandUser(Users,{email,password})
res.json(response)
```

# Build

`npm run build`

# Test

`npm run test`  
`npm run test:tdd`

# Contribute

If you would like to contribute, you are welcome. Clone repository and open pull request.