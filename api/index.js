const express = require('express');
const movies = require('./movies');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/movies', movies);

// Home route
app.get('/', (req, res) => {
	res.send('hitting the home page');
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log('Connected to the database'));
db.on('error', () => console.log('Failed to connect to the database'));

// Listening to the server
app.listen(3000, () => console.log('Server Running'));
