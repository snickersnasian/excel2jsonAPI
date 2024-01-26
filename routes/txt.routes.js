const { Router } = require("express");
const router = Router();
const upload = require("../middlewares/upload.middleware");
const xlsx = require("xlsx");
const jsonfile = require("jsonfile");
const path = require("path");
const { dataArrayToJson } = require("../helpers/dataArrayToJson");
const { JSON_DIR_NAME } = require("./consts");

// Endpoint to upload an TXT file
// /api/txt/upload
router.post("/txt/upload", upload.single("txtFile"), (req, res) => {
  const { id } = req.body;
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).send("No file uploaded.");
  }

  if (!id) {
    return res.status(500).json({ error: "No id provided." });
  } else if (id.length < 6) {
    return res
      .status(500)
      .json({ error: "Id has to be at lest 6 characters long." });
  }
  try {
    const txtFileContent = uploadedFile.buffer.toString();

    const jsonDataArray = txtFileContent.split("\n").map((row) => {
      return row.split("\t");
    });

    const jsonData = {
      sheetContent: jsonDataArray,
    };

    // Generate a unique filename for the JSON file
    const fileId = id || Date.now().toString();
    const jsonFilePath = path.join(__dirname, JSON_DIR_NAME, `${fileId}.json`);

    // Save the JSON data to the file
    jsonfile
      .writeFile(jsonFilePath, jsonData)
      .then(() => {
        const fileName = `${fileId}`;
        res.status(200).json({ fileName });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send("Error saving JSON file.");
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error processing JSON file.");
  }
});

module.exports = { router };
