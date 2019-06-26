const fs = require('fs');

const privateKey = fs.readFileSync('src/configs/private.key', 'utf8');
const publicKey = fs.readFileSync('src/configs/public.key', 'utf8');  

module.exports = {
    private: privateKey,
    public: publicKey
};