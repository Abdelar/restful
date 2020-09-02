Movie = require('./models/Movie');
const movies = require('express').Router();

// All movies
movies.get('/', (req, res) => res.send('All movies'));

// Add a movie
movies.post('/', (req, res) => {
	const movie = new Movie({
		title: req.body.title,
		rated: req.body.rated,
		year: req.body.year,
	});
	movie.save().then(() => res.send('movie saved'));
});

module.exports = movies;
