# client

## Technologies
| Technology | Description | Documentation |
|------------|-------------|---------------|
| Vue.js     | UI framework | [docs](https://vuejs.org/v2/guide/) |
| Vuex       | State management | [docs](https://vuex.vuejs.org/) |
| VueRouter  | Front-end routing | [docs](https://router.vuejs.org/guide/#html) |
| Vuetify    | Library of styled Vue components (similar to bootstrap) | [docs](https://vuetifyjs.com/en/components/api-explorer) |
| Jest       | Unit testing framework | [docs](https://jestjs.io/docs/en/getting-started.html) |
| sass/node-sass | Styling language transpiled into css | [docs](https://sass-lang.com/documentation) |
| Validator  | Library used to validate user input | [docs](https://www.npmjs.com/package/validator) |
| js-cookie  | Library used to set/remove browser cookies | [docs](https://www.npmjs.com/package/js-cookie) |
| axios | Library used to make network requests | [docs](https://www.npmjs.com/package/axios) |
| Babel | Build tool used to transpile ES6 to earlier versions of JS | [docs](https://babeljs.io/docs/en/) |

## File Structure

### public
This is where the root ```index.html``` file lives.  This file containes a ```<div id="app"></div>``` which is the element we target to mount the entire Vue application.  Nothing in this folder needs to be touched during development.

### src
Outside of tooling and testing, this folder contains all the files necessary to development.  This is where all of the logic, markup and styling for the front-end exists before it is transpiled.  There should be little need to write any code outside of this directory. 

#### apis
This directory contains all netword requests to the server on the back-end.  All data fetching should occur inside this directory.  Organize request logic in files according to what kind of data is being fetched.

#### assets
This directory contains media assets necessary to the user interface.  Perhaps the only file we'll need here will be a logo image file.

#### components
Similar to React, the Vue paradigm splits the user interface up into reusable components.  Each component contains its own styling, logic and markup.  All components used in this application will be found in the components directory.

#### plugins
This is where Vue pluggins can be implemented.  The only one currently in use is Vuetify.

#### router
This is the directory used to establish front-end routes with VueRouter.

#### store
This contains all files necessary to the central state store.  We're using VueX for this purpose.  The store is divided into different files that catagorize the store into different sub-sections.  Each sub-section is loaded into the ```index.html``` files where they're incorporated into the application via the ```modules: { ... }``` object.

#### utils
This repository is used to store utility functions.
1. cacheHandler is used to interact with cookies and local storage.
2. debounce is used as a wrapper for other functions.  It limits the frequency the wrapped function can be called.  Used with network requests.
3. firstAndLastName take a fullName and returns the first and last name.

#### views
This directory contains all of the views/pages in the application.  These files import the necessary components and build complete pages with them. 

#### tests
This directory contains all front-end unit tests.

## Project setup & scripts
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
