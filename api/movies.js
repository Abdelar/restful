const Movie = require('./models/Movie');

const movies = require('express').Router();

// All movies
movies.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		res.json(movies);
	} catch (err) {
		res.json({ message: err });
	}
});

// Add a movie
movies.post('/', async (req, res) => {
	const movie = new Movie({
		title: req.body.title,
		rated: req.body.rated,
		year: req.body.year,
	});

	try {
		const savedMovie = await movie.save();
		res.send(savedMovie);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = movies;
