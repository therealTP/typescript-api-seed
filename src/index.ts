// Configure app environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// Import modules
import { Api } from 'api/Api';
import { dbConnect } from 'database/DbConnect';

// Create api
const newsApi = new Api();

// Connect to DB
dbConnect.connect();

// Start api
newsApi.start();