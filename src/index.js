require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const bodyParser = require("body-parser");

const routers = require("./routes");
const { dbConnectionPromise } = require("./configs/db");

const app = express();
app.use(bodyParser.json({ limit: "1024mb" }));
app.use(bodyParser.urlencoded({ limit: "1024mb", extended: true }));
routers(app);

Promise.all([dbConnectionPromise]).then(async () => {
    const PORT = process.env.APP_PORT || 6000;
    const server = createServer(app);

    server.listen(PORT, () => {
        console.log("server on  :", PORT);
    });
})
