require("dotenv").config();
require("../config/mongo");
const UserModel = require("../model/userModel");
const users = [
    {
        firstName: "Alexis",
        lastName: "Verthuy",
        email: "alexis.verthuy@gmail.com",
        password: "123456",
        role: "user"
    },
    {
        firstName: "Victoria",
        lastName: "Virlan",
        email: "v.virlan@hotmail.com",
        password: "azerty",
        role: "admin"
    },
    {
        firstName: "Fatou",
        lastName: "Diaby",
        email: "fdiaby@laposte.net",
        password: "hello2020",
        role: "user"
    },
]

UserModel.deleteMany() 
.then( UserModel.insertMany(users))
.then(dbSuccess => {
    console.log(dbSuccess);
})
.catch(dbError => {
    console.log(dbError);
});