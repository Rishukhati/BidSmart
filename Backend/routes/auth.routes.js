const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth.middleware');
const { sendEmail, emailTemplates } = require('../utils/email');
const crypto = require('crypto');

const resetCodes = new Map();
// Map structure: email -> { code, expiresAt }

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, company_name, role, category, state, gst_number, pan_number, phone } = req.body;
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });

    const user = await User.create({ name, email, password, company_name, role: role || 'vendor', category, state, gst_number, pan_number, phone });
    
    // Send welcome email (don't await - fire and forget)
    const tmpl = emailTemplates.welcome(name);
    sendEmail(email, tmpl.subject, tmpl.html);

    const token = generateToken(user._id);
    res.status(201).json({ success: true, data: { token, user: { _id: user._id, name, email, role: user.role, company_name } } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body.email);
    const { email, password } = req.body;
    
    console.log('Finding user...');
    const user = await User.findOne({ email });
    console.log('User found:', !!user);
    
    if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });
    if (user.status === 'suspended') return res.status(403).json({ success: false, message: 'Account suspended' });
    
    console.log('Comparing password...');
    const match = await user.comparePassword(password);
    console.log('Password match:', match);
    
    if (!match) return res.status(400).json({ success: false, message: 'Invalid email or password' });
    
    console.log('Generating token...');
    const token = generateToken(user._id);
    console.log('Token generated, returning response...');
    res.json({ success: true, data: { token, user: { _id: user._id, name: user.name, email, role: user.role, company_name: user.company_name } } });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists — always return success
      return res.json({ success: true, message: 'If this email is registered, a code has been sent' });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store in memory
    resetCodes.set(email, { code, expiresAt });

    // Send email with the code
    const html = `
      <div style="font-family:Arial;max-width:600px;margin:auto;background:#0A0F1E;color:#F0F4FF;padding:40px;border-radius:12px;">
        <h2 style="color:#1A6BFF">🔐 Password Reset Code</h2>
        <p>Hi ${user.name},</p>
        <p>You requested to reset your BidSmart password. Use this code:</p>
        <div style="background:#0F1729;border:2px solid #1A6BFF;border-radius:12px;padding:30px;text-align:center;margin:24px 0;">
          <div style="font-size:42px;font-weight:900;letter-spacing:12px;color:#4D90FF;">${code}</div>
          <div style="color:#8896B3;font-size:13px;margin-top:8px;">Valid for 10 minutes only</div>
        </div>
        <p style="color:#8896B3;font-size:13px;">If you did not request this, ignore this email. Your password will not change.</p>
      </div>
    `;

    await sendEmail(email, '🔐 Your BidSmart Password Reset Code', html);

    res.json({ success: true, message: 'Reset code sent to your email' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/verify-reset-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ success: false, message: 'Email and code are required' });

    const stored = resetCodes.get(email);
    if (!stored) return res.status(400).json({ success: false, message: 'No reset code found. Please request a new one.' });
    if (new Date() > stored.expiresAt) {
      resetCodes.delete(email);
      return res.status(400).json({ success: false, message: 'Code has expired. Please request a new one.' });
    }
    if (stored.code !== code) return res.status(400).json({ success: false, message: 'Invalid code. Please try again.' });

    res.json({ success: true, message: 'Code verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Verify code one more time
    const stored = resetCodes.get(email);
    if (!stored || stored.code !== code || new Date() > stored.expiresAt) {
      return res.status(400).json({ success: false, message: 'Invalid or expired code' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    // Update password (the User model pre-save hook will hash it)
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.password = newPassword;
    await user.save();

    // Delete used code
    resetCodes.delete(email);

    // Send confirmation email
    const html = `
      <div style="font-family:Arial;max-width:600px;margin:auto;background:#0A0F1E;color:#F0F4FF;padding:40px;border-radius:12px;">
        <h2 style="color:#1D9E75">✅ Password Changed Successfully</h2>
        <p>Hi ${user.name}, your BidSmart password has been updated successfully.</p>
        <p>If you did not make this change, please contact support immediately.</p>
        <a href="${process.env.CLIENT_URL}" style="background:#1A6BFF;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:16px;">Login to BidSmart →</a>
      </div>
    `;
    sendEmail(email, '✅ BidSmart Password Changed', html);

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get current user
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, data: req.user });
});

module.exports = router;
