const express = require('express');
const router = express.Router();

const groupsCtrl = require('../controllers/group');

const auth = require('../middleware/auth');

router.post('/', auth, groupsCtrl.createGroup);
router.get('/:id', auth, groupsCtrl.getOneGroup);	
router.get('/', auth, groupsCtrl.getAllGroups);
router.put('/:id', auth, groupsCtrl.updateGroup);
router.delete('/:id', auth, groupsCtrl.deleteGroup);

module.exports = router;