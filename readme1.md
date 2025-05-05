{
        we first create a user model first
        `npx sequelize model:generate --name User --attributes email:string,password:string`
}

{
        here the password in the sql is not stored in password manner
        so we use sequelize hooks
        before entry of password in DB we encrypt the password
        we use bcrypt
        we use it in models 

}