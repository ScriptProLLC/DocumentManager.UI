export function decodeBase64(base64String) {
  const decodedString = atob(base64String);

  const byteArray = new Uint8Array(decodedString.length);

  for (let i = 0; i < decodedString.length; i++) {
    byteArray[i] = decodedString.charCodeAt(i);
  }

  return byteArray;
}
