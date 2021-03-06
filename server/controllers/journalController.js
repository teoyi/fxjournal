const Journal = require('../model/Journals');
const Users = require('../model/Users');

const createJournal = async (req, res) => {
    // get info from body 
    if (!req?.body?.journalName || !req?.body?.username || !req?.body?.startingAmount) {
        return res.status(400).json({ 'message': 'New journal name, Username, and Starting Amount is required' });
    };

    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const journalExist = await Journal.findOne({ journalName: req.body.journalName, userId: userId });

    if (journalExist) {
        return res.status(409).json({ 'message': `${req.body.journalName} already exists, please choose a different name` })
    } else {
        try {
            const newJournal = await Journal.create({
                userId: userId,
                journalName: req.body.journalName,
                accountStatistics: {
                    startingAmount: req.body.startingAmount,
                    currentBalance: req.body.startingAmount,
                    balanceHistory: [req.body.startingAmount]
                }
            });

            // on success
            res.status(201).json(newJournal);
        } catch (error) {
            console.error(error);
            res.status(400).json({ 'message': 'Either journal name or User ID is empty' });
        };
    };
};

const updateJournalName = async (req, res) => {
    if (!req?.body?.id || !req?.body?.username || !req?.body?.journalName) {
        return res.status(400).json({ 'message': 'Journal name, Username, and id of journal is required' });
    };

    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const thisJournal = await Journal.findOne({ _id: req.body.id, userId: userId });

    if (!thisJournal) {
        return res.status(404).json({ 'message': `Either ${req.body.id} or ${req.body.username} does not exist` });
    };

    if (req.body.journalName) {
        thisJournal.journalName = req.body.journalName;
    };

    const result = await thisJournal.save();
    res.json(result);
};

const updateJournalStats = async (req, res) => {
    if (!req?.body?.id || !req?.body?.username || !req?.body?.newBalance) {
        return res.status(400).json({ 'message': 'Journal Id, Username, and the new balance of the journal is required' })
    };

    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    };
    const userId = userExist._id.toString();

    const thisJournal = await Journal.findOne({ _id: req.body.id, userId: userId });
    if (!thisJournal) {
        return res.status(404).json({ 'message': `Either ${req.body.id} or ${req.body.username} does not exist` });
    };

    if (req.body.newBalance) {
        thisJournal.accountStatistics.currentBalance = req.body.newBalance;
        thisJournal.accountStatistics.balanceHistory.push(req.body.newBalance);
    }

    const result = await thisJournal.save();
    res.json(result);
}

const deleteJournal = async (req, res) => {
    if (!req?.body?.id || !req?.body?.username) {
        return res.status(400).json({ 'message': 'Username or id of journal is required' });
    };

    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const thisJournal = await Journal.findOne({ _id: req.body.id, userId: userId }).exec();

    if (!thisJournal) {
        return res.status(404).json({ 'message': `Journal with ID ${req.body.id} or user with ID ${req.body.username} not found` });
    };

    const result = await Journal.deleteOne({ _id: req.body.id })
    res.json(result);
};

const getAllJournals = async (req, res) => {
    const journals = await Journal.find();

    if (!journals) {
        return res.status(204).json({ 'message': 'No journals found' })
    }

    res.json(journals);
}

const getAllJournalsByParam = async (req, res) => {
    if (!req?.body?.username) {
        return res.status(400).json({ 'message': 'Username is required' });
    };

    const userExist = await Users.findOne({ username: req.body.username });
    if (!userExist) {
        return res.status(404).json({ 'message': `${req.body.username} does not exist. Please contact administrator.` });
    }
    const userId = userExist._id.toString();

    const journals = await Journal.find({ userId: userId });
    if (!journals) {
        return res.status(204).json({ 'message': 'No journal found' });
    };

    res.json(journals);
}

const getJournalNameById = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Journal ID is required' });
    };

    const journalExist = await Journal.findOne({ _id: req.body.id });
    if (!journalExist) {
        return res.status(404).json({ 'message': 'Journal does not exist. Please contact administrator' });
    }

    res.json(journalExist.journalName);
}

const getJournalBalance = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Journal ID is required' })
    };

    const journalExist = await Journal.findOne({ _id: req.body.id });
    if (!journalExist) {
        return res.status(404).json({ 'message': 'Journal does not exist. Please contact administrator' });
    }

    res.json(journalExist.accountStatistics.currentBalance);
}

const getJournalBalanceHistory = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'Journal ID is required' })
    };

    const journalExist = await Journal.findOne({ _id: req.body.id });
    if (!journalExist) {
        return res.status(404).json({ 'message': 'Journal does not exist. Please contact administrator' });
    }

    res.json(journalExist.accountStatistics.balanceHistory);
}

module.exports = {
    createJournal,
    updateJournalName,
    updateJournalStats,
    deleteJournal,
    getAllJournals,
    getAllJournalsByParam,
    getJournalNameById,
    getJournalBalance,
    getJournalBalanceHistory,
}