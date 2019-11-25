// we can put all this in the server.js file but to not clutter it we seperate it
// and use this file.
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// let's create an async function
const connectDB = async () => {
	// we'll use a try and catch block.
	try {
		// since mongoose.connect returns a promise >>>
		await mongoose.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		});
		console.log('mongoDB connected');
	} catch (err) {
		console.error(err.message);
		// exit process using:
		process.exit(1);
	}
};

// at the end we need to export the function
module.exports = connectDB;
