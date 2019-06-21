class ApiError extends Error {
  constructor(message, error) {
    super(createApiErrorMessage(message, error));

    function createApiErrorMessage(message, error) {
      let details = "";

      // Error Code
      if (error.response && error.response.status) {
        details += `Error Code: ${error.response.status}`;
      }

      // Correlation ID
      if (
        error.response &&
        error.response.headers &&
        error.response.headers["x-correlation-id"]
      ) {
        details += `; Log Correlation ID: ${
          error.response.headers["x-correlation-id"]
        }`;
      }

      return message + " " + parenthesizeIfNotEmpty(details);
    }

    function parenthesizeIfNotEmpty(s) {
      return s === "" ? "" : `(${s})`;
    }
  }
}

export { ApiError };
