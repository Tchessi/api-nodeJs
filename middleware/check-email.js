module.exports = (req, res, next) => {
	const validEmail = (email) => {
		let emailRegexp = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
		let isRegexTrue = emailRegexp.test(email);
		isRegexTrue ? next() : res.status(400).json({ message: 'Email non valide' });
	};
	validEmail(req.body.email);
};