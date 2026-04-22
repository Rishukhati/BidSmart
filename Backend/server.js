const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tenders', require('./routes/tender.routes'));
app.use('/api/bids', require('./routes/bid.routes'));
app.use('/api/recommendations', require('./routes/recommendation.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT} ✅`)
    );
  })
  .catch(err => console.error('MongoDB error:', err));
