const dotenv = require('dotenv');
dotenv.config()
const Server = require("./models/Server");

const server = new Server
server.listen()