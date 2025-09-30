import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = `Connection String`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


export default async() => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error");
        console.log(error);
    }
};


