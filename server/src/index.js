const express = require("express");
const mongoose = require("mongoose");
const MessageModel = require("./MessageModel");

(async () => {
	const app = express();
	const port = process.env.PORT || 5000;

	console.log("Connecting to MongoDB");
	await mongoose.connect("mongodb://mongodb:27017/tom", {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	console.log("Connected");

	app.get("/", (req, res) => {
		console.log("Got a request");
		res.json({ message: "Hey, I'm Tom, the API" });
	});

	app.post("/", async (req, res) => {
		console.log("Got a post");
		const message = new MessageModel({ sentence: "Hey I'm a new post!" });
		const result = await message.save();
		res.json({ message: "Hey, I saved a post", result });
	});

	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
})();
