require("dotenv").config();
const express = require("express");
const { router: xlsxRouter } = require("./routes/xlsx.routes");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", xlsxRouter);

// app.get("*", (req, res) => {
// 	res.status(200).json({
// 		route: req.url,
// 		api: "Excel2JSON",
// 		available: true,
// 	});
// });

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});
