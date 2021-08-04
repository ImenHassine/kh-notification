## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js v12.16.1 or higher is required.
npm v6.13.4 or higher is required.
express v or higher is required.
psql 12.4 (Ubuntu 12.4-1.pgdg16.04+1))

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install express
$ sudo apt install node-express-generator

```

Follow [our installing guide](http://expressjs.com/en/starter/installing.html)
for more information.

An easy way to get started with a Express server with PostgreSQL with Node.js. [Read more about it.](https://www.robinwieruch.de/postgres-express-setup-tutorial/)

## Features

- Expres
- REST API
- PostgreSQL

## Requirements

- [node & npm](https://nodejs.org/en/)
- [git](https://www.robinwieruch.de/git-essential-commands/)

## **1. Setup PostgreSQL Database**

- Activate PostgreSQL server, then create a **_wallet_catalog_**:

  ```bash
  $ sudo -u postgres psql

  $ CREATE DATABASE wallet_catalog;

  $ \c wallet_catalog;

  $ \d (To see all the tables in wallet_catalog database)

  ```

- **Done!** :thumbsup:

#

## **1. Installation**

- `git clone ssh://git@gitlab.paypos.tn:2208/khallasli-refonte/api-service-wallet.git`
- `cd api-service-wallet`
- `npm install`
- [start PostgreSQL](https://www.robinwieruch.de/postgres-express-setup-tutorial/)
- Open **_app.js_** & edit these lines to configure your database:
  ```javascript

  ```

#

### GET Routes

- visit http://localhost:5000
  - /

#### Postman

- Install [Postman](https://www.getpostman.com/apps) to interact with REST API

## Quick Start

- Save it, then run your backend project. It will run at **_localhost:5000_**:
  To run it on another port : open cli and run

````bash
   export PORT=5000
   ```
 Start the server:

   ```bash
   $ node index
   ```
or install nodemon :
```bash
   $ npm install -g nodemon
   ```
and run
```bash
   $ nodemon index
   ```
- __Done!__ :thumbsup:
````
