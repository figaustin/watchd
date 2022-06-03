const WatchlistController = require('../controllers/watchlist.controller');
const express = require('express');

module.exports = (app) => {
    app.get("/api/users/:user_id/watchlist", WatchlistController.findWatchlistByUserId);
    app.post("/api/users/:user_id/watchlist/create", WatchlistController.createWatchlistForUser);
    app.put("/api/users/:user_id/watchlist/addshow", WatchlistController.addShowToWatchlist);
}