const express = require("express");

const router = express.Router();

const userDb = require("./userDb.js");
const postDb = require("../posts/postDb.js");

// posts a new user
router.post("/", validateUser(), async (req, res) => {
	try {
		const { name } = req.body;
		console.log("name: ", name);
		res.status(201).json(await userDb.insert({ name }));
	} catch (error) {
		res.status(500).json({
			error,
			errorMessage: "There was an error while saving the post to the database"
		});
	}
});

// posts a new posts to a specific user
router.post(
	"/:id/posts",
	validateUserId(),
	validatePostContent(),
	async (req, res) => {
		try {
			const post = req.body;
			console.log("post: ", post);
			res.status(201).json(await postDb.insert(post));
		} catch (error) {
			res.status(500).json({
				error,
				errorMessage: "There was an error while saving the post to the database"
			});
		}
	}
);

// gets a list of all users
router.get("/", async (req, res) => {
	const users = await userDb.get();
	// console.log("users: ", users);
	if (users) {
		return res.status(200).json(users);
	} else {
		return res.status(500).json({ error: "The users could not be retrieved." });
	}
});

// gets user by ID
router.get("/:id", validateUserId(), (req, res) => {
	res.status(200).json(req.user);
});

// gets list of posts by user with that ID
router.get("/:id/posts", validateUserId(), validatePost(), (req, res) => {
	res.status(200).json(req.post);
});

// deletes user with this ID
router.delete("/:id", (req, res) => {
	// do your magic!
});

// updates user with this ID
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

// validates the body on a request to create a new user
function validateUser() {
	return (req, res, next) => {
		// const { name } = req.body;
		if (!req.body.name) {
			return res.status(400).json({ message: "missing required name field." });
		}
		next();
	};
}

// checks if the user has any listed posts
function validatePost() {
	return (req, res, next) => {
		userDb
			.getUserPosts(req.params.id)
			.then(post => {
				if (post.length < 1) {
					res.status(404).json({ message: "This user does not have a post." });
				} else {
					req.post = post;
					next();
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

function validatePostContent() {
	return (req, res, next) => {
		const { text } = req.body;
		if (!text) {
			return res.status(400).json({ message: "missing required text field." });
		}
		next();
	};
}

module.exports = router;
