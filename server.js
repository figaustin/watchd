const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser')
    

require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

const AllMyUserRoutes = require("./server/routes/user.routes");
AllMyUserRoutes(app);

const AllMyWatchlistRoutes = require("./server/routes/watchlist.routes");
AllMyWatchlistRoutes(app);

const AllMyShowRoutes = require("./server/routes/show.routes");
AllMyShowRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );