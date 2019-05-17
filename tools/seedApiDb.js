const mockData = require("./mockData");
const axios = require("axios");

var serverURL = "http://localhost:13005/api/docmanager";

const seedApi = async () => {
  await sleep(30000);
  await axios.post(serverURL + "/documents", mockData.documents[0]);
  await axios.post(serverURL + "/documents", mockData.documents[1]);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

seedApi();
