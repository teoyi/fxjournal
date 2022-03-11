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
router.route('/updateJournalName')
    .put(verifyRoles(ROLES_LIST.User), journalController.updateJournalName)
router.route('/updateJournalStats')
    .put(verifyRoles(ROLES_LIST.User), journalController.updateJournalStats)
router.route('/deleteJournal')
    .delete(verifyRoles(ROLES_LIST.User), journalController.deleteJournal)
router.route('/getName')
    .post(verifyRoles(ROLES_LIST.User), journalController.getJournalNameById)
router.route('/getBalance')
    .post(verifyRoles(ROLES_LIST.User), journalController.getJournalBalance)
router.route('/getBalanceHistory')
    .post(verifyRoles(ROLES_LIST.User), journalController.getJournalBalanceHistory)

module.exports = router