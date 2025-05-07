const crudRepository = require('./crud-repository');
const {User , Role}  = require('../models');


console.log("User model:", User); // Add this in UserRepository.js

class RoleRepository extends crudRepository{
        constructor(){
                super(User);
        }

        async getRoleByName(name){
                const role = await Role.findOne({where : { name : name }});
                
                return role;
        }
}

module.exports = RoleRepository;
