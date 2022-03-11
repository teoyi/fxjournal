const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    journalName: {
        type: String,
        required: true
    },
    accountStatistics: {
        startingAmount: {
            type: Number,
            required: true
        },
        currentBalance: {
            type: Number,
        },
        balanceHistory: {
            type: [Number]
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Journal', journalSchema)