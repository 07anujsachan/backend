// api/speed.js

const { exec } = require("child_process");

module.exports = (req, res) => {
  exec(`fast --upload --json`, (err, stdout, stderr) => {
    if (err || stderr) {
      return res.status(400).json({ error: err, code: 400 });
    }
    const result = JSON.parse(stdout);
    res.status(200).json({ code: 200, data: result });
  });
};
