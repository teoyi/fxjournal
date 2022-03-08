const express = require('express');
const router = express.Router();
const journalEntryController = require('../../controllers/journalEntryController')
// USER CHECK 
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/all')
    .get(verifyRoles(ROLES_LIST.Admin), journalEntryController.getAllJournalEntries)
router.route('/')
    .post(verifyRoles(ROLES_LIST.User), journalEntryController.getAllEntriesByUserAndJournal)
router.route('/getEntry')
    .post(verifyRoles(ROLES_LIST.User), journalEntryController.getEntryByEntry)
router.route('/createJournalEntry')
    .post(verifyRoles(ROLES_LIST.User), journalEntryController.createEntry)
router.route('/updateJournalEntry')
    .put(verifyRoles(ROLES_LIST.User), journalEntryController.updateEntry)
router.route('/deleteJournalEntry')
    .delete(verifyRoles(ROLES_LIST.User), journalEntryController.deleteEntry)

module.exports = router