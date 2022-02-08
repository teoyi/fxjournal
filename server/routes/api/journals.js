const express = require('express');
const router = express.Router(); 
const journalController = require('../../controllers/journalController')

router.route('/')
    .get(journalController.getAllJournalEntries)
    // .get(journalController.getAllEntriesByUserID)
    .post(journalController.createEntry)
    .put(journalController.updateEntry)
    .delete(journalController.deleteJournalEntry);

router.route('/:id')
    .get(journalController.getEntryByEntryID)
    .put(journalController.updateEntry)
    .delete(journalController.deleteJournalEntry);


module.exports = router