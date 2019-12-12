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

## Make Requests to the Back-End on Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0ae852d80fd01e0822b1#?env%5Bshare-stuff%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJsb2NhbGhvc3Q6MzAwMSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYXV0aFRva2VuIiwidmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKZmFXUWlPaUkxWkdZeFltRTJPV0kzTVdVME9UQmtPRGd3TVdOaE1qQWlMQ0pwWVhRaU9qRTFOell4TWpNNE16Y3NJbVY0Y0NJNk1UVTNOakl4TURJek4zMC5JY1JMTE9yVXpEVTNDeVgwRno3Wnl5OGFxNzlpY2FJcTRzTEdYbmw3MFc4IiwiZW5hYmxlZCI6dHJ1ZX1d)

## Connect Remote Database to Robo3T
1. download Robo3T [here](https://robomongo.org/download)
2. Open Robo3T
3. Click File > Connect 
4. Address: ds353358.mlab.com  :  53358

![Connection](https://i.imgur.com/bM2T0jb.jpg?1 "connection")

5. Click on Authentication tab
6. Database: share-stuff,   User Name: robo3t,    Password: password1

![Authentication](https://i.imgur.com/Zi4gQP1.jpg?1 "authentication")

7. Click Save
