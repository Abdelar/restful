const movies = require('express').Router();

movies.get('/', (req, res) => res.send('hitting movies router'));
movies.post("/",)

module.exports = movies;
