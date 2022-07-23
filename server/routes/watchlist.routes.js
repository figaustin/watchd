const WatchlistController = require('../controllers/watchlist.controller');
const express = require('express');

module.exports = (app) => {
    app.get("/api/users/:user_id/watchlist", WatchlistController.findWatchlistByUserId);
    app.get("/api/shows/edit/:_id", WatchlistController.getShowFromWatchlist)
    app.post("/api/users/:user_id/watchlist/create", WatchlistController.createWatchlistForUser);
    app.put("/api/users/:user_id/watchlist/addshow", WatchlistController.addShowToWatchlist);
    app.put("/api/users/watchlist/updateshow/:id", WatchlistController.updateShowInWatchlist)
    app.delete("/api/users/watchlist/deleteshow/:id", WatchlistController.removeShowFromWatchlist)
}