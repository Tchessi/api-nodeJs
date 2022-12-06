const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	firstname: { type: String, required: true, unique: true },
	lastname: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	// createdAt: { type: Date, default: Date()},
	// updatedAt: { type: Date, default: Date()},
	password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);