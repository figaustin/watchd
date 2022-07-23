const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    show_id: {type: Number},
    name: {type: String},
    rating: {type: Number, default: 1},
    notes: {type: String, default: ''},
    status: {type: String, default: 'Watching'},
    episodes_watched: {type: Number, default: 0},
    total_episodes: {type: Number, default: 0}

})

module.exports = mongoose.model('Show', ShowSchema);