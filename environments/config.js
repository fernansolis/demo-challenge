const path = require('path')
require('dotenv').config({ path: path.join(__dirname, `../.env`) })

//Using .env file: production or development
let env = process.env.NODE_ENV;
require('dotenv').config({ path: path.join(__dirname, `../.env.${env}`) })
