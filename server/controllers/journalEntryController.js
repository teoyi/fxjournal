const JournalEntry = require('../model/JournalsEntry');

const getAllJournalEntries = async (req, res) => {
    const journalEntries = await Journal.find(); 

    if (!journalEntries) return res.status(204).json({ 'message': 'No entries found in the journal'});

    res.json(journalEntries);
};

const createEntry = async (req, res) => { 
    if (!req?.body?.content || !req?.body?.userId) {
        return res.status(400).json({ 'message': 'Content and User ID is required'});
    }

    try {
        const newEntry = await Journal.create({
            userId: req.body.userId,
            content: req.body.content
        });

        res.status(201).json(newEntry);
    } catch (error) {
        console.error(error);
        res.status(400).json({ 'message': 'Either content or userId is empty'});
    };
};

const updateEntry = async (req, res) => {
    if (!req?.body?.id || !req?.body?.userId) {
        return res.status(400).json({ 'message': 'Entry ID and User ID is required'});
    }; 

    const thisEntry = await Journal.findOne({ _id: req.body.id, userId: req.body.userId }); 

    if (!thisEntry) {
        return res.status(204).json({ 'message': `Either User ${req.body.userId} or Entry ${req.bdoy.id} does not exist`})
    };
    
    if (req.body?.content) {
        thisEntry.content = req.body.content
    };

    const result = await thisEntry.save(); 

    res.json(result);
}

const getAllEntriesByUserID = async (req, res) => {
    if (!req?.body?.userId) return res.status(400).json({ 'message': 'User ID is required to get all entries'});

    const result = await Journal.find({ userId: req.body.userId });

    if (!result) {
        return res.status(204).json({ 'message': `User with ID ${req.body.userId} does not have any entries`})
    }

    res.json(result);
};

const getEntryByEntryID = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Entry ID is required'});

    const result = await Journal.findOne({ _id: req.params.id }).exec();

    if (!result) {
        return res.status(204).json({ 'message': `Entry with ID:${req.body.id} not found`})
    };

    res.json(result);
};

const deleteJournalEntry = async (req, res) => {
    if (!req?.body?.id || !req?.body?.userId) return res.status(400).json({ 'message': 'Journal ID and User ID is required'}); // if entry id and or userId is missing

    const journalEntry = await Journal.findOne({ _id: req.body.id, userId: req.body.userId }).exec(); // find an entry that matches both entry id and user id 
    
    const result = await Journal.deleteOne({ _id: req.body.id }); //delete if found successfully 
    res.json(result); // return the deleted post 
};

module.exports = {
    getAllJournalEntries,
    createEntry,
    updateEntry,
    getAllEntriesByUserID,
    getEntryByEntryID,
    deleteJournalEntry
}