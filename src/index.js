require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const path = require('path');
const bodyParser = require("body-parser");

const routers = require("./routes");
const { dbConnectionPromise } = require("./configs/db");
const { Logger } = require('./helper');
const { ResponseMessage } = require('./constants');

const app = express();
app.use(bodyParser.json({ limit: "1024mb" }));
app.use(bodyParser.urlencoded({ limit: "1024mb", extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error-handling middleware for logging errors
app.use((err, req, res, next) => {
    console.log(err)
    Logger.error(`Error: ${err.message}`);
    res.status(500).send(ResponseMessage.TRY_AGAIN_LATER);
});

routers(app);

Promise.all([dbConnectionPromise]).then(async () => {
    const PORT = process.env.APP_PORT || 6000;
    const server = createServer(app);

    server.listen(PORT, () => {
        console.log("server on  :", PORT);
    });
})
