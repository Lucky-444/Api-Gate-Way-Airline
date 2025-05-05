const crudRepository = require('./crud-repository');
const {User}  = require('../models');


console.log("User model:", User); // Add this in UserRepository.js

class UserRepository extends crudRepository{
        constructor(){
                super(User);
        }
}

module.exports = UserRepository;
