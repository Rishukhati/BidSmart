const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  state: { type: String },
  estimated_cost: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Closed', 'Awarded'], default: 'Active' },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  documents: [String],
}, { timestamps: true });

module.exports = mongoose.model('Tender', tenderSchema);
