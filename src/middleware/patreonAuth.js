const config = require('./../../config');
const Hasher = require('./../modules/Hasher');
const Logger = require('./../modules/Logger');

module.exports = (req, res, next) => {

    // try {
        const secret = config.token;
        const signature = req.headers["x-patreon-signature"];
        const payload = req.body;

        const Hash = Hasher.ComputeSimpleHash(secret, payload);

        console.log(signature);
        console.log(Hash);

        const verified = (signature === Hash);

        if(!verified) {
            console.log("Unauthorized");
            // res.status(401);
            // res.end();
            // return;
        }

        next();

    // } catch (e) {
    //     console.error(e);
    //     console.log("Unauthorized by error");
    //     res.status(401);
    //     res.end();
    // }
};