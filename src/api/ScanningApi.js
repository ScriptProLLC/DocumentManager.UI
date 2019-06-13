import axios from "axios";

const scan = async () => {
  return await axios
    .get(process.env.REACT_APP_API_SCANNER_URL)
    .then(res => res.data);
};

export { scan };
