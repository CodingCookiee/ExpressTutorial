import colors from 'colors';

const loggerMiddleware = (req, res, next) => {
  const methodColors = {
    GET: colors.green,
    POST: colors.blue,
    PUT: colors.yellow,
    DELETE: colors.red,
  };
  const color = methodColors[req.method] || colors.white;

  // Log the request protocol, host, and original URL with the appropriate color
  console.log(
    color(
      `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
  );

  // Call the next middleware function in the stack
  next();
};

export default loggerMiddleware;
