import axios from "axios";

const scan = async () => {
  console.log("scanning file at " + process.env.REACT_APP_API_SCANNER_URL);
  return await axios
    .get(process.env.REACT_APP_API_SCANNER_URL)
    .then(res => res.data);
};

export { scan };
