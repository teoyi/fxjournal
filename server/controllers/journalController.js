const Journal = require('../model/Journals');
const Users = require('../model/Users');

const createJournal = async (req, res) => {
    // get info from body 
    if (!req?.body?.journalName || !req?.body?.username) {
        return res.status(400).json({ 'message' : 'New journal name and Username is required'});
    };

    const journalExist = await Journal.findOne({ journalName: req.body.journalName });
    const userExist = await Users.findOne({ username: req.body.username});

    if (!userExist) { 
        return res.status(404).json({ 'message' : `${req.body.username} does not exist. Please contact administrator.`});
    }

    const userId = userExist._id.toString();

    if (journalExist) {
        return res.status(409).json({ 'message' : `${req.body.journalName} already exists, please choose a different name`})
    } else {
        try { 
            const newJournal = await Journal.create({ 
                userId: userId, 
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
    if (!req?.body?.id || !req?.body?.username || !req?.body?.journalName) {
        return res.status(400).json({ 'message' : 'Journal name, Username, and id of journal is required'});
    };

    const userExist = await Users.findOne({ username: req.body.username});
    if (!userExist) { 
        return res.status(404).json({ 'message' : `${req.body.username} does not exist. Please contact administrator.`});
    }
    const userId = userExist._id.toString();

    const thisJournal = await Journal.findOne({ _id: req.body.id, userId: userId});

    if (!thisJournal) { 
        return res.status(404).json({ 'message' : `Either ${req.body.id} or ${req.body.username} does not exist`});
    }; 
    
    if (req.body.journalName){ 
        thisJournal.journalName = req.body.journalName;
    };

    const result = await thisJournal.save();
    res.json(result);
};

const deleteJournal = async (req, res) => { 
    if (!req?.body?.id || !req?.body?.username) {
        return res.status(400).json({ 'message' : 'Username or id of journal is required'});
    };

    const userExist = await Users.findOne({ username: req.body.username});
    if (!userExist) { 
        return res.status(404).json({ 'message' : `${req.body.username} does not exist. Please contact administrator.`});
    }
    const userId = userExist._id.toString();

    const thisJournal = await Journal.findOne({ _id: req.body.id, userId: userId}).exec();

    if (!thisJournal) { 
        return res.status(404).json({ 'message' : `Journal with ID ${req.body.id} or user with ID ${req.body.username} not found`});
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

module.exports = {
    createJournal,
    updateJournal,
    deleteJournal,
    getAllJournals,
}