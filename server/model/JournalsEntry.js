const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalEntrySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    journalId: {
        type: String,
        required: true
    },
    entryTitle: {
        type: String,
        required: true
    },
    journalContent: {
        asset: {
            type: String,
            required: true
        },
        positionSize: {
            type: Number,
            required: true
        },
        side: {
            type: String,
            required: true
        },
        risk: {
            type: Number,
            required: true
        },
        reward: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Journal Entry', journalEntrySchema)