const express = require('express')
const app = express()
const router = express.Router()
const { usersController } = require('../controllers/index.controller')

//Routing all requests
router.get('/:id', usersController.getUsers)
router.post('/', usersController.addUser)
router.put('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

app.use('/api/users', router)

module.exports = app