
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const voteSchema = new Schema({
    anime: {
        type: 'string',
        required: true
    },
    points: {
        type: 'string',
        required: true
    }
});

const Vote = mongoose.model('Vote' , voteSchema);

module.exports = Vote;