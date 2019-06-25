class ApiError {
  constructor(message, error) {
    this.message = message;

    // Error Code
    this.errorCode = null;
    if (error.response && error.response.status) {
      this.errorCode = `${error.response.status}`;
    }

    // Correlation ID
    this.correlationId = null;
    if (
      error.response &&
      error.response.headers &&
      error.response.headers["x-correlation-id"]
    ) {
      this.correlationId = `${error.response.headers["x-correlation-id"]}`;
    }
  }
}

export { ApiError };
