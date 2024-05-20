const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const { error } = require("console");
const speedTest = require("speedtest-net");

const app = express();
app.use(cors());
const PORT = 4000;

app.post("/test-speed", (req, res) => {
  try {
    const test = speedTest({ acceptLicense: true, acceptGdpr: true });
    test.on("data", (data) => {
      res.status(200).json({ code: 200, data });
    });
    test.on("error", (err) => {
      res.status(500).json({ error: err.message, code: 500 });
    });
  } catch (error) {
    res.status(500).json({ error: error.message, code: 500 });
  }
});

app.listen(PORT, () => {
  console.log("Server Running ON port : ", PORT);
});
