const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

const mongoConnection = require('./src/db/Connection');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;


// mongo connection
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));


app.use(express.json());

mongoConnection();

// Auth
const AuthRouter = require('./src/router/AuthRouter');
app.use('/auth', AuthRouter);

// UserDemand
const UserDemandRouter = require('./src/router/UserDemandRouter');
app.use('/demand', UserDemandRouter);

// Diet
const DietRouter = require('./src/router/DietRouter');
app.use('/diet', DietRouter);



app.get('/healt', (req, res) => {
  res.status(200).json({ message: 'ok' })
})

app.listen(port, () => {
  console.log(`Healium app listening on http://${host}:${port}/`)
})