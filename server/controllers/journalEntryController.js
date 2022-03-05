const JournalEntry = require('../model/JournalsEntry');
const Users = require('../model/Users');
const Journals = require('../model/Journals');

const getAllJournalEntries = async (req, res) => {
    // use journal and user id to find the relevant journal entries
    const journalEntries = await JournalEntries.find();
    if (!journalEntries) {
        return res.status(204).json({ 'message': 'No entries found in the db' });
    }

    res.json(journalEntries);
};

const createEntry = async (req, res) => {
    if (!req?.body?.journalContent || !req?.body?.entryTitle || !req?.body?.username || !req?.body?.journalName) {
        return res.status(400).json({ 'message': 'Journal content, Entry title,  Username, and Journal name is required' });
    }

    // find user and journal within the db 
    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const journalExist = await Journals.findOne({ journalName: req.body.journalName, userId: userId })
    if (!journalExist) {
        return res.status(404).json({ 'message': `${req.body.journalName} does not exist. Please contact administrator.` })
    }
    const journalId = journalExist._id.toString();

    try {
        const newEntry = await JournalEntry.create({
            userId: userId,
            journalId: journalId,
            entryTitle: req.body.entryTitle,
            journalContent: {
                asset: req.body.journalContent.asset,
                positionSize: req.body.journalContent.positionSize,
                side: req.body.journalContent.side,
                risk: req.body.journalContent.risk,
                reward: req.body.journalContent.reward
            }
        });

        res.status(201).json(newEntry);
    } catch (error) {
        console.error(error);
        res.status(400).json({ 'message': 'Either Journal content or userId or journalId is empty' });
    };
};

const updateEntry = async (req, res) => {
    if (!req?.body?.entryTitle || !req?.body?.username || !req?.body?.journalName || !req?.body?.journalContent) {
        return res.status(400).json({ 'message': 'Entry title, Journal content, Username, and Journal name is required' });
    };

    // find user and journal within the db 
    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const journalExist = await Journals.findOne({ journalName: req.body.journalName, userId: userId })
    if (!journalExist) {
        return res.status(404).json({ 'message': `${req.body.journalName} does not exist. Please contact administrator.` })
    }
    const journalId = journalExist._id.toString();

    // find relevant entry with title and ids
    const entryExist = await JournalEntry.findOne({ entryTitle: req.body.entryTitle, journalId: journalId, userId: userId });

    if (!entryExist) {
        return res.status(204).json({ 'message': `Entry does not exist` })
    };

    const thisEntry = entryExist;

    if (req.body?.journalContent) {
        thisEntry.journalContent.asset = req.body.journalContent.asset ? req.body.journalContent.asset : thisEntry.journalContent.asset;
        thisEntry.journalContent.positionSize = req.body.journalContent.positionSize ? req.body.journalContent.positionSize : thisEntry.journalContent.asset;
        thisEntry.journalContent.side = req.body.journalContent.side ? req.body.journalContent.side : thisEntry.journalContent.side;
        thisEntry.journalContent.risk = req.body.journalContent.risk ? req.body.journalContent.risk : thisEntry.journalContent.risk;
        thisEntry.journalContent.reward = req.body.journalContent.reward ? req.body.journalContent.reward : thisEntry.journalContent.reward;
    };

    const result = await thisEntry.save();

    res.json(result);
}

const getAllEntriesByUserAndJournal = async (req, res) => {
    if (!req?.body?.journalName || !req?.body?.username) {
        return res.status(400).json({ 'message': 'Journal name and Username is required' });
    }

    // find user and journal within the db 
    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const journalExist = await Journals.findOne({ journalName: req.body.journalName, userId: userId })
    if (!journalExist) {
        return res.status(404).json({ 'message': `${req.body.journalName} does not exist. Please contact administrator.` })
    }
    const journalId = journalExist._id.toString();

    // use journal and user id to find the relevant journal entries
    const journalEntries = await JournalEntries.find({ journalId: journalId, userId: userId });
    if (!journalEntries) {
        return res.status(204).json({ 'message': 'No entries found in the journal' });
    }

    res.json(journalEntries);
};

const getEntryByParam = async (req, res) => {
    if (!req?.body?.entryTitle || !req?.body?.username || !req?.body?.journalName) {
        return res.status(400).json({ 'message': 'Entry title, Username, and Journal name is required' })
    };

    // find user and journal within the db 
    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const journalExist = await Journals.findOne({ journalName: req.body.journalName, userId: userId })
    if (!journalExist) {
        return res.status(404).json({ 'message': `${req.body.journalName} does not exist. Please contact administrator.` })
    }
    const journalId = journalExist._id.toString();

    // find relevant entry with title and ids
    const result = await JournalEntry.findOne({ entryTitle: req.body.entryTitle, journalId: journalId, userId: userId });

    if (!result) {
        return res.status(204).json({ 'message': `${req.body.entryTitle} not found in this Journal or db` })
    };

    res.json(result);
};

const deleteJournalEntry = async (req, res) => {
    if (!req?.body?.entryTitle || !req?.body?.journalName || !req?.body?.username) {
        return res.status(400).json({ 'message': 'Entry title, Journal Name, and Username is required' })
    }; // if entry id and or userId is missing

    // find user and journal within the db 
    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const journalExist = await Journals.findOne({ journalName: req.body.journalName, userId: userId })
    if (!journalExist) {
        return res.status(404).json({ 'message': `${req.body.journalName} does not exist. Please contact administrator.` })
    }
    const journalId = journalExist._id.toString();

    const journalEntry = await JournalEntry.findOne({ journalId: journalId, userId: userId, entryTitle: req.body.entryTitle }).exec(); // find an entry that matches both entry id and user id 
    const entryId = journalEntry._id.toString();

    const result = await JournalEntry.deleteOne({ _id: entryId }); //delete if found successfully 
    res.json(result); // return the deleted post 
};

module.exports = {
    getAllJournalEntries,
    createEntry,
    updateEntry,
    getAllEntriesByUserAndJournal,
    getEntryByEntryID,
    deleteJournalEntry
}