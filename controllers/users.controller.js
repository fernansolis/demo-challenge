const { usersService } = require('../services/index.service')

//CRUD controllers, making request by params, body or both
const getUsers = async (req, res, next) => {
    try {
        let ids = req.params.id;
        let arrayIds = ids.split(',');
        const result = await usersService.getUsers({ arrayIds });
        return res.status(result.statusCode).json({ result });
    } catch (error) {
        next(error)
    }
}

const addUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, company, url, text } = req.body;
        const result = await usersService.addUser({ 
            first_name,
            last_name,
            email,
            company,
            url,
            text
         });
        return res.status(result.statusCode).json({ result });
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        const { first_name, last_name, email, company, url, text } = req.body;
        const result = await usersService.updateUser({ 
            id,
            first_name,
            last_name,
            email,
            company,
            url,
            text
         });
        return res.status(result.statusCode).json({ result });
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        const result = await usersService.deleteUser({ 
            id,
         });
        return res.status(result.statusCode).json({ result });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
}