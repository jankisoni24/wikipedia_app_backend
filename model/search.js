const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    query: {
        required: true,
        type: String
    },
    created_at: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Search', dataSchema)