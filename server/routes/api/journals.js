const express = require('express');
const router = express.Router(); 
const journalController = require('../../controllers/journalController')
// USER CHECK 
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.User), journalController.getAllJournalEntries)
    // .get(journalController.getAllEntriesByUserID)
    .post(verifyRoles(ROLES_LIST.User), journalController.createEntry)
    .put(verifyRoles(ROLES_LIST.User), journalController.updateEntry)
    .delete(verifyRoles(ROLES_LIST.User), journalController.deleteJournalEntry);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.User), journalController.getEntryByEntryID)
    .put(verifyRoles(ROLES_LIST.User), journalController.updateEntry)
    .delete(verifyRoles(ROLES_LIST.User), journalController.deleteJournalEntry);

module.exports = router