const { Router } = require("express");
const router = Router();
const upload = require("../middlewares/upload.middleware");
const xlsx = require("xlsx");
const jsonfile = require("jsonfile");
const path = require("path");
const { dataArrayToJson } = require("../helpers/dataArrayToJson");
const { JSON_DIR_NAME } = require("./consts");

// Endpoint to upload an XLSX file
// /api/xlsx/upload
router.post("/xlsx/upload", upload.single("xlsxFile"), (req, res) => {
  const { id, range, sheetName } = req.body;
  const uploadedFile = req.file;


  // const decodedRange = range && xlsx.utils.decode_range(range.toUpperCase());

  if (!uploadedFile) {
    return res.status(400).send("No file uploaded.");
  }

  if (!id) {
    return res.status(500).json({ error: "No id provided." });
  } else if (id.length < 6) {
    return res.status(500).json({ error: "Id has to be at lest 6 characters long." });
  }
  try {
    const workbook = xlsx.read(uploadedFile.buffer, { type: "buffer" });
    const workbookSheetName = sheetName || workbook.SheetNames[0];
    const jsonDataArray = xlsx.utils.sheet_to_json(workbook.Sheets[workbookSheetName], {
      header: 1,
      range
    });

    const jsonData = {
      sheetContent: jsonDataArray
    }

    // Generate a unique filename for the JSON file
    const fileId = Date.now().toString();
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

// Endpoint to access the JSON content of the uploaded XLSX file
// /api/xlsx/jsonContent/:fileId
router.get("/xlsx/jsonContent/:fileId", (req, res) => {
  const { parsed } = req.query
  const fileId = req.params.fileId;
  const jsonFilePath = path.join(__dirname, "jsondata", `${fileId}.json`);

  
  jsonfile.readFile(jsonFilePath, (err, jsonData) => {
    if (err) {
      return res.status(404).send("JSON file not found.");
    }
    
    if (Number(parsed) === 1) {
      return res.status(200).json(dataArrayToJson(jsonData.sheetContent, 5, 'hi'));
    }

    res.status(200).json(jsonData);
  });
});

router.get("/xlsx", (req, res) => {
  const encodedRange = xlsx.utils.decode_range("A1:J10");
  const decodedRange = xlsx.utils.encode_range(encodedRange);

  res.status(200).json({
    route: req.url,
    encodedRange,
    decodedRange,
  });
});

module.exports = { router };

