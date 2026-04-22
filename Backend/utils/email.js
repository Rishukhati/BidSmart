const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

exports.sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"BidSmart" <${process.env.EMAIL_USER}>`,
      to, subject, html
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error('Email error:', err.message);
  }
};

exports.emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to BidSmart! 🎉',
    html: `<div style="font-family:Arial;max-width:600px;margin:auto;background:#0A0F1E;color:#F0F4FF;padding:40px;border-radius:12px;">
      <h1 style="color:#1A6BFF">Welcome to BidSmart, ${name}!</h1>
      <p>Your account has been created. Start discovering AI-matched tenders today.</p>
      <a href="${process.env.CLIENT_URL}" style="background:#1A6BFF;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">Go to Dashboard →</a>
    </div>`
  }),
  
  newTender: (name, tender) => ({
    subject: `New Tender Match: ${tender.title}`,
    html: `<div style="font-family:Arial;max-width:600px;margin:auto;background:#0A0F1E;color:#F0F4FF;padding:40px;border-radius:12px;">
      <h2 style="color:#1A6BFF">New Tender Matches Your Profile!</h2>
      <p>Hi ${name}, a new tender matching your expertise is available:</p>
      <div style="background:#0F1729;padding:20px;border-radius:8px;border-left:4px solid #1A6BFF;margin:20px 0;">
        <h3 style="margin:0 0 8px;color:white">${tender.title}</h3>
        <p style="color:#8896B3;margin:4px 0">Category: ${tender.category}</p>
        <p style="color:#8896B3;margin:4px 0">Budget: ₹${tender.estimated_cost?.toLocaleString('en-IN')}</p>
        <p style="color:#8896B3;margin:4px 0">Deadline: ${new Date(tender.end_date).toLocaleDateString('en-IN')}</p>
      </div>
      <a href="${process.env.CLIENT_URL}" style="background:#1A6BFF;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;">View & Bid Now →</a>
    </div>`
  }),
  
  bidConfirm: (name, bid, tender) => ({
    subject: `Bid Submitted: ${tender.title}`,
    html: `<div style="font-family:Arial;max-width:600px;margin:auto;background:#0A0F1E;color:#F0F4FF;padding:40px;border-radius:12px;">
      <h2 style="color:#1D9E75">✅ Bid Submitted Successfully!</h2>
      <p>Hi ${name}, your bid has been recorded.</p>
      <div style="background:#0F1729;padding:20px;border-radius:8px;margin:20px 0;">
        <p style="color:#8896B3">Tender: <strong style="color:white">${tender.title}</strong></p>
        <p style="color:#8896B3">Your Bid: <strong style="color:white">₹${bid.quoted_amount?.toLocaleString('en-IN')}</strong></p>
        <p style="color:#8896B3">Submitted: <strong style="color:white">${new Date().toLocaleString('en-IN')}</strong></p>
      </div>
      <a href="${process.env.CLIENT_URL}" style="background:#1A6BFF;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;">Track Bid Status →</a>
    </div>`
  }),
  
  bidAccepted: (name, tender) => ({
    subject: `🏆 Congratulations! Your Bid Won — ${tender.title}`,
    html: `<div style="font-family:Arial;max-width:600px;margin:auto;background:#0A0F1E;color:#F0F4FF;padding:40px;border-radius:12px;">
      <h2 style="color:#F5A623">🏆 You Won the Bid!</h2>
      <p>Hi ${name}, your bid on <strong>${tender.title}</strong> has been accepted. Congratulations!</p>
    </div>`
  }),
  
  bidRejected: (name, tender) => ({
    subject: `Bid Update — ${tender.title}`,
    html: `<div style="font-family:Arial;max-width:600px;margin:auto;background:#0A0F1E;color:#F0F4FF;padding:40px;border-radius:12px;">
      <h2 style="color:#E24B4A">Bid Status Update</h2>
      <p>Hi ${name}, unfortunately your bid on <strong>${tender.title}</strong> was not selected this time. Keep bidding — your next win is close!</p>
    </div>`
  })
};
