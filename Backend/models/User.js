const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  company_name: { type: String, required: true },
  role: { type: String, enum: ['vendor', 'admin'], default: 'vendor' },
  category: { type: String, default: 'General' },
  state: { type: String, default: 'Uttar Pradesh' },
  experience: { type: String, default: '' },
  gst_number: { type: String },
  pan_number: { type: String },
  phone: { type: String },
  avg_bid_amount: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
