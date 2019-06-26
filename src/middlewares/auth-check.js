
let jwt = demand('utils/jwt');

const checkAccessToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }    

        jwt.verify(token, (err, decoded) => {
            if (err) {
                return res.send(403).end();
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.send(403).end();
    }
};

module.exports = {
    checkAccessToken
};