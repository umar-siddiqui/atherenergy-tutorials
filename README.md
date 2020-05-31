# atherenergy-tutorials

a [Sails v1](https://sailsjs.com) application


### PR of changes done for the scope of the assignment
> [https://github.com/umar-siddiqui/atherenergy-tutorials/pull/1](https://github.com/umar-siddiqui/atherenergy-tutorials/pull/1)

### REST API DOCUMENTS
**Sample examples of documentation use hosted demo app in PRODUCTION enviroment**
* [Create tutorial](https://github.com/umar-siddiqui/atherenergy-tutorials/wiki/Create-tutorial)
* [Fetch Tutorials](https://github.com/umar-siddiqui/atherenergy-tutorials/wiki/Fetch-Tutorials)
* [Show Tutorial](https://github.com/umar-siddiqui/atherenergy-tutorials/wiki/Show-Tutorial)
* [Update Tutorial](https://github.com/umar-siddiqui/atherenergy-tutorials/wiki/Update-Tutorial)
* [Delete Tutorial](https://github.com/umar-siddiqui/atherenergy-tutorials/wiki/Delete-Tutorial)
* [Delete All Tutorials](https://github.com/umar-siddiqui/atherenergy-tutorials/wiki/Delete-All-Tutorials)

## Local setup

### Prerequisite
* Install nodejs 12+
* Postgresql 12.3
* GIT

### Steps
* Clone project repo
  ```bash
  git clone https://github.com/umar-siddiqui/atherenergy-tutorials.git
  cd atherenergy-tutorials
  ```
* Install node package dependences
  ```bash
  npm install sails -g
  npm install
  ```
* Create a database and role
  ```bash
  psql -U postgres postgres # Login as superuser
  ```
  ```sql
  CREATE ROLE atheradmin WITH LOGIN PASSWORD 'atheradmin';
  ALTER ROLE atheradmin CREATEDB;
  CREATE DATABASE atherenergy_tutorials OWNER atheradmin;
  \c atherenergy_tutorials;
  CREATE EXTENSION citext;
  ```
* Run migrations and seed
  ```bash
  sails run create-app-tables --migrationType=up
  sails run seed-api-key # => token = FASDASDASDASD_somerandomkey_34fqfsffwfevvwEWEWQ
  ```
* App starts at [http://localhost:1337](http://localhost:1337) <br />
  [Refere API documentation for further usage details](https://github.com/umar-siddiqui/atherenergy-tutorials#rest-api-documents)


## Production setup

### Prerequisite
* Docker version
* docker-compose
* GIT

### Steps
* Clone project repo
  ```bash
  git clone https://github.com/umar-siddiqui/atherenergy-tutorials.git
  cd atherenergy-tutorials
  ```
* Create docker-compose.yml from docker-compose.example.yml
  > Replace `{{ eg. postgres }}` with desired super user password to set inside postgres container <br />
  > `- POSTGRES_PASSWORD=postgres` <br />
  > Replace `{{ eg. postgresql://atheradmin:atheradmin@db:5432/atherenergy_tutorials }}` with desired postgres credentails <br />
  > `- POSTGRES_URL=postgresql://atheradmin:atheradmin@db:5432/atherenergy_tutorials` <br />
  > Replace `{{ eg. AET.29af79673bc5531a64a1e79cd4100b65 }}` with desired secret which will be used to create api key hash<br />
  > `- API_KEY_SECRET=AET.29af79673bc5531a64a1e79cd4100b65 }}` <br />
* Build docker images
  ```bash
  docker-compose build
  ```
* Start docker container for App and DB as defined in docker-compose.yml file
  ```bash
  docker-compose up -d
  ```
* Create a database and role
  ```bash
  docker exec -it atherenergy-tutorials_app_1 /bin/bash
  psql -U postgres postgres
  ```
  ```sql
  CREATE ROLE atheradmin WITH LOGIN PASSWORD 'atheradmin';
  ALTER ROLE atheradmin CREATEDB;
  CREATE DATABASE atherenergy_tutorials OWNER atheradmin;
  \c atherenergy_tutorials;
  CREATE EXTENSION citext;
  ```
* Run migrations and seed
  ```bash
  ./node_modules/sails/bin/sails.js run create-app-tables --migrationType=up
  ./node_modules/sails/bin/sails.js run seed-api-key # => token = FASDASDASDASD_somerandomkey_34fqfsffwfevvwEWEWQ
  ```
* App starts at port `:80` of host machine

## Execute test case locally in TEST environment
(Run local setup first)

* Create a test database
  ```bash
  psql -U postgres postgres
  ```
  ```sql
  CREATE DATABASE atherenergy_tutorials_test OWNER atheradmin;
  \c atherenergy_tutorials_test;
  CREATE EXTENSION citext;
  ```
* Run tests
  ```bash
  npm run test
  ```


## Changelog

- Setup initial Sails project development environment setup & dependencies (nodemon, lodash latest version, etc)
- Created model for storing tutorials data
- Created controller for tutorials to override fetch all tutorials blueprint action(find)
- Implemented feature for the filter as per status and contains search on the title
- Implemented limit and skip params to query limit and skip for fetch tutorials API
- Implemented action for delete all tutorial as soft delete
- Used blueprint APIs for the rest of the CRUD operations
- Implemented API Key based authentication by add ApiKey model and policy for the same
- Configured Postgres for development environment
- Added seed data for the ApiKey and Tutorial model
- Added migration script for application tables using Knex.js package
- Configured the production environment
- Dockerized the application and deployed on production instance using docker-compose
- Refactored migration script to use helper which will also be used to test case execution
- Setup test environment for running test cases using Mocha, Chai, and Supertest
- Added positive test cases for all acceptance criteria as per assignment requirements
- Added namespace for blueprint API
- Enhanced API key authentication to store hashed key instead of actual
- Enabled custom file logging for the production environment
- Added request logger middleware and disabled session and cookies as the app is API only
- Enhanced contains search filter to be case insensitive on the title for fetch tutorials API
- Added negative test case for tutorial controller actions
- Added custom response for 401 unauthorized request
- Implemented pagination feture on fetch tutorial api for batch records
