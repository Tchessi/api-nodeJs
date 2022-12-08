const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const groupSchema = mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		createdAt: { type: Date, default: Date.now() },
		updatedAt: { type: Date, default: Date.now() },
	});

groupSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Group', groupSchema);