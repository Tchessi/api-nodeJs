// const db = require('../Models/Group');
// const { Group } = mongoode.models;
const Group = require('../models/Group');

exports.createGroup = (req, res) => {
	const group = new Group({
		name: req.body.name,
		createdAt: new Date(),
		updatedAt: new Date()
	});

	// On enregistre le group dans la base de données
	group
		.save()
		.then(() => res.status(201).json({ message: 'Groupe créé avec succès!' }))
		.catch((error) => res.status(400).json({ error }));
		
		
};
exports.getOnegroup = (req, res) => {
		Group.findOne({ where: { id: req.params.id } })
			.then((group) => res.status(200).json({ group }))
			.catch((error) => res.status(404).json({ error }));
};

exports.getAllgroups = (req, res) => {
	Group.find()
		.then((groups) => res.status(200).json({ groups }))
		.catch((error) => res.status(400).json({ error }));
};

exports.modifygroup = (req, res) => {
	const groupObject = req.file
		? {
			...JSON.parse(req.body.group)
		}
		: { ...req.body };

	Group.findOne({
		where: { id: req.params.id, userId: req.user.id },
		include: db.User,
	}).then((group) => {
		if (!group) {
			res.status(400).json({ error: "Vous n'avez pas l'autorisation" });
		} else {
			group.update(groupObject).then((group) => res.status(200).json({ group }));
		}
	});
};

exports.deletegroup = (req, res) => {
	const where = {
		id: req.params.id,
	};

	if (!req.user.admin) {
		where.userId = req.user.id;
	}

	Group.findOne({ where })
		.then((group) => {
			if (!group) {
				res.status(400).json({ error: "Vous n'avez pas l'autorisation" });
			}
			group
				.destroy()
				.then(() =>
					res.status(200).json({ message: 'Publication supprimée !' })
				)
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error: error.message }));
};