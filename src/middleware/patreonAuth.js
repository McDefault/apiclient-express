const config = require('./../../config');
const Hasher = require('./../modules/Hasher');
const Logger = require('./../modules/Logger');

module.exports = (req, res, next) => {

    try {
        const secret = "aGa_Wt6yfrWosN3Qu8l5vLpc4gjRsi6dhB9lnFUBKrRJAman_OtGTUqQK7vr7y1t";
        const signature = req.headers["x-patreon-signature"];

        const verified = Hasher.HashIsValid(secret, req.body, signature);

        console.log(Buffer.from(signature, "hex"));
        console.log(signature);
        console.log(Hasher.ComputeSimpleHash(secret, req.body));

        if(!verified) {
            console.log("Unauthorized");
            res.status(401);
            res.end();
            return;
        }
        next();

    } catch (e) {
        Logger.error(e);
        console.log("Unauthorized");
        res.status(401);
        res.end();
    }
};