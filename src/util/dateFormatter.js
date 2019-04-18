const moment = require("moment");

function formatDate(date) {
  return moment(date, "YYYY-MM-DDTHH:mm:ssZZ").format("MM/DD/YYYY hh:mm a");
}

module.exports = {
  formatDate
};
