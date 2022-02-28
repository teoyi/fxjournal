const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const journalEntrySchema = new Schema({
    userId: {
        type: String, 
        required: true
    },
    journalName: {
        type: String,
        required: true
    },
    journalContent: {
        type: String, 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Journal Entry', journalEntrySchema)