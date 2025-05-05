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

{
        difference between authentication and authorisation
        authorisation : assignig functionalities and permission and capabilites
        to different rolls of different users
        

        authentication : 
        identify  are you valid user or not


}
{
        different types of authentication
        passportjs

}

{
        jwt : json web tokens
        
}