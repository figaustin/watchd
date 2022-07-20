const express = require('express')
const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.get("/api/users", UserController.getAllUsers);
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.get("/api/users/getloggedinuser", UserController.getLoggedInUser);
    app.get("/api/users/logout", UserController.logout);
    app.get("/api/users/fetchuser")
        
}