function insertParam(key, value) {
  key = encodeURI(key);
  value = encodeURI(value);
  const query = "?" + key + "=" + value;
  if (document.location.href !== document.location.origin + "/" + query) {
    document.location.search = query;
  }
}

function containsCollectionParam(url) {
  return url.includes("?collection=");
}

export function getCollectionFromUrl() {
  // To support local development, inject collection querystring param if one doesn't exist.
  const url = document.location.href;
  if (!containsCollectionParam(url)) {
    insertParam("collection", "d7a2add9-14bf-480e-9b97-96685a006431");
  }

  return url.split("=")[1];
}
