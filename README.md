# atherenergy-tutorials

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sat May 30 2020 05:49:26 GMT+0530 (India Standard Time) using Sails v1.2.4.

<!-- Internally, Sails used [`sails-generate@1.17.2`](https://github.com/balderdashy/sails-generate/tree/v1.17.2/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->
```bash
docker exec -it atherenergy-tutorials_app_1 /bin/bash
./node_modules/sails/bin/sails.js run create-app-tables --migrationType=up
./node_modules/sails/bin/sails.js run seed-api-key
```

```bash
# Login with superuser
psql -U postgres postgres
```

```sql
CREATE ROLE atheradmin WITH LOGIN PASSWORD 'atheradmin';

ALTER ROLE atheradmin CREATEDB;

CREATE DATABASE atherenergy_tutorials OWNER atheradmin;

\c atherenergy_tutorials

CREATE EXTENSION citext;
```
