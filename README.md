
# USERS API

A simple REST API in Node.js

<details  open="open">
<summary>Content</summary>
<ol>
<li>
<a  href="#about">About</a>
</li>
<li>
<a  href="#setup">Setup</a>
<ul>
<li><a  href="#requirements">Requirements</a></li>
<li><a  href="#installation">Installation</a></li>
</ul>
</li>
<li><a  href="#usage">Usage</a></li>
</ol>
</details>

  

## About

Simple REST API of CRUD users. This project was built with:

*  [Node js](https://nodejs.org/en/)

*  [Express](https://expressjs.com/)

*  [PostgreSQL](https://www.postgresql.org/)


## Setup

### Requirements

* Node v16.2.0

* Express v4.17

* PostgreSQL v12

For the tests

* Supertest v6.1

* Mocha v8.4
  

### Installation

Install npm before these steps if you don't have it.

1. Clone the repo.

```
git clone https://github.com/fernansolis/demo-challenge.git
```

2. Run this command in terminal inside folder project.

```
npm install
```

3. Create a file named .env in the root folder.

| Env name | Description |
| :----------- | :----------------------|
NODE_ENV | Type of environment, it can be ```production | development```. |
 
  4. Create a file named ".env." followed by the environment type (example: .env.production) .

| Env name | Description |
| :----------- | :----------------------|
HTTP_PORT| Port to enable connection http. ```5000```. |
DB_NAME| Database name. Default ```demo_challenge```. |
DB_USER | Database user. Default ```postgres```. |
DB_PASS| Database user password. Default ```postgres```.|
DB_HOST| Database host. ```localhost```.|
DB_PORT | Database port. Default ```5432```.|
URL_SERVICE| Endpoint to get users data.|

# Usage

1. Create the .env files with the above environment variables.

2. Create a new PostgreSQL database and run the init.sql script located in postgresql folder to generate users table and functions.

3. Make sure PostgreSQL database is available. After that, run ```npm start```
in the root folder.

4. You can now use all request from Postman by the routes: 
	GET - ```http://localhost:5000/api/users/:id```
	POST - ```http://localhost:5000/api/users/```
	PUT - ```http://localhost:5000/api/users/:id```
	DELETE - ```http://localhost:5000/api/users/:id```
	
  5. If you want to deploy with pm2, stop the ```npm start```, run ```npm dev``` and it will start in a single process.

### Tests

The tests were done with Supertest and Mocha.

1. Check the connection with PostgreSQL is done.

2. Run ```npm test``` in the root folder.

  

## Thanks for reading this
