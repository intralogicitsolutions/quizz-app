const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlacklistedTokenSchema  = new Schema({
    token: {
        type: String,
        required: true
    },
    expiration: {
        type: Date,
        required: true
    }
});

// BlacklistedTokenSchema.index({ expiration: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('BlacklistedToken', BlacklistedTokenSchema);
