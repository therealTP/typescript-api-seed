// Configure app environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// Import modules
import { Api } from './api/Api';
import { db } from './database/db';

// Create api
const newsApi = new Api();

// Connect to DB
db.connect();

// Start api
newsApi.start();