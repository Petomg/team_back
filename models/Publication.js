const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    author: Number,

    participants: {
        type: Array,
        of: Number
    },
    
}, {
    timestamps: true
});


const PublicationModel = mongoose.model('Publication' ,PublicationSchema);

module.exports = PublicationModel;