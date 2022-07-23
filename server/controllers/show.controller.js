const Show = require("../models/show.model");

module.exports.findShowById = (req, res) => {
    Show.findOne({_id: req.params.id})
        .then(show => {res.json({show: show})})
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};

module.exports.findAllUserShows = (req, res) => {
    Show.find({user_id: req.params.user_id})
        .then(allShows => res.json({shows: allShows}))
        .catch(err => res.json({message: "Uh oh! Something went wrong!!", error: err}))
}

module.exports.newShow = (req, res) => {
    Show.create(req.body)
        .then(newShow => res.json({newShow: newShow}))
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};

module.exports.updateShow = (req, res) => {
    Show.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedShow => res.json({show: updatedShow}))
        .catch(err => res.json({message: "Something went wrong!", error: err}))
}

module.exports.deleteShow = (req, res) => {
    Show.findOneAndDelete({_id: req.params.id})
        .then(result => res.json({result: result}))
        .catch(err => res.json({message: "Uh oh! Something went wrong!!!!", error: err}))
}