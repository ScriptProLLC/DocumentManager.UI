import axios from "axios";
import { ApiError } from "./ApiError";

const scan = async () => {
  return await axios
    .get(process.env.REACT_APP_API_SCANNER_URL)
    .then(res => res.data)
    .catch(error => {
      throw new ApiError("Error scanning document.", error);
    });
};

export { scan };
