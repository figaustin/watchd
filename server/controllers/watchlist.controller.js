const Watchlist = require("../models/watchlist.model");


module.exports.findWatchlistByUserId = (req, res) => {
    Watchlist.findOne({user_id: req.params.user_id})
        .then(oneList => {res.json({watchlist: oneList})})
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};

module.exports.createWatchlistForUser = (req, res) => {
    Watchlist.create({user_id: req.params.user_id})
        .then(newList => res.json({watchlist: newList}))
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};

module.exports.addShowToWatchlist = (req, res) => {
    Watchlist.findOneAndUpdate({user_id: req.params.user_id}, {$push: {shows:{
        show_id : req.body.show_id,
        name : req.body.name,
        rating : req.body.rating,
        notes : req.body.notes,
        status : req.body.status,
    }}}, {new: true})
        .then(updatedList => res.json({watchlist: updatedList}))
        .catch(err => res.json({message: "Something went wrong", error: err}))      
};

