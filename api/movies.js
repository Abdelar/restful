const Movie = require('./models/Movie');

const movies = require('express').Router();

// Get All movies
movies.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		res.json(movies);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Add one or many movies
movies.post('/', async (req, res) => {
	try {
		if (req.body.collection) {
			await Movie.insertMany(
				req.body.collection.map(movie => {
					return new Movie({
						title: movie.title,
						rated: movie.rated,
						year: movie.year,
					});
				})
			);
			res.json({ message: 'All records have been saved' });
		} else {
			const movie = new Movie({
				title: req.body.title,
				rated: req.body.rated,
				year: req.body.year,
			});
			await movie.save();
			res.json({ message: 'Movie saved' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// Fetch a specific movie
movies.get('/:movieId', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.movieId);
		res.json(movie);
	} catch (err) {
		res.status(404).json({ message: err });
	}
});

// Delete a movie from the db
movies.delete('/:movieId', async (req, res) => {
	try {
		const deletedMovie = await Movie.deleteOne({ _id: req.params.movieId });
		res.json({ message: 'Movie deleted successfully' });
	} catch (err) {
		res.status(404).json({ message: err });
	}
});

// Delete many movies from the db
movies.delete('/', async (req, res) => {
	try {
		if (req.body.collection) {
			await Movie.deleteMany({ _id: { $in: req.body.collection } });
			res.json({ message: 'deleted the specified records' });
		} else {
			await Movie.deleteMany({});
			res.json({ message: 'All records deleted' });
		}
	} catch (err) {
		res.json({ message: err });
	}
});

// Update a movie
movies.patch('/:movieId', async (req, res) => {
	try {
		const updatedMovie = await Movie.updateOne(
			{ _id: req.params.movieId },
			{
				$set: {
					title: req.body.title,
				},
			}
		);
		res.json({ message: 'Movie updated successfully' });
	} catch (err) {
		res.status(404).json({ message: err });
	}
});

module.exports = movies;
