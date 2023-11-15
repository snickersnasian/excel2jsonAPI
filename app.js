require("dotenv").config();
const express = require("express");
const { router: xlsxRouter } = require("./routes/xlsx.routes");

const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.use('/api', xlsxRouter)

app.get('*', (req, res) => {
  res.status(200).json({
    route: req.url,
    api: 'Excel2JSON',
    available: true,
  });
})

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
