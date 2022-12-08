const express = require('express');
const router = express.Router();

const groupsCtrl = require('../controllers/group');

const auth = require('../middleware/auth');

router.post('/', auth, groupsCtrl.createGroup);
router.get('/:id', auth, groupsCtrl.getOnegroup);
router.get('allgroups/', auth, groupsCtrl.getAllgroups);
router.put('/:id', auth, groupsCtrl.modifygroup);
router.delete('/:id', auth, groupsCtrl.deletegroup);


module.exports = router;