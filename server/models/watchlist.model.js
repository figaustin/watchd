const mongoose = require('mongoose');



const WatchlistSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    

})

module.exports = mongoose.model('Watchlist', WatchlistSchema);


