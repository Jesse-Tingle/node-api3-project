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

router.get("/:id", validateUserId(), (req, res) => {
	res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId(), validatePost(), (req, res) => {
	res.status(200).json(req.post);
});

router.delete("/:id", (req, res) => {
	// do your magic!
});

router.put("/:id", (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId() {
	return (req, res, next) => {
		userDb
			.getById(req.params.id)
			.then(user => {
				if (user) {
					req.user = user;
					next();
				} else {
					res
						.status(404)
						.json({ message: `User with id ${req.params.id} does not exist` });
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

function validateUser(req, res, next) {
	// do your magic!
}

function validatePost() {
	return (req, res, next) => {
		userDb
			.getUserPosts(req.params.id)
			.then(post => {
				if (post) {
					req.post = post;
					console.log("req.post: ", req.post);
					next();
				} else {
					res.status(404).json({ message: "This user does not have a post." });
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

module.exports = router;
