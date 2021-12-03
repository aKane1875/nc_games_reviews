# **Games Review API**

This RESTful API was built using node-postgres as part of the Northcoders programming bootcamp and is hosted on Heroku, link below. Initial project README docs provided by Northcoders are available in the project_information directory

https://nc-games-reviews.herokuapp.com/api

This acts as a games review API, giving access to reviews and all related comments. Queries can be made, order can be arranged, reviews can be filtered by category. All available routes available by visiting the /api endpoint.

## **Dependencies**

The following dependencies will need to be installed:

- express
- pg
- pg-format
- dotenv

Dev dependencies for this project are:

- jest
- jest-sorted
- supertest
- nodemon

## **Start Up Information**

Scripts to run locally:

- For initial database setup: npm setup-dbs
- to seed local database: npm run seed

You will need to create 2 .env files to set the database, firstly create an .env.development file and add the following line:
PGDATABASE=nc_games

Then create a .env.test file adding the line
PGDATABASE=nc_games_test

Add both these .env files to your .gitignore file

This API was created using node.js version 16.13.0 and Postgres version 12.9
