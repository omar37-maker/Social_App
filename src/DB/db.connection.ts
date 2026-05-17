import mongoose from "mongoose"
import { envConfig } from "../config";

const { database} = envConfig



export const dbConnection = async () => { 
    try {

        await mongoose.connect(database.MONGO_URI)
        console.log("Db connected successfully on", database.MONGO_URI);
        

    } catch (error) { 
        console.log(`DB connection failed`, error);
        
    }
}

