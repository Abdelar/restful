const express = require('express');
const movies = require('./movies');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = 3000;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/movies', movies);

// Home route
app.get('/api', (req, res) => {
	res.send('<h1 style="font-family:sans-serif">hitting the home page</h1>');
});

// Catch wild requests
app.use((req, res) => {
	res
		.status(404)
		.send('<h1 style="font-family:sans-serif">Error 404: Not found</h1>');
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
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
