const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	year: Number,
	rated: String,
});

module.exports = mongoose.model('Movies', MovieSchema);
