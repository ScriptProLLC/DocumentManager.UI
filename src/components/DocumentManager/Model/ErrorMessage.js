import React from "react";
import { ApiError } from "../../../api/ApiError";

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
      <p className="mb-3">{apiError.message}</p>
      {apiError.errorCode && (
        <p className="mb-1 small">
          <strong>Error Code: </strong>
          {apiError.errorCode}
        </p>
      )}
      {apiError.correlationId && (
        <p className="mb-1 small">
          <strong>Log Correlation ID: </strong>
          {apiError.correlationId}
        </p>
      )}
    </div>
  );
}
