const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const { error } = require("console");

const app = express();
app.use(cors());
const PORT = 4000;
app.get("/test-speed", (req, res) => {
  try {
    exec(`fast --upload --json`, (err, stdout, stderr) => {
      if (err || stderr) {
        return res.status(400).json({ error: err, code: 400 });
      }
      const result = JSON.parse(stdout);
      res.status(200).json({ code: 200, data: result });
    });
  } catch (error) {
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log("Server Running ON port : ", PORT);
});
