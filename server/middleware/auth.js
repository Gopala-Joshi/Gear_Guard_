const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Header se token nikalna
    const token = req.header('x-auth-token');

    // 2. Agar token nahi hai toh access denied
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
               const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next(); 
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};