const jwt = require('jsonwebtoken');
const secret = demand('configs/secret');

module.exports = {
    sign: (payload) => {
        let options = {
            issuer:  'PasserelleJS',
            subject:  'API Access',
            audience:  'API Client',
            expiresIn:  '1d',
            algorithm:  'RS256'    
        };

        return jwt.sign(payload, secret.private, options);
    },
    
    verify: (token, callback) => {
        let options = {
            issuer:  'PasserelleJS',
            subject:  'API Access',
            audience:  'API Client',
            expiresIn:  "1d",
            algorithm:  ["RS256"]
        };

        try {
            return jwt.verify(token, secret.public, options, callback);
        } catch (err) {
            return false;
        }
    },

    decode: (token) => {
       return jwt.decode(token, { complete: true });
    }
};