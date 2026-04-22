require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected ✅');

    const db = mongoose.connection;

    // Step 1: Clear old test data
    await db.collection('users').deleteMany({ 
      email: { $in: ['rishabhsingh.block@gmail.com', 'vendor@bidsmart.in'] } 
    });
    await db.collection('tenders').deleteMany({});
    await db.collection('bids').deleteMany({});
    await db.collection('notifications').deleteMany({});
    console.log('Old data cleared ✅');

    // Step 2: Create admin
    const adminPass = await bcrypt.hash('rishu123', 10);
    const adminResult = await db.collection('users').insertOne({
      name: 'Rishabh Singh',
      email: 'rishabhsingh.block@gmail.com',
      password: adminPass,
      company_name: 'BidSmart Admin',
      role: 'admin',
      category: 'Infrastructure',
      state: 'Uttar Pradesh',
      gst_number: '09AAPCS1234F1Z5',
      pan_number: 'AAPCS1234F',
      phone: '9876543210',
      avg_bid_amount: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const adminId = adminResult.insertedId;
    console.log('Admin created ✅');

    // Step 3: Create vendor
    const vendorPass = await bcrypt.hash('vendor123', 10);
    const vendorResult = await db.collection('users').insertOne({
      name: 'Test Vendor',
      email: 'vendor@bidsmart.in',
      password: vendorPass,
      company_name: 'Sharma Constructions Pvt Ltd',
      role: 'vendor',
      category: 'Infrastructure',
      state: 'Uttar Pradesh',
      gst_number: '09AAPCS9999F1Z5',
      pan_number: 'AAPCS9999F',
      phone: '9123456789',
      avg_bid_amount: 2500000,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const vendorId = vendorResult.insertedId;
    console.log('Vendor created ✅');

    // Step 4: Insert tenders
    const tendersToInsert = [
      {
        title: 'Road Construction — NH-24 Gomti Nagar Phase 2',
        description: 'Construction of 4-lane highway from Gomti Nagar to Hazratganj covering 12km stretch including drainage and lighting',
        category: 'Infrastructure',
        state: 'Uttar Pradesh',
        estimated_cost: 25000000,
        start_date: new Date('2026-04-01'),
        end_date: new Date('2026-05-30'),
        status: 'Active',
        created_by: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Water Pipeline — Lucknow East Zone',
        description: 'Installation of underground water pipeline network covering 8 districts in East Lucknow zone',
        category: 'Infrastructure',
        state: 'Uttar Pradesh',
        estimated_cost: 18000000,
        start_date: new Date('2026-04-05'),
        end_date: new Date('2026-06-15'),
        status: 'Active',
        created_by: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Smart City IT Infrastructure — Phase 1',
        description: 'Supply and installation of IT equipment including servers, networking, and CCTV for smart city project',
        category: 'IT Services',
        state: 'Delhi',
        estimated_cost: 12000000,
        start_date: new Date('2026-04-10'),
        end_date: new Date('2026-06-01'),
        status: 'Active',
        created_by: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'School Furniture Supply — Varanasi District',
        description: 'Supply of wooden furniture including desks, chairs, and almirahs for 45 government schools in Varanasi',
        category: 'Supply',
        state: 'Uttar Pradesh',
        estimated_cost: 3500000,
        start_date: new Date('2026-04-15'),
        end_date: new Date('2026-05-15'),
        status: 'Active',
        created_by: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Street Light Maintenance — Kanpur City Zone A',
        description: 'Annual maintenance contract for 2400 street lights including LED replacement and electrical work',
        category: 'Infrastructure',
        state: 'Uttar Pradesh',
        estimated_cost: 2800000,
        start_date: new Date('2026-04-20'),
        end_date: new Date('2026-05-20'),
        status: 'Active',
        created_by: adminId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const tendersResult = await db.collection('tenders').insertMany(tendersToInsert);
    console.log('Tenders inserted ✅');
    
    const tender1Id = tendersResult.insertedIds[0];
    const tender2Id = tendersResult.insertedIds[1];
    const tender5Id = tendersResult.insertedIds[4];

    // Step 5: Insert bids
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(today.getDate() - 5);

    const bidsToInsert = [
      {
        tender_id: tender1Id,
        user_id: vendorId,
        quoted_amount: 23500000,
        status: 'Pending',
        submitted_at: today,
        createdAt: today,
        updatedAt: today,
      },
      {
        tender_id: tender2Id,
        user_id: vendorId,
        quoted_amount: 17200000,
        status: 'Accepted',
        submitted_at: threeDaysAgo,
        createdAt: threeDaysAgo,
        updatedAt: threeDaysAgo,
      },
      {
        tender_id: tender5Id,
        user_id: vendorId,
        quoted_amount: 2600000,
        status: 'Rejected',
        submitted_at: fiveDaysAgo,
        createdAt: fiveDaysAgo,
        updatedAt: fiveDaysAgo,
      }
    ];

    await db.collection('bids').insertMany(bidsToInsert);
    console.log('Bids inserted ✅');

    // Step 6: Insert notifications
    const notificationsToInsert = [
      {
        user_id: vendorId,
        message: '🏆 Your bid on Water Pipeline — Lucknow East Zone was ACCEPTED!',
        type: 'bid_update',
        is_read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: vendorId,
        message: 'New tender matches your profile: Road Construction — NH-24 Gomti Nagar Phase 2',
        type: 'new_tender',
        is_read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: vendorId,
        message: '⚠️ Reminder: Street Light Maintenance tender closes in 3 days',
        type: 'deadline',
        is_read: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: vendorId,
        message: 'Your bid on Street Light Maintenance — Kanpur was not selected',
        type: 'bid_update',
        is_read: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await db.collection('notifications').insertMany(notificationsToInsert);
    console.log('Notifications inserted ✅');

    console.log('');
    console.log('============================');
    console.log('SEED COMPLETE ✅');
    console.log('============================');
    console.log('Admin Login:');
    console.log('  Email: rishabhsingh.block@gmail.com');
    console.log('  Password: rishu123');
    console.log('');
    console.log('Vendor Login:');
    console.log('  Email: vendor@bidsmart.in');
    console.log('  Password: vendor123');
    console.log('============================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
