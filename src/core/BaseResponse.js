/*
 * Created on Sat May 20 2023
 *
 * Copyright (c) 2023 Mert Gölcü
 */

/**
 * This function generates a standardized JSON response format for the API.
 * 
 * @param {Object} data The main response object which contains the necessary response data. Default is an empty object.
 * @param {String} message A short message about the response. Typically, this is a success message. Default is an empty string.
 * @param {Number} code The status code of the response. This is typically a numeric value signifying the success (0) or failure (non-zero) of the operation. Default is 0.
 * @param {String} error A detailed error message in case there was an issue with the operation. Default is an empty string.
 *
 * @returns {Object} Returns an object with the structured format for the API response.
 * 
 * @example
 * // A successful operation
 * const response = createResponse({user: {id: 1, name: 'John Doe'}}, 'User data fetched successfully', 0);
 * // This will result in:
 * // {
 * //   data: { user: { id: 1, name: 'John Doe' } },
 * //   result: { code: 0, message: 'User data fetched successfully', error: '' }
 * // }
 *
 * @example
 * // An operation with error
 * const response = createResponse({}, 'Error while fetching user data', 1, 'Database connection failed');
 * // This will result in:
 * // {
 * //   data: {},
 * //   result: { code: 1, message: 'Error while fetching user data', error: 'Database connection failed' }
 * // }
 */



const createResponse = (data = {}, message = "", code = 0, error = null) => {
  return createResponseNew(error, data, message,code);
}

const {BaseError} = require("./Errors");
const createResponseNew = (error = null, data = {}, message = "",code =200) => {
  if (error instanceof BaseError) {
    return {
      data: {},
      result: {
        code: error.statusCode,
        message: error.message,
        error: error.toString(),
        type: error.name,
        isOperational: error.isOperational
      }
    };
  } else {
    return {
      data: data,
      result: {
        code: code,
        message: message,
        error: ""
      }
    };
  }
};

const unauthorizedResponse = (data = {}, message = "", code = 0, error = "") => {
  return createResponse(data, "Access Denied", 401, error);
}

module.exports = {
  createResponse,
  unauthorizedResponse
}
