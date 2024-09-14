const mongoose = require("mongoose");

const userSchema = new mongoose.schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const Users = mongoose.model('users', userSchema);
export default Users;