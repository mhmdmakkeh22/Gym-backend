const constants = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    switch(statusCode){
        case constants.BAD_REQUEST:
            res.json({
                title: "Bad Request",
                message: err.message,
                stack: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stack: err.stack
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stack: err.stack
            });
            break;
        default:
            res.json({
                title: "No error",
            });
    }
}

module.exports = errorHandler;
