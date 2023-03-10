export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};

// createError(404, "Already user created!")
