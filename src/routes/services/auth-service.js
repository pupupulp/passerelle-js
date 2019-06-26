const express = require('express');

const handler = demand('helpers/handler');
const limiter = demand('middlewares/limiter');
const logger = demand('utils/logger');
const httpLogger = demand('utils/http-logger');
const jwt = demand('utils/jwt');

const router = express.Router();

router.use(httpLogger.console);
router.use(httpLogger.file);

router.post('/access-token', 
	limiter.slowDown,
	limiter.global, 
	async (req, res, next) => {
        const clientId = req.body.clientId;
        const clientSecret = req.body.clientSecret;

        let mockedId = 'admin';
        let mockedSecret = 'admin';

        if (clientId && clientSecret) {
            if (clientId == mockedId && clientSecret == mockedSecret) {
                const token = jwt.sign({}, clientId);

                res.json({
                    success: true,
                    message: 'Authentication successful.',
                    token: token
                });
            } else {
                res.send(403).end();
            }
        } else {
            res.send(400).end();
        }

    });

router.use(async (err, req, res, next) => {
	await handler.error.handleError(err);
	res.status(204).end();
});

module.exports = router;