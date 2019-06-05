// Create a db.json file using mockScanData.js as the source.
// This way json-server has consistent data to serve upon app start.
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockScanData = require("./mockScanData");

const data = JSON.stringify(mockScanData);
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log("Mock Scan DB created.");
});
