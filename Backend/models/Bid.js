const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  tender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quoted_amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending','Accepted','Rejected','Withdrawn'], default: 'Pending' },
  documents: [String],
  submitted_at: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Bid', bidSchema);
