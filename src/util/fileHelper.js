var SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

function formatBytes(bytes, decimals) {
  for (var i = 0, r = bytes, b = 1024; r > b; i++) r /= b;
  return `${parseFloat(r.toFixed(decimals))} ${SIZES[i]}`;
}

module.exports = {
  formatBytes
};
