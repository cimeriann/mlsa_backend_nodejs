import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import logger from '../utils/logger.js';

configDotenv();

const database_url = process.env.MONGO_URI;

export const connectDB = async () => {
    await mongoose.connect(database_url).then(()=>{
        logger.info('Successfully connected to database')
    }).catch((error) =>{
        logger.error('Error connecting to database')
    })
} 