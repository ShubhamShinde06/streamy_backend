
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
app.js | index.js | constants.js create a files

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

