const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtSchema = new Schema({
    name: String,
    balance: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    monthPaidOff: String,
    monthsremaining: Number,
    totalInterest: Number,
}, {
        timestamps: true
    });

module.exports = mongoose.model('Debt', debtSchema);