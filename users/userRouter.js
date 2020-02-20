const express = require("express");

const router = express.Router();

const userDb = require("./userDb.js");

router.post("/", (req, res) => {
	// do your magic!
});

router.post("/:id/posts", (req, res) => {
	// do your magic!
});

router.get("/", async (req, res) => {
	const users = await userDb.get();
	// console.log("users: ", users);
	if (users) {
		return res.status(200).json(users);
	} else {
		return res.status(500).json({ error: "The users could not be retrieved." });
	}
});

router.get("/:id", (req, res) => {
	// do your magic!
});

router.get("/:id/posts", (req, res) => {
	// do your magic!
});

router.delete("/:id", (req, res) => {
	// do your magic!
});

router.put("/:id", (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
}

function validateUser(req, res, next) {
	// do your magic!
}

function validatePost(req, res, next) {
	// do your magic!
}

module.exports = router;
