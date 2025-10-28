const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    attendance: [{
        date: {
            type: Date,
            default: Date.now
        },
        present: {
            type: Boolean,
            default: true
        },
        checkInTime: {
            type: Date,
            default: Date.now
        },
        checkOutTime: {
            type: Date
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);