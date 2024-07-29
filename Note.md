
# streamy web app Backend  

This is the college Project Create a OTT web app 




## Create Floder and open TERMINAL

- ``` npm init ```

- Enter some info




## push/upload in github

```bash
1. git init
2. git add .
3. git commit -m "add your commit"
4. git remote add origin "enter your github url"
5. git push -u origin main
```
    
## Create floder public/temp and 

floder use for user own avtar img save hare


## .gitgnore file create

[gitignore generator](https://www.toptal.com/developers/gitignore)
use to github upload code some file not use to for ex:-(out, env, etc)


## Environment Variables (.env)

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


##  create floder ./src
`app.js`
`index.js`
`constants.js`
create a files

## two types import in javascript
common or module edit
```
{
  "name": "backend",
  "version": "1.0.0",
  "description": "this OTT web app ",
  "type":"module", // edit
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "shubham shinde",
  "license": "ISC"
} 
```

## install nodemon update package.json
` npm i nodemon `
```
 "scripts": {
    "dev": "nodemon src/index.js"
  },
```

## Floders

./src floders in create sub floders

` controllers`
`db`
`middlewares`
`models`
`routes`
`utils`

## Install npm package
```
npm i dotenv
npm i mongoose
npm i express
```

## DB connection
in `constants.js` 
```
export const DB_NAME = "Database Name"
```

in `./db` in `index.js`

in `./src` in `index.js`

```
//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB();
```

Package.json edit
```
"scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
  }
```

open terminal

`npm run dev`
```
> backend@1.0.0 dev
> nodemon -r dotenv/config --experimental-json-modules src/index.js

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node -r dotenv/config --experimental-json-modules src/index.js`

 MongoDB connected !! DB HOST: localhost
```


## Using express
in `./src` in `app.js`
```
import express from "express";
const app = express();
export {app}
```

in `./src` in `index.js`
```
//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

//new
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO_DB connection failed !!! ",err);
})
```

## Using express

in `./src` in `app.js`
```
import express from "express";
const app = express();
export {app}
```

in `./src` in `index.js`
```
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO_DB connection failed !!! ",err);
})
```
