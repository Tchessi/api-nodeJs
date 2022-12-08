const express = require('express'); 
const router = express.Router(); 

const userCtrl = require('../controllers/user'); 
const checkEmail = require('../middleware/check-email');
const auth = require('../middleware/auth')
//const checkPassword = require('../middleware/check-password');

router.post('/signup', checkEmail, userCtrl.signup); 
router.post('/login', userCtrl.login);
router.put('/edit', auth, userCtrl.editUser);
router.get('/', auth, userCtrl.getAllUsers);
router.delete('/:id', auth, userCtrl.deleteUser);


module.exports = router;