const Journal = require('../model/Journals');

const createJournal = async (req, res) => {
    // get info from body 
    if (!req?.body?.journalName || !req?.body?.userId) {
        return res.status(400).json({ 'message' : 'Journal name and User ID is required'});
    };

    const journalExist = await Journal.findOne({ journalName: req.body.journalName });

    if (journalExist) {
        return res.status(409).json({ 'message' : `${req.body.journalName} already exists, please choose a different name`})
    } else {
        try { 
            const newJournal = await Journal.create({ 
                userId: req.body.userId, 
                journalName: req.body.journalName
            });
    
            // on success
            res.status(201).json(newJournal);
        } catch (error) { 
            console.error(error);
            res.status(400).json({ 'message' : 'Either journal name or User ID is empty'});
        };
    };
};

const updateJournal = async (req, res) => { 
    if (!req?.body?.id || !req?.body?.userId || !req?.body?.journalName) {
        return res.status(400).json({ 'message' : 'Journal name, User ID, and id of journal is required'});
    };

    const thisJournal = await Journal.findOne({ _id: req.body.id, userId: req.body.userId});

    if (!thisJournal) { 
        return res.status(404).json({ 'message' : `Either ${req.body.id} or ${req.body.userId} does not exist`});
    }; 
    
    if (req.body.journalName){ 
        thisJournal.journalName = req.body.journalName;
    };

    const result = await thisJournal.save();
    res.json(result);
};

const deleteJournal = async (req, res) => { 
    if (!req?.body?.id || !req?.body?.userId) {
        return res.status(400).json({ 'message' : 'User ID or id of journal is required'});
    };

    const thisJournal = await Journal.findOne({ _id: req.body.id, userId: req.body.userId}).exec();

    if (!thisJournal) { 
        return res.status(404).json({ 'message' : `Journal with ID ${req.body.id} or user with ID ${req.body.userId} not found`});
    };

    const result = await Journal.deleteOne({ _id: req.body.id })

    res.json(result);
};

const getAllJournals = async (req, res) => {
    const journals = await Journal.find(); 

    if (!journals) {
        return res.status(204).json({ 'message': 'No journals found'})
    }

    res.json(journals);
}











// const getAllJournalEntries = async (req, res) => {
//     const journalEntries = await Journal.find(); 

//     if (!journalEntries) return res.status(204).json({ 'message': 'No entries found in the journal'});

//     res.json(journalEntries);
// };

// const createEntry = async (req, res) => { 
//     if (!req?.body?.content || !req?.body?.userId) {
//         return res.status(400).json({ 'message': 'Content and User ID is required'});
//     }

//     try {
//         const newEntry = await Journal.create({
//             userId: req.body.userId,
//             content: req.body.content
//         });

//         res.status(201).json(newEntry);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ 'message': 'Either content or userId is empty'});
//     };
// };

// const updateEntry = async (req, res) => {
//     if (!req?.body?.id || !req?.body?.userId) {
//         return res.status(400).json({ 'message': 'Entry ID and User ID is required'});
//     }; 

//     const thisEntry = await Journal.findOne({ _id: req.body.id, userId: req.body.userId }); 

//     if (!thisEntry) {
//         return res.status(204).json({ 'message': `Either User ${req.body.userId} or Entry ${req.bdoy.id} does not exist`})
//     };
    
//     if (req.body?.content) {
//         thisEntry.content = req.body.content
//     };

//     const result = await thisEntry.save(); 

//     res.json(result);
// }

// const getAllEntriesByUserID = async (req, res) => {
//     if (!req?.body?.userId) return res.status(400).json({ 'message': 'User ID is required to get all entries'});

//     const result = await Journal.find({ userId: req.body.userId });

//     if (!result) {
//         return res.status(204).json({ 'message': `User with ID ${req.body.userId} does not have any entries`})
//     }

//     res.json(result);
// };

// const getEntryByEntryID = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ 'message': 'Entry ID is required'});

//     const result = await Journal.findOne({ _id: req.params.id }).exec();

//     if (!result) {
//         return res.status(204).json({ 'message': `Entry with ID:${req.body.id} not found`})
//     };

//     res.json(result);
// };

// const deleteJournalEntry = async (req, res) => {
//     if (!req?.body?.id || !req?.body?.userId) return res.status(400).json({ 'message': 'Journal ID and User ID is required'}); // if entry id and or userId is missing

//     const journalEntry = await Journal.findOne({ _id: req.body.id, userId: req.body.userId }).exec(); // find an entry that matches both entry id and user id 
    
//     const result = await Journal.deleteOne({ _id: req.body.id }); //delete if found successfully 
//     res.json(result); // return the deleted post 
// };

module.exports = {
    createJournal,
    updateJournal,
    deleteJournal,
    getAllJournals,
}