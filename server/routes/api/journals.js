const express = require('express');
const router = express.Router();
const journalController = require('../../controllers/journalController')
// USER CHECK 
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/all')
    .get(verifyRoles(ROLES_LIST.Admin), journalController.getAllJournals)
    .post(verifyRoles(ROLES_LIST.User), journalController.getAllJournalsByParam)
router.route('/createJournal')
    .post(verifyRoles(ROLES_LIST.User), journalController.createJournal)
router.route('/updateJournal')
    .put(verifyRoles(ROLES_LIST.User), journalController.updateJournal)
router.route('/deleteJournal')
    .delete(verifyRoles(ROLES_LIST.User), journalController.deleteJournal)

module.exports = router