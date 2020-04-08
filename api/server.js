const express = require("express"); // this imports the express framework

const server = express(); // the server is now running express

const blogRouter = require("../blog resources/blogRouter");

const cors = require("cors");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    const query = req.query;
    console.log('query', query);

    res.status(200).json(query);
});

//this makes blogRouter handle endpoints starting with /api/posts
server.use("/api/posts", blogRouter);

module.exports = server.js; //now that the server is set up, this command exports it for use where needed