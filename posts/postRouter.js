const express = require("express");
const posts = require("./postDb.js");
const { validatePostId } = require("../middleware/validatePostId.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
	// do your magic!
	const opts = {
		sortBy: req.query.sortBy,
		limit: req.query.limit
	};

	posts
		.get(opts)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(error => {
			// calling "next" with no parameters moves to the next piece of middleware,
			// calling "next" with a parameter moves to the error middleware.
			next(error);
		});
});

router.get("/:id", validatePostId(), (req, res) => {
	// "req.post" comes from the "validatePostId" middleware
	res.status(200).json(req.post);
});

router.delete("/:id", validatePostId(), (req, res) => {
	posts
		.remove(req.params.id)
		.then(count => {
			if (count > 0) {
				res.status(200).json({
					message: `The post with id ${req.params.id} was deleted.`
				});
			}
		})
		.catch(err => {
			next(err);
		});
});

router.put("/:id", (req, res) => {
	// do your magic!
});

module.exports = router;
