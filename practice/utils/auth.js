import pkg from 'bcryptjs';
import pkg2 from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { genSaltSync, hashSync, compareSync} = pkg;
const { sign } = pkg2;
const jwt_secret = process.env.JWT_SECRET;

export const generateSecurePassword = (value) =>{
    const salt = genSaltSync(10);
    return hashSync(value, salt);
}

export const checkValidity = (value, otherValue) =>{
    return compareSync(value, otherValue);
}

export const createAccessToken = (id) =>{
    const token = sign({id}, jwt_secret);

    return token;
}