const express = require('express'); 
const mongoose = require('mongoose'); 

const userRoutes = require('./routes/user'); 
const auth = require('./middleware/auth');
const userCtrl = require('./controllers/user');

require('dotenv').config();


mongoose
	.connect(process.env.SECRET_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); 


app.use((req, res, next) => {
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});

app.use(express.json()); 


app.use('/api/auth', userRoutes); 
app.get('/api/users/:id', auth, userCtrl.getOneUser);
app.get('/api/users', auth, userCtrl.getAllUsers);
app.delete('/api/users/:id', auth, userCtrl.deleteUser);

module.exports = app;