import mongoose from "mongoose";

const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('DB online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing DB');
    }

}

export default dbConnection;