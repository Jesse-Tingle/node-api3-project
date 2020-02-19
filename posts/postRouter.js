const express = require("express");
const posts = require("./postDb.js");
const { validatePostId } = require("../middleware/validatePostId.js");

const router = express.Router();

router.get("/", (req, res) => {
	// do your magic!
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
