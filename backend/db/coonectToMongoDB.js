import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTIONSTRING);
        console.log("Connected to MongoDB");
    } catch(error) {
        console.log("Error connection to MongoDB");
    }
}

export default connectToMongoDB;