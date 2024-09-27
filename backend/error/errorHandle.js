import express from 'express';

const errorHandle = express.Router();

errorHandle.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    // Send the error response
    res.status(statusCode).json({
        status: 'error',
        message: errorMessage,
    });
});

export default errorHandle;
