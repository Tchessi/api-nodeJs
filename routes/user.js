const express = require('express'); 
const router = express.Router(); 

const userCtrl = require('../controllers/user'); 
const checkEmail = require('../middleware/check-email');
const auth = require('../middleware/auth')
//const checkPassword = require('../middleware/check-password');

router.post('/signup', checkEmail, userCtrl.signup); 
router.post('/login', userCtrl.login);
// router.use('/addgroup/:id', userCtrl.addUserToGroup);
router.put('/:id', auth, userCtrl.updateUser);
router.get('/', auth, userCtrl.getAllUsers);
router.delete('/:id', auth, userCtrl.deleteUser);


module.exports = router;