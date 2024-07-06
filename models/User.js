const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  confirmed: { type: Boolean, default: false },
  location: { type: String, required: true },
  confirmToken: { type: String, default: () => crypto.randomBytes(20).toString('hex') },
});

module.exports = mongoose.model('User', userSchema);