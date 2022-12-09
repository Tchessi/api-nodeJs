const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		createdAt: { type: Date, default: Date.now() },
		updatedAt: { type: Date, default: Date.now() },
		password: { type: String, required: true },
		group: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "group"
		}
	});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);