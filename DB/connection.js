import mongoose from "mongoose";

const connectDB = async () => {
    return await mongoose.connect(process.env.DB).
    then(() => {
        console.log("DB connected successfully");
    }).catch( (err) => {
        console.log(`error to connect DB: ${err}`);
    });
}

export default connectDB;