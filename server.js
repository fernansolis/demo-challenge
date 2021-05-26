// Modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const dbHelper = require('./helpers/db.helper')

const clientErrorHandler = require('./middlewares/clientError.handler')
const errorHandler = require('./middlewares/error.handler')

// Use environments
require('./environments/config')

const app = express()

//--------------------Use coors--------------------
app.use(cors())

app.use(bodyParser.json({ limit: '100kb' }))
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '100kb',
    })
)
app.use(bodyParser.text({ limit: '100kb' }))

// Use Routes
app.use(require('./routes/index.route'))
// use error handlers
app.use(clientErrorHandler)
app.use(errorHandler)

//Init DB connection
dbHelper.sequelize
    .authenticate()
    .then(() => {
        app.listen(process.env.HTTP_PORT, async () => {
            console.log(`Listen port: ${process.env.HTTP_PORT}`)
        })
    })
    .catch(err => {
        throw err
    })

module.exports = app;