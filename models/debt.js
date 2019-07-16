const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtSchema = new Schema({
    name: {
        type: String,
        default: 'Your debt',
    },
    balance: {
        type: Number,
        required: true,
        default: 10000,
        min: 1,
        max: 10000000,
    },
    user_id: {
        type: String,
        required: true,
    },
    minimumPayment: {
        type: Number,
        default: 100,
        min: 1,
        max: 10000000,
    },
    apr: {
        type: Number,
        default: 10,
        min: 0.01,
        max: 99,
    },
    monthPaidOff: {
        type: String,
        default: 'In the future',
    },
    monthsremaining: {
        type: Number,
    },
    totalInterest: {
        type: Number,
        default: 10000,
    },
}, {
        timestamps: true
});

module.exports = mongoose.model('Debt', debtSchema);