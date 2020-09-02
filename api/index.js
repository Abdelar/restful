const express = require('express');
const movies = require('./movies');

const app = express();

app.use(express.json());
app.use('/movies', movies);

app.get('/', (req, res) => {
	res.send('hitting the home page');
});

app.listen(3000, () => console.log('Server Running'));
