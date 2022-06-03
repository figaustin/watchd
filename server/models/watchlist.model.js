const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({

    show_id: {type: Number},
    name: {type: String},
    rating: {type: Number, default: 0},
    notes: {type: String, default: ''},
    status: {type: String, default: 'Watching'},
    episodes_watched: {type: Number, default: 0},
    total_episodes: {type: Number, default: 0}

})

const WatchlistSchema = new mongoose.Schema({

    shows: [ ShowSchema ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    

})

module.exports = mongoose.model('Watchlist', WatchlistSchema);

