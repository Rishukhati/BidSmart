const router = require('express').Router();
const User = require('../models/User');
const Tender = require('../models/Tender');
const Bid = require('../models/Bid');
const { protect, adminOnly } = require('../middleware/auth.middleware');

router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const [totalTenders, activeTenders, totalVendors, totalBids] = await Promise.all([
      Tender.countDocuments(),
      Tender.countDocuments({ status: 'Active' }),
      User.countDocuments({ role: 'vendor' }),
      Bid.countDocuments(),
    ]);

    const categoryStats = await Tender.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } }
    ]);

    res.json({ success: true, data: { totalTenders, activeTenders, totalVendors, totalBids, categoryStats } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: 'vendor' }).select('-password');
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
