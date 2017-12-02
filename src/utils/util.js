const crypto = require('crypto');
const distance = require("leven");

exports.md5 = function (str) {
    return crypto.createHash('md5').update(str).digest('hex');
};

exports.getSimilarity = function (a, b) {
    if (!a || !b || !a.length || !b.length) return 0;
    if (a === b) return 1;
    const d = distance(a.toLowerCase(), b.toLowerCase());
    const longest = Math.max(a.length, b.length);
    return (longest-d)/longest;
};

exports.checkSimilarity = function (a, b, threshold) {
    if (threshold === 1) {
        return a === b;
    }
    return exports.getSimilarity(a, b) >= threshold;
};