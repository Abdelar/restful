const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors);

app.get('/', (req, res) => {
	console.log('hitting home page');
});

app.listen(3000, () => console.log('Starting the server'));
