// mongoose connection
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose');


const connectMongo = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    });


    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
        process.exit(-1);
    });
}

module.exports = connectMongo;