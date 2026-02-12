const crypto = require('crypto');
exports.sha256 = (text) => {
  return crypto.createHash('sha256').update(text).digest('hex');
};
