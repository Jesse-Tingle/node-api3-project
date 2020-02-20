// const express = require("express");
// const posts = require("./postDb.js");
// const { validatePostId } = require("../middleware/post/validatePostId.js");
// const { validatePost } = require("../middleware/post/validatePost.js");

// const router = express.Router();

// router.get("/", (req, res, next) => {
// 	const opts = {
// 		sortBy: req.query.sortBy,
// 		limit: req.query.limit
// 	};

// 	posts
// 		.get(opts)
// 		.then(post => {
// 			res.status(200).json(post);
// 		})
// 		.catch(error => {
// 			next(error);
// 		});
// });

// router.get("/:id", validatePostId(), (req, res) => {
// 	// "req.post" comes from the "validatePostId" middleware
// 	res.status(200).json(req.post);
// });

// router.post("/", validatePost(), async (req, res) => {
// 	try {
// 		const { text } = req.body;

// 		console.log("text: ", text);
// 		const post = await posts.insert({ text });
// 		console.log("post: ", post);
// 		res.status(201).json();
// 	} catch (error) {
// 		res.status(500).json({
// 			error,
// 			errorMessage: "There was an error while saving the post to the database"
// 		});
// 	}
// });

// router.delete("/:id", validatePostId(), (req, res) => {
// 	posts
// 		.remove(req.params.id)
// 		.then(count => {
// 			if (count > 0) {
// 				res.status(200).json({
// 					message: `The post with id ${req.params.id} was deleted.`
// 				});
// 			}
// 		})
// 		.catch(err => {
// 			next(err);
// 		});
// });

// router.put("/:id", (req, res) => {
// 	// do your magic!
// });

// module.exports = router;
