export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const formattedDate = date.toLocaleString([], {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

  const formattedTime = date.toLocaleString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  return formattedDate + " " + formattedTime;
}

function parseDateNoInvalid(stringDate) {
  var dt = new Date(stringDate);

  return isNaN(dt.getTime()) ? 0 : dt.getTime();
}

export function byDateDescending(doc1, doc2) {
  return (
    parseDateNoInvalid(doc2.dateCreated) - parseDateNoInvalid(doc1.dateCreated)
  );
}
