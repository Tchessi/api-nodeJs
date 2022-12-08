// const db = require('../Models/Group');
// const { Group } = mongoode.models;
const Group = require('../models/Group');

// exports.createGroup = (req, res) => {
// 	const group = new Group({
// 		name: req.body.name,
// 		createdAt: new Date(),
// 		updatedAt: new Date()
// 	});

// 	// On enregistre le group dans la base de données
// 	group
// 		.save()
// 		.then(() => res.status(201).json({ message: 'Groupe créé avec succès!' }))
// 		.catch((error) => res.status(400).json({ error }));
		
		
// };

exports.createGroup = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({ message: "Ce champ ne peut pas etre vide!" });
		return;
	}

	// Create a Group
	const group = new Group({
		name: req.body.name,
		createdAt: new Date(),
		updatedAt: new Date()
	});

	// Save Group in the database
	group
		.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Groupe."
			});
		});
};
exports.getOnegroup = (req, res) => {
		Group.findOne({ where: { id: req.params.id } })
			.then((group) => res.status(200).json({ group }))
			.catch((error) => res.status(404).json({ error }));
};

exports.getAllGroups = (req, res) => {
	Group.find()
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json({ error });
		});
};

exports.updateGroup = (req, res) => {

	if (!req.body) {
		return res.status(400).send({
			message: "Les données à mettre à jour ne peuvent pas être vides!"
		});
	}
	const id = req.params.id;
	Group.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Impossible de mettre à jour du group!`
				});
			} else res.send({ message: "Le groupe a été mis à jour avec succès!" });
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating group with id=" + id
			});
		});
};

exports.deleteGroup = async (req, res) => {
	const id = req.params.id;

	Group.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Groupe impossible avec id=${id}. Peut-être que le groupe n'a pas été trouvé!`
				});
			} else {
				res.send({
					message: "Groupe supprimé avec succès!"
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Impossible de supprimer ce groupe avec l'id=" + id
			});
		});

};
