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
  sails run seed-api-key
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
  ./node_modules/sails/bin/sails.js run seed-api-key
  ```
* App starts at port `:80` of host machine
