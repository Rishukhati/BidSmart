const router = require('express').Router();
const Tender = require('../models/Tender');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth.middleware');
const { sendEmail, emailTemplates } = require('../utils/email');

// Get all tenders (public)
router.get('/', async (req, res) => {
  try {
    const { category, state, search } = req.query;
    const filter = { status: 'Active' };
    if (category) filter.category = category;
    if (state) filter.state = state;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const tenders = await Tender.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: tenders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single tender
router.get('/:id', async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id).populate('created_by', 'name');
    if (!tender) return res.status(404).json({ success: false, message: 'Tender not found' });
    res.json({ success: true, data: tender });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create tender (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const tender = await Tender.create({ ...req.body, created_by: req.user._id });

    // Notify matching vendors
    const vendors = await User.find({ role: 'vendor', status: 'active', category: tender.category });
    for (const vendor of vendors) {
      await Notification.create({
        user_id: vendor._id,
        message: `New tender matches your profile: ${tender.title}`,
        type: 'new_tender'
      });
      const tmpl = emailTemplates.newTender(vendor.name, tender);
      sendEmail(vendor.email, tmpl.subject, tmpl.html);
    }

    res.status(201).json({ success: true, data: tender });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update tender (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: tender });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
