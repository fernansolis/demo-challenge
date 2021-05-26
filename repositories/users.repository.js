const queryGen = require('../utils/queryGen')

//Consuming database functions get, insert, update and delete
const getUsers = async ({ ids }) => {
    try {
        const query = `select get_all_users(:ids);`
        const result = await queryGen(
            query,
            {
                ids
            },
            true
        )
        return Object.values(result)[0];
    } catch (error) {
        throw error;
    }
}

const addUser = async ({ first_name, last_name, email, company, url, text }) => {
    try {
        const query = `select insert_user(:first_name, :last_name, :email, :company, :url, :text);`
        const result = await queryGen(
            query,
            {
                first_name,
                last_name,
                email,
                company,
                url,
                text
            },
            true
        )
        return Object.values(result)[0]
    } catch (error) {
        throw error;
    }
}

const updateUser = async ({ id, first_name, last_name, email, company, url, text }) => {
    try {
        const query = `select update_user(:id, :first_name, :last_name, :email, :company, :url, :text);`
        const result = await queryGen(
            query,
            {
                id,
                first_name,
                last_name,
                email,
                company,
                url,
                text
            },
            true
        )
        return Object.values(result)[0]
    } catch (error) {
        throw error;
    }
}

const deleteUser = async ({ id }) => {
    try {
        const query = `select delete_user(:id);`
        const result = await queryGen(
            query,
            {
                id,
            },
            true
        )
        return Object.values(result)[0]
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
}