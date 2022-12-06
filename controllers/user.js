const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Récupération du model User ,créer avec le schéma mongoose
const User = require('../models/User');

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {

			const user = new User({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				createdAt: Date.now,
				updatedAt: Date.now,
				password: hash,
			});

			// On enregistre l'utilisateur dans la base de données
			user
				.save()
				.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {

	User.findOne({ email: req.body.email })
		.then((user) => {

			if (!user) {
				return res.status(401).json({ error: 'Utilisateur non trouvé !' });
			}

			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {

					if (!valid) {
						return res.status(401).json({ error: 'Mot de passe incorrect !' });
					}

					res.status(200).json({
						userId: user._id, //On vérifie si la requête est authentifiée

						token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
							expiresIn: '24h',
						}),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};