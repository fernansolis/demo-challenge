const { usersRepository } = require('../repositories/index.repository')
const { searchUser } = require('../middlewares/insert.handler');

//For get one user or many users
const getUsers = async ({ arrayIds }) => {
    try {
        const ids = null;
        //Getting all users in database
        let allUsers = await usersRepository.getUsers({ ids }) 

        //Array with final data to return
        let filteredData = [];

        //If user table is empty, will search in the endpoint the users required
        if(allUsers.data === null || allUsers.data.length === 0){
            for(let id of arrayIds){
                let userFinded = await searchUser(id);
                if(userFinded.length > 0){
                    filteredData.push(userFinded[0]);
                }
            }
        } else {
            //If user table is not empty and will check each one of users, if there arent exist on database
            //will search in the endpoint
            for(let id of arrayIds){
                id = parseInt(id);
                let userinDB = allUsers.data.filter(x => { if(id === x.id){ return x;} })
                if(userinDB.length > 0){
                    filteredData.push(userinDB[0]);
                } else {
                    let userFinded = await searchUser(id);
                    if(userFinded.length > 0){
                        filteredData.push(userFinded[0]);
                    }
                }
            }
        }

        //Replacing array data
        allUsers.data = filteredData;
        return allUsers;
    } catch (error) {
        throw error
    }
}

//For add one user in database
const addUser = async ({ first_name, last_name, email, company, url, text = null }) => {
    try {
        const result = await usersRepository.addUser({
            first_name,
            last_name,
            email,
            company,
            url,
            text,
        })

        return result
    } catch (error) {
        throw error
    }
}

//For update one user in database by id
const updateUser = async ({ id, first_name, last_name, email, company, url, text = null }) => {
    try {
        const result = await usersRepository.updateUser({
            id,
            first_name,
            last_name,
            email,
            company,
            url,
            text,
        })

        return result
    } catch (error) {
        throw error
    }
}

//For delete one user in database by id
const deleteUser = async ({ id }) => {
    try {
        const result = await usersRepository.deleteUser({
            id,
        })

        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
}