class ApiError {
  constructor(errorType, error, autoRefresh = false) {
    this.errorType = errorType;

    // Error Code
    this.errorCode = null;
    if (error.response && error.response.status) {
      this.errorCode = `${error.response.status}`;
    }

    // Auto Refresh
    this.autoRefresh = autoRefresh;

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
