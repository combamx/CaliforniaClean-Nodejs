const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'californiaclean_super_secret';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token)
        return res.status(403).json({ message: 'Token no proporcionado' });

    jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: 'Token inválido' });

        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
