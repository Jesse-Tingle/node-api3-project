// libraries
const express = require("express");
const helmet = require("helmet");

// file imports
const userRoutes = require("./users/userRouter");
const postRoutes = require("./posts/postRouter");

// global objects
const server = express();

// middleware
// server.use(logger)
server.use(helmet());
server.use(express.json());

server.use("/api/user", userRoutes);
server.use("/api/post", postRoutes);

server.get("/", (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
