const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Récupération du model User ,créer avec le schéma mongoose
const User = require('../models/User');
// const Group = require('../models/Group');

exports.signup = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {

			const user = new User({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				createdAt: new Date(),
				updatedAt: new Date(),
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


exports.login = (req, res) => {

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

exports.editUser = (req, res) => {
	try {
		const userObject = req.file
			? {
				...JSON.parse(req.body.user)
			}
			: { ...req.body };

		console.log(userObject);
		req.user.update(userObject).then((user) => res.status(200).json({ user }));
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.getOneUser = (req, res) => {
	User.findOne({ where: { id: req.params.id } })
		.then((user) => res.status(200).json({ user }))
		.catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res) => {
	User.find()
		.then((users) => {
			res.status(200).json({ users });
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json({ error });
		});
};

exports.deleteUser = async (req, res) => {
	try {
		const user = req.user.admin
			? await User.findOne({ where: { id: req.params.id } })
			: req.user;
		await user.softDestroy();
		res.status(200).json({ message: 'Utilisateur supprimé' });
	} catch (error) {
		res.status(400).json({ error });
	}
};
