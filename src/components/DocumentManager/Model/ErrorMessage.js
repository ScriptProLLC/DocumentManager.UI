import React from "react";
import { ApiError } from "../../../api/ApiError";
import ApiErrorTypes from "../../../api/ApiErrorTypes";

export function formatErrorMessage(error) {
  if (error && error instanceof ApiError) {
    return formatApiErrorMessage(error);
  } else {
    return "An unknown error occurred.";
  }
}

function formatApiErrorMessage(apiError) {
  return (
    <div>
      <p className="font-weight-bold mb-3 text-danger">
        {apiError.errorType.message}
      </p>
      <p className="mb-3 small">{apiError.errorType.instructions}</p>
      {apiError.errorCode && (
        <p className="mb-1 small text-muted">
          <strong>Error Code: </strong>
          {apiError.errorCode}
        </p>
      )}
      {apiError.correlationId && (
        <p className="mb-1 small text-muted">
          <strong>Log Correlation ID: </strong>
          {apiError.correlationId}
        </p>
      )}
    </div>
  );
}
