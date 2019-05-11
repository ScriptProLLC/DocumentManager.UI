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
