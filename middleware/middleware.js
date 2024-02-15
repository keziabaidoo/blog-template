function loggerMiddleware(req, res, next) {
    console.log(`${new Date()} === request[${req.method}] [${req.url}]`);
    next();
}

module.exports = loggerMiddleware;