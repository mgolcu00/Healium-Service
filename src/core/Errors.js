class BaseError extends Error {
    constructor(name, statusCode, message, description, isOperational) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

class OpenAIError extends BaseError {
    constructor(description, statusCode = 500, isOperational = true) {
        super("OpenAIError", statusCode, description, isOperational);
    }
}

class DatabaseError extends BaseError {
    constructor(description, statusCode = 500, isOperational = true) {
        super("DatabaseError", statusCode, description, isOperational);
    }
}

class ControllerError extends BaseError {
    constructor(description, statusCode = 400, isOperational = true) {
        super("ControllerError", statusCode, description, isOperational);
    }
}

class ValidationError extends BaseError {
    constructor(description, statusCode = 400, isOperational = true) {
        super("ValidationError", statusCode, description, isOperational);
    }
}

module.exports = {
    BaseError,
    OpenAIError,
    DatabaseError,
    ControllerError,
    ValidationError
}
