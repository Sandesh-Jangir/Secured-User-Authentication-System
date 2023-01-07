const jwt = require("jsonwebtoken");

// JWT Secret. [Idealy should not be in public code].
const JWT_SECRET = "secret@$example.";

const authenticateToken = (req, res, next)=>{
    // Fetching token from request header.
    const fetchedToken = req.header('authtoken');
    // If authentication-token not found in the request header.
    if(!fetchedToken){
        return res.status(401).json({success: false, error: "Please enter a valid token.", fetchedToken})
    }

    try {
        // Verifying the fetched auth-token.
        const verifiedToken = jwt.verify(fetchedToken, JWT_SECRET); 
        // Extracting the token payload and the send it to the request.
        req.user = verifiedToken.webTokenUser;
        next(); //Heading on towards the next function.
    } catch (error) { // If it is an unauthorized token.
        res.status(401).json({success: false, error: "Unauthorized Token."})
    }
}

module.exports = authenticateToken;