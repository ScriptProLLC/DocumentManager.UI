const moment = require("moment");

function formatDate(date) {
  return moment(date, "YYYY-MM-DDTHH:mm:ssZZ").format("MM/DD/YYYY hh:mm a");
}

function parseDateNoInvalid(stringDate) {
  var dt = new Date(stringDate);

  return isNaN(dt.getTime()) ? 0 : dt.getTime();
}

function byDateDescending(doc1, doc2) {
  return (
    parseDateNoInvalid(doc2.dateCreated) - parseDateNoInvalid(doc1.dateCreated)
  );
}

module.exports = {
  formatDate,
  byDateDescending
};
