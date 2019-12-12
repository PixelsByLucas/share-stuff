# Share Stuff

## Overview

A web application designed to facilitate and encourage the borrowing and lending of household items among users.  No currency changes hands.  Instead, points are earned for lending and used as payment for borrowing from others.

## File Structure

### .vscode
This contains configuration for eslint which works in combination with prittier to format and standardize syntax.

### api
This directory contains all back-end files.  The back-end is built with Express and MongoDB.  A more in-depth README specific to this repository can be found within it.

### client
This directory contains all front-end files.  The front-end is build with Vue.js.  A more in-depth README specific to this repository can be found within it.

## Getting Started 
1. Navigate into the ```/api``` directory.  Run ```npm install``` in the terminal.
2.  find the ```.env.exmaple``` file inside ```/api/config``` and remove the ```.example``` from the end of the file name.  Fill in the values after the ```=``` with the values you've been provided personally.  
3. Navigate into the ```/client``` directory.  Run ```npm install``` in the terminal.
4.  find the ```.env.development.local.exmaple``` file inside ```/client``` and remove the ```.example``` from the end of the file name.  Fill in the values after the ```=``` with the values you've been provided personally.  
5. Start back-end server: navigate to ```/api```.  Run ```npm run dev```.
6. Start Vue.js: navigate to ```/client```.  Run ```npm run serve```.  Dev server will run on http://localhost:8080/. 

