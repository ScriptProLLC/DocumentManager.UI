var SIZES = [
  "B" /*placeholder, < 1KB handled as special case*/,
  "KB",
  "MB",
  "GB",
  "TB",
  "PB",
  "EB",
  "ZB",
  "YB"
];

function formatAttribute(key, attribute) {
  switch (key) {
    case "File Size":
      return formatBytes(attribute);

    // others as the need arises...
    default:
      break;
  }

  return attribute;
}

function formatBytes(strBytes, decimals) {
  let bytes = parseInt(strBytes);
  const oneKB = 1024;

  if (bytes < oneKB) {
    return `1 KB`;
  }

  for (var i = 0, r = bytes, b = oneKB; r > b; i++) r /= b;
  return `${parseFloat(r.toFixed(decimals))} ${SIZES[i]}`;
}

module.exports = {
  formatAttribute
};
