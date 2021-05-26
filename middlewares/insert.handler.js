require('dotenv').config()
const axios = require('axios');
const { usersRepository } = require('../repositories/index.repository')

const url_service = process.env.URL_SERVICE;

async function searchUser(id){
    try {
        let url = `${url_service +`/`+id }`;
        let user = []

        const result = await axios.get(url);
        //For return an object array
        user.push({
            id: result.data.data.id,
            first_name: result.data.data.first_name,
            last_name: result.data.data.last_name,
            email: result.data.data.email,
            company: "",
            url: "",
            text: ""
        })
        //Inserting user in database 
        const addingUser = await usersRepository.addUser(user[0]);
        if(addingUser.statusCode === 201){
            return user;
        } else {
            return [];
        }
    } catch (error) {
        //If searching was fail
        if(error.response.status === 404){
            return [];
        } else {
            throw error
        }
    }
}

module.exports = {
    searchUser,
}