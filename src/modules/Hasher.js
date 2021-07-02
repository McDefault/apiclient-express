const crypto = require('crypto');

/**
 * @return {Buffer}
 */
exports.ComputeHash = function (secret, payload)
{
    const hmac = crypto.createHmac('md5', secret);
    const str = JSON.stringify(payload);
    hmac.write(str);
    hmac.end();
    return hmac.read();

};

/**
 * @return {boolean}
 */
exports.HashIsValid = function (secret, payload, signature)
{
    return crypto.timingSafeEqual(Buffer.from(signature, "hex"), exports.ComputeHash(secret,payload));
};

/**
 * @return {string}
 */
exports.ComputeSimpleHash = function (secret, payload)
{

    // string to be hashed
    const str = JSON.stringify(payload);

    // create a md5 hasher
    const md5Hasher = crypto.createHmac("md5", secret);

    // hash the string
    // and set the output format
    const hash = md5Hasher.update(str).digest("hex");

    return(hash);
};