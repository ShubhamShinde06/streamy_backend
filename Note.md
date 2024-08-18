
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

`PORT = 8000`

`LOCALHOST_MONGO_DB_URL = mongodb://localhost:27017/`




##  create floder ./src
`app.js`
`index.js`
`constants.js`
create a files

## two types import in javascript edit in package.json
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

```
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.LOCALHOST_MONGO_DB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGO CONNECTION ERROR", error);
        process.exit(1)
    }
}

export default connectDB;
```

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

## install new npm package

cors Allow to access only selected frontend url and cookie is securely read and write only server

``` npm i cookie-parser ```

``` npm i cors ```

`./src` in `./app.js`

```
import express from "express";
import cors from "cors"; //this
import cookieParser from "cookie-parser"; //this

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) //this
app.use(express.json(
    {
        limit: "16kb"
    }
)) //this
app.use(express.urlencoded(
    {
        extended: true, 
        limit: "16kb"
    }
)) //this
app.use(express.static("public")) //this
app.use(cookieParser()) //this
 
export {app} 
```

## Error Handling

in `utils` in create file `asyncHandler.js`

```
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}
export {asyncHandler}
```

in `utils` in create file `ApiError.js`

```
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        statck = ""
    )
    {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (statck){
            this.stack = statck
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}
```

in `utils` in create file `ApiResponse.js`

```
class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }    
}

export {ApiResponse}
```

### HTTP response status
* informational res (100 - 199)
* successful res (200 - 299)
* redirection mes (300 - 399)
* client error res (400 - 499)
* server error res (500 - 599)

## Create Models 

in `models` in create file `user.model.js`

```
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User",userSchema)
```

in `models` in create file `video.model.js`

```
import mongoose,{Schema} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export const Video = mongoose.model("Video", videoSchema)
```

## new install npm pakage

```npm install mongoose-aggregate-paginate-v2```

in `./src` in `./models` in `videos.models.js`

```
import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2" // this

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    }
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate) //this

export const Video = mongoose.model("Video", videoSchema)
```

### new install npm pakage

```npm install bcrypt``` // a library help you hash password

in `./src` in `./models` in `user.models.js`

```
import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"; /this

const userSchema = new Schema(
    {
    }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
}) //this normal password convert to hash password

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
} //this compare user password and hash password

export const User = mongoose.model("User",userSchema)
```

```npm install jsonwebtoken``` 

in `.env`
``` 
PORT = 8000
CORS_ORIGIN = *

LOCALHOST_MONGO_DB_URL = mongodb://localhost:27017/

ACCESS_TOKEN_SECRET = Eh4@~A6J$VWf4Re~Djd_Ck7*->AH1p/Vx6%^D8b$r5 // this

ACCESS_TOKEN_EXPIRY = 1d  // this

REFRESH_TOKEN_SECRET = Wp9|oE9Fm*18Rw4$ZZycqutLo6ux8rhX6Pb2^XsdaEqu  // this

REFRESH_TOKEN_EXPIRY = 15d  // this
```

in `./src` in `./models` in `user.models.js`
```
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"; //this
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
    }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generatAccessToken = function(){
   return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} //this

userSchema.methods.generatRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
} //this

export const User = mongoose.model("User",userSchema)
```

## file uploading

* install package

`npm i cloudnary`
`npm i multer`

in `./src` in `./utils` create `cloudnary.js`

```
import {v2 as cloudinary} from "cloudinary"
import {fs} from "fs" // file read write remove etc.

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        const res = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary",red.url);
        return res;
    } catch(err){
        fs.unlinkSync(localFilePath) // remove the local saved temp file as the upload opration got failed
        return null;
    }
}

export {uploadOnCloudinary}
```

`.env`
```
CLOUD_NAME = #
API_KEY = #
API_SECRET = #
```

in `./src` in `./middleware` create `multer.middleware.js`

```
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round
        // (Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
})
```


