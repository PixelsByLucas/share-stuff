# Back-End

## Technologies
| Technology | Description | Documentation |
|------------|-------------|---------------|
| Node Express | Server framework | [docs](https://expressjs.com/en/guide/routing.html) |
| bcrypt | Used to hash passwords | [docs](https://www.npmjs.com/package/bcrypt) |
| MongoDB | Non-relational database being used | [docs](http://mongodb.github.io/node-mongodb-native/3.1/quick-start/quick-start/) |
| Mongoose | MongoDB ORM | [docs](https://mongoosejs.com/docs/index.html) |
| Multer | Express middleware for recieving multipart/form-data (images) | [docs](https://www.npmjs.com/package/multer) |
| Sharp | Image editing | [docs](https://www.npmjs.com/package/sharp) |
| Validator  | Library used to validate user input | [docs](https://www.npmjs.com/package/validator) |
| env-cmd | Allows access to environment variables inside .env file | [docs](https://www.npmjs.com/package/env-cmd) |
| nodemon | watches dev files and restarts server when edits made | [docs](https://www.npmjs.com/package/nodemon) |

## File Structure

### config
containes environment variables inside a .env file.

### src
All dev files contained within this folder.

#### db
Contains ```mongoose.js``` which connects to our remote MongoDB and provides configuration.

#### middleware
Contains middleware for our server routes.  Our auth middleware lives here.

#### models 
This repository contains all of our Mongoose models, organized into separate files.

#### routers
Contains different endpoint routes.  Organized into separate files with Express Router.

#### utils
A directory for utility functions and constant variables.

## Project setup & scripts
```
npm install
```

### Start server and listen for edits with Nodeman
```
npm run dev
```

### Start server
```
npm run start
```