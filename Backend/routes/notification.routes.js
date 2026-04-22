const router = require('express').Router();
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.user._id }).sort({ createdAt: -1 });
    const unreadCount = notifications.filter(n => !n.is_read).length;
    res.json({ success: true, data: notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:id/read', protect, async (req, res) => {
  try {
    await Notification.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, { is_read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/read-all', protect, async (req, res) => {
  try {
    await Notification.updateMany({ user_id: req.user._id, is_read: false }, { is_read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
