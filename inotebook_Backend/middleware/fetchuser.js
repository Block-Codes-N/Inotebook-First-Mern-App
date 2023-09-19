var jwt = require('jsonwebtoken');
const JWT_SECRET = "Noman is a good boy";  // Secret key for JWT

// Middleware function to fetch user details from a JWT token
const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add it to the req object

  const token = req.header('auth-token');  // Retrieve the JWT token from the request header

  if (!token) {
    // If no token is provided, send a 401 Unauthorized response with an error message
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }

  try {
    // Verify the JWT token using the provided secret key
    const data = jwt.verify(token, JWT_SECRET);

    // Extract the user information from the token's payload and add it to req.user
    req.user = data.user;

    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // Handle any errors that occur during token verification
    console.error(error.message);

    // Send a 401 Unauthorized response with an error message
    res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
};

module.exports = fetchuser;  // Export the fetchuser middleware for use in other parts of the application
