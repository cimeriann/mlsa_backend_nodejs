import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 21 
    }, 
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 21 
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 21 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
        minLength: 6,
    }, 
    gender: {
        type: String,
        enum: [ 'Male', 'Female']
    }
});

const User = mongoose.model('users', userSchema);

export default User;