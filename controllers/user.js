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

exports.updateUser = (req, res) => {

	if (!req.body) {
		return res.status(400).send({
			message: "Les données à mettre à jour ne peuvent pas être vides!"
		});
	}
	const id = req.params.id;
	User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Impossible de mettre à jour l'utilisateur avec id=${id}. Peut-être que l'utilisateur n'a pas été trouvé!`
				});
			} else res.send({ message: "Utilisateur a été mis à jour avec succès!" });
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating user with id=" + id
			});
		});
};

exports.getOneUser = (req, res) => {
	const id = req.params.id;
	User.findById(id)
		.then(data => {
			if (!data)
				res.status(404).send({ message: "Utilisateur non trouvé avec id " + id });
			else res.send(data);
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Erreur lors de la récupération de l'utilisateur avec l'identifiant=" + id });
		});
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
	const id = req.params.id;

	User.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Utilisateur impossible avec id=${id}. Peut-être que l'utilisateur n'a pas été trouvé!`
				});
			} else {
				res.send({
					message: "Utilisateur supprimé avec succès!"
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Impossible de supprimer avec l'id=" + id
			});
		});

};
