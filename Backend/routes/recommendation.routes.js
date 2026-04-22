const router = require('express').Router();
const Tender = require('../models/Tender');
const { protect, vendorOnly } = require('../middleware/auth.middleware');

router.get('/', protect, vendorOnly, async (req, res) => {
  try {
    const vendor = req.user;
    const tenders = await Tender.find({ status: 'Active' });

    const scored = tenders.map(tender => {
      let score = 0;
      const reasons = [];

      // Category match (40 pts)
      if (tender.category === vendor.category) {
        score += 40; reasons.push('Category matches your business profile');
      } else if (tender.category?.toLowerCase().includes(vendor.category?.toLowerCase())) {
        score += 20; reasons.push('Related category to your expertise');
      }

      // State match (25 pts)
      if (tender.state === vendor.state) {
        score += 25; reasons.push('Located in your state');
      }

      // Budget fit (20 pts)
      const avg = vendor.avg_bid_amount || 1000000;
      const diff = Math.abs(tender.estimated_cost - avg) / avg;
      if (diff < 0.2) { score += 20; reasons.push('Budget fits your bidding range'); }
      else if (diff < 0.5) { score += 10; }

      // Deadline comfort (15 pts)
      const daysLeft = Math.floor((new Date(tender.end_date) - new Date()) / (1000*60*60*24));
      if (daysLeft > 30) { score += 15; reasons.push('Plenty of time to prepare a strong bid'); }
      else if (daysLeft >= 15) { score += 8; }

      if (reasons.length === 0) reasons.push('Based on platform activity');
      return { tender, score, reasons };
    });

    const top5 = scored
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    res.json({ success: true, data: { recommendations: top5 } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
