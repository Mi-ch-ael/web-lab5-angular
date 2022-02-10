const express = require("express");
const server = express();
const routes = require("./routes");

const path = require("path");
const http = require('http');
const bodyParser = require("body-parser");

const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

server.use(cors(corsOptions));

server.use("/", routes);

// server.use(express.static(path.join(__dirname, "public")));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

const httpServer = http.createServer(server);
httpServer.listen(4443);

