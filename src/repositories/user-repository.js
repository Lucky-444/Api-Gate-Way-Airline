const crudRepository = require('./crud-repository');
const {User}  = require('../models');


console.log("User model:", User); // Add this in UserRepository.js

class UserRepository extends crudRepository{
        constructor(){
                super(User);
        }

        async getUserByEmail(email){
                const user = await User.findOne({where : { email : email }});
                
                return user;
        }
}

module.exports = UserRepository;
