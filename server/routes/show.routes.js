const ShowController = require('../controllers/show.controller');
const express = require('express')

module.exports = (app) => {
    app.get("/api/watchlist/show/getall/:user_id", ShowController.findAllUserShows);
    app.get("/api/watchlist/show/get/:id", ShowController.findShowById)
    app.post("/api/watchlist/show/create", ShowController.newShow);
    app.put("/api/watchlist/show/update/:id", ShowController.updateShow)
    app.delete("/api/watchlist/show/delete/:id", ShowController.deleteShow)
}