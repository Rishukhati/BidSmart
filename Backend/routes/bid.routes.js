const router = require('express').Router();
const Bid = require('../models/Bid');
const Tender = require('../models/Tender');
const Notification = require('../models/Notification');
const { protect, adminOnly, vendorOnly } = require('../middleware/auth.middleware');
const { sendEmail, emailTemplates } = require('../utils/email');

// Submit bid (vendor only)
router.post('/', protect, vendorOnly, async (req, res) => {
  try {
    const { tender_id, quoted_amount } = req.body;

    const tender = await Tender.findById(tender_id);
    if (!tender) return res.status(404).json({ success: false, message: 'Tender not found' });
    if (tender.status !== 'Active') return res.status(400).json({ success: false, message: 'Tender is no longer active' });
    if (new Date() > new Date(tender.end_date)) return res.status(400).json({ success: false, message: 'Tender deadline has passed' });
    
    const existing = await Bid.findOne({ tender_id, user_id: req.user._id });
    if (existing) return res.status(400).json({ success: false, message: 'You have already bid on this tender' });

    const bid = await Bid.create({ tender_id, user_id: req.user._id, quoted_amount });

    // Email confirmation
    const tmpl = emailTemplates.bidConfirm(req.user.name, bid, tender);
    sendEmail(req.user.email, tmpl.subject, tmpl.html);

    // In-app notification
    await Notification.create({
      user_id: req.user._id,
      message: `Your bid of ₹${quoted_amount.toLocaleString('en-IN')} on "${tender.title}" was submitted`,
      type: 'bid_update'
    });

    res.status(201).json({ success: true, data: bid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get my bids (vendor)
router.get('/my', protect, async (req, res) => {
  try {
    const bids = await Bid.find({ user_id: req.user._id })
      .populate('tender_id', 'title category end_date status')
      .sort({ submitted_at: -1 });
    res.json({ success: true, data: bids });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Withdraw bid
router.put('/:id/withdraw', protect, vendorOnly, async (req, res) => {
  try {
    const bid = await Bid.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!bid) return res.status(404).json({ success: false, message: 'Bid not found' });
    if (bid.status !== 'Pending') return res.status(400).json({ success: false, message: 'Only pending bids can be withdrawn' });
    bid.status = 'Withdrawn';
    await bid.save();
    res.json({ success: true, data: bid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get bids for a tender (admin)
router.get('/tender/:tender_id', protect, adminOnly, async (req, res) => {
  try {
    const bids = await Bid.find({ tender_id: req.params.tender_id })
      .populate('user_id', 'name company_name category state gst_number')
      .sort({ quoted_amount: 1 });
    res.json({ success: true, data: bids });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Accept or reject bid (admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const bid = await Bid.findById(req.params.id).populate('user_id').populate('tender_id');
    if (!bid) return res.status(404).json({ success: false, message: 'Bid not found' });

    bid.status = status;
    await bid.save();

    if (status === 'Accepted') {
      // Award tender and reject all other bids
      await Tender.findByIdAndUpdate(bid.tender_id._id, { status: 'Awarded' });
      const otherBids = await Bid.find({ tender_id: bid.tender_id._id, _id: { $ne: bid._id } });
      for (const other of otherBids) {
        other.status = 'Rejected';
        await other.save();
        // Notify rejected vendors
        await Notification.create({ user_id: other.user_id, message: `Your bid on "${bid.tender_id.title}" was not selected`, type: 'bid_update' });
      }
      // Notify winner
      await Notification.create({ user_id: bid.user_id._id, message: `🏆 Your bid on "${bid.tender_id.title}" was ACCEPTED!`, type: 'bid_update' });
      const winTmpl = emailTemplates.bidAccepted(bid.user_id.name, bid.tender_id);
      sendEmail(bid.user_id.email, winTmpl.subject, winTmpl.html);
    }

    if (status === 'Rejected') {
      await Notification.create({ user_id: bid.user_id._id, message: `Your bid on "${bid.tender_id.title}" was not selected`, type: 'bid_update' });
      const rejTmpl = emailTemplates.bidRejected(bid.user_id.name, bid.tender_id);
      sendEmail(bid.user_id.email, rejTmpl.subject, rejTmpl.html);
    }

    res.json({ success: true, data: bid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
