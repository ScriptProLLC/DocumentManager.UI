import axios from "axios";
import { ApiError } from "./ApiError";
import ApiErrorTypes from "./ApiErrorTypes";

const scan = async () => {
  return await axios
    .get(process.env.REACT_APP_API_SCANNER_URL)
    .then(res => res.data)
    .catch(error => {
      throw new ApiError(ApiErrorTypes.Scan_Document, error);
    });
};

export { scan };
