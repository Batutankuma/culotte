const { decode, verify, sign } = require ('jsonwebtoken');



class BasicAuth {
    /**
     * 
     * @param {*} secret_key la clé secret pour le token
     * @param {24} expiresIn la durée d'utilisation de token
     */
    constructor(secret_key, expiresIn) {
        this.secret_key = secret_key;
        this.expiresIn = expiresIn;
    }

    //decode jsonWebToken
    DecodeToken(key) {
        const id = decode(key, { json: true });
        return id.data;
    }

    //verify json token
    async VerifyToken(req, res, next) {
        try {
            const token = req.headers.authorization;
            if (token) {
                const decodedToken = verify(token, this.secret_key);
                const userId = decodedToken.userId;
                if (userId) {
                    throw 'Invalid user';
                } else {
                    next();
                }
            } else {
                res.status(401).send('Auth token is not found');
            }
        } catch (e) {
            res.status(401).send('Invalid request!');
        }
    }

    //sign token
    SignToken(data) {
        return sign({ data }, this.signToken, { expiresIn: this.expiresIn });
    }
}

module.exports = BasicAuth;