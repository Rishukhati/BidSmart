import React, { useState } from 'react';

const Toggle = ({ defaultOn = false, onChange }) => {
  const [isOn, setIsOn] = useState(defaultOn);
  return (
    <button 
      onClick={() => { setIsOn(!isOn); if (onChange) onChange(!isOn); }}
      className={`w-[38px] h-[22px] rounded-full relative shrink-0 transition-colors ${isOn ? 'bg-[#1A6BFF]' : 'bg-white/10'}`}
    >
      <div className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white transition-transform ${isOn ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
    </button>
  );
};

export default function VendorDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [submitStep, setSubmitStep] = useState(1);
  const [bidAmt, setBidAmt] = useState('');
  const [declChk, setDeclChk] = useState(false);

  const pages = {
    dashboard: { title: 'Dashboard', crumb: 'Home' },
    browse:    { title: 'Browse Tenders', crumb: 'Tenders → Browse' },
    submit:    { title: 'Submit a Bid', crumb: 'Bidding → New Bid' },
    mybids:    { title: 'My Bids', crumb: 'Bidding → My Bids' },
    profile:   { title: 'Profile & Settings', crumb: 'Account → Profile' },
  };

  const NavItem = ({ id, icon, label, badge, badgeColor = 'blue' }) => {
    const isActive = activePage === id;
    return (
      <div 
        onClick={() => setActivePage(id)}
        className={`flex items-center gap-2.5 px-4 py-[9px] mx-2 my-[1px] rounded-lg cursor-pointer text-[13px] font-medium transition-colors relative
          ${isActive ? 'bg-[rgba(26,107,255,0.12)] text-white' : 'text-[#8896B3] hover:bg-white/5 hover:text-white'}
        `}
      >
        {isActive && <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-[#1A6BFF] rounded-r-sm"></div>}
        <span className="text-base w-5 text-center shrink-0">{icon}</span>
        {label}
        {badge && (
          <span className={`ml-auto text-[10px] font-bold px-[7px] py-[1px] rounded-full ${
            badgeColor === 'gold' ? 'bg-[#F5A623] text-[#0A0F1E]' : 'bg-[#1A6BFF] text-white'
          }`}>
            {badge}
          </span>
        )}
      </div>
    );
  };

  const amtNum = parseInt(bidAmt.replace(/[^0-9]/g, '')) || 0;
  const emd = Math.round(amtNum * 0.01);
  const totalPayable = amtNum ? emd + 2500 : 0;

  const handleBidSubmit = () => {
    if(!declChk) {
      alert('Please accept the declaration before submitting.');
      return;
    }
    alert('✅ Bid submitted successfully!\n\nYou will receive a confirmation email. Track status in "My Bids".');
    setActivePage('mybids');
    setSubmitStep(1);
    setBidAmt('');
    setDeclChk(false);
  };

  const renderDashboard = () => (
    <div className="animate-fade-in-up">
      {/* AI Banner */}
      <div className="bg-gradient-to-br from-[#0F1E4A] to-[#0A1A3A] border border-[rgba(26,107,255,0.25)] rounded-2xl p-6 md:px-7 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute -top-[60px] -right-[40px] w-[200px] h-[200px] bg-[rgba(26,107,255,0.07)] rounded-full"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(26,107,255,0.15)] border border-[rgba(26,107,255,0.3)] text-[#4D90FF] text-[11px] font-semibold px-3 py-1 rounded-full mb-2.5 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-[#1A6BFF] rounded-full animate-pulse"></span>
            AI Recommendations Ready
          </div>
          <h2 className="font-syne text-[20px] font-extrabold mb-1.5 tracking-tight text-white">8 new tenders match your profile today</h2>
          <p className="text-[13px] text-[#8896B3] leading-relaxed">Based on Infrastructure & Civil Works expertise · Lucknow, UP · Top match: 96% relevance</p>
        </div>
        <button onClick={() => setActivePage('browse')} className="px-5 py-2.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-lg text-[13px] font-medium transition-colors relative z-10 whitespace-nowrap">
          View Matches →
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { lbl: 'Total Bids', num: '28', d: '↑ 3 this month', dColor: 'text-[#1D9E75]', ico: '📤', bg: 'bg-[rgba(26,107,255,0.12)]' },
          { lbl: 'Bids Won', num: '18', d: '64% win rate', dColor: 'text-[#1D9E75]', ico: '🏆', bg: 'bg-[rgba(29,158,117,0.12)]' },
          { lbl: 'Under Review', num: '3', d: 'Awaiting decision', dColor: 'text-[#8896B3]', ico: '⏳', bg: 'bg-[rgba(245,166,35,0.12)]' },
          { lbl: 'Contract Value', num: '₹14Cr', d: '↑ ₹2.3Cr this year', dColor: 'text-[#1D9E75]', ico: '💰', bg: 'bg-[rgba(245,166,35,0.12)]' }
        ].map((s, i) => (
          <div key={i} className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.13)] rounded-2xl p-5 px-5.5 transition-colors">
            <div className="flex items-center justify-between mb-3.5">
              <div className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">{s.lbl}</div>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[17px] ${s.bg}`}>{s.ico}</div>
            </div>
            <div className="font-syne text-[28px] font-extrabold tracking-tight leading-none text-white">{s.num}</div>
            <div className={`text-[12px] mt-1.5 ${s.dColor}`}>{s.d}</div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-syne text-[17px] font-bold tracking-tight text-white">AI Recommended Tenders</div>
              <div className="text-[12px] text-[#8896B3] mt-0.5">Matched to your profile · Updated 15 min ago</div>
            </div>
            <button onClick={() => setActivePage('browse')} className="px-3 py-1.5 border border-[rgba(255,255,255,0.07)] hover:bg-[rgba(26,107,255,0.12)] hover:border-[#1A6BFF] hover:text-[#4D90FF] rounded-md text-[12px] font-medium text-[#8896B3] transition-all">View all →</button>
          </div>
          <div className="flex flex-col gap-3">
            {/* Rec Card 1 */}
            <div onClick={() => setActivePage('submit')} className="bg-[#151E35] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(26,107,255,0.35)] rounded-xl p-4.5 cursor-pointer transition-all transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-2.5 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#4D90FF] bg-[rgba(26,107,255,0.12)] px-2.5 py-1 rounded-full">Infrastructure</span>
                <span className="flex items-center gap-1 text-[12px] font-bold text-[#4DDDB0] bg-[rgba(29,158,117,0.12)] px-2.5 py-1 rounded-full whitespace-nowrap">★ 96% match</span>
              </div>
              <div className="font-syne text-[14px] font-bold mb-1.5 leading-snug text-white">Road Construction — NH-24 Gomti Nagar Phase 2</div>
              <div className="text-[12px] text-[#8896B3] mb-3">PWD · Lucknow, Uttar Pradesh</div>
              <div className="flex gap-3.5 flex-wrap">
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">💰 <strong className="text-white font-medium">₹2.5 Cr</strong></div>
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">📥 <strong className="text-white font-medium">14</strong> bids</div>
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">🗓️ <strong className="text-white font-medium">30 Apr</strong></div>
              </div>
              <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-[rgba(255,255,255,0.07)]">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(226,75,74,0.12)] text-[#F08080] border border-[rgba(226,75,74,0.3)]">⚠ 8 days left</span>
                <button onClick={(e) => {e.stopPropagation(); setActivePage('submit');}} className="px-4 py-1.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-md text-[12px] font-semibold transition-colors">Bid Now →</button>
              </div>
            </div>

            {/* Rec Card 2 */}
            <div className="bg-[#151E35] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(26,107,255,0.35)] rounded-xl p-4.5 cursor-pointer transition-all transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-2.5 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#4D90FF] bg-[rgba(26,107,255,0.12)] px-2.5 py-1 rounded-full">Civil Works</span>
                <span className="flex items-center gap-1 text-[12px] font-bold text-[#4DDDB0] bg-[rgba(29,158,117,0.12)] px-2.5 py-1 rounded-full whitespace-nowrap">★ 89% match</span>
              </div>
              <div className="font-syne text-[14px] font-bold mb-1.5 leading-snug text-white">Water Pipeline — Lucknow East Zone</div>
              <div className="text-[12px] text-[#8896B3] mb-3">Jal Nigam · Lucknow, UP</div>
              <div className="flex gap-3.5 flex-wrap">
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">💰 <strong className="text-white font-medium">₹1.8 Cr</strong></div>
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">📥 <strong className="text-white font-medium">9</strong> bids</div>
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">🗓️ <strong className="text-white font-medium">5 May</strong></div>
              </div>
              <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-[rgba(255,255,255,0.07)]">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(245,166,35,0.12)] text-[#FFD07A] border border-[rgba(245,166,35,0.3)]">13 days left</span>
                <button className="px-4 py-1.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-md text-[12px] font-semibold transition-colors">Bid Now →</button>
              </div>
            </div>

            {/* Rec Card 3 */}
            <div className="bg-[#151E35] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(26,107,255,0.35)] rounded-xl p-4.5 cursor-pointer transition-all transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-2.5 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#4D90FF] bg-[rgba(26,107,255,0.12)] px-2.5 py-1 rounded-full">Maintenance</span>
                <span className="flex items-center gap-1 text-[12px] font-bold text-[#4DDDB0] bg-[rgba(29,158,117,0.12)] px-2.5 py-1 rounded-full whitespace-nowrap">★ 81% match</span>
              </div>
              <div className="font-syne text-[14px] font-bold mb-1.5 leading-snug text-white">Street Light Maintenance — Kanpur City Zone A</div>
              <div className="text-[12px] text-[#8896B3] mb-3">Municipal Corp · Kanpur, UP</div>
              <div className="flex gap-3.5 flex-wrap">
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">💰 <strong className="text-white font-medium">₹28 L</strong></div>
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">📥 <strong className="text-white font-medium">3</strong> bids</div>
                <div className="text-[12px] text-[#8896B3] flex items-center gap-1">🗓️ <strong className="text-white font-medium">15 May</strong></div>
              </div>
              <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-[rgba(255,255,255,0.07)]">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(29,158,117,0.12)] text-[#4DDDB0] border border-[rgba(29,158,117,0.3)]">23 days left</span>
                <button className="px-4 py-1.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-md text-[12px] font-semibold transition-colors">Bid Now →</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6">
            <div className="font-syne text-[17px] font-bold tracking-tight text-white mb-2">Win Rate</div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-syne text-[36px] font-extrabold text-white">64%</span>
              <span className="text-[13px] text-[#4DDDB0] font-semibold">↑ 8% vs last year</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
              <div className="h-full rounded-full bg-gradient-to-r from-[#1A6BFF] to-[#4DDDB0]" style={{ width: '64%' }}></div>
            </div>
            <div className="mt-4 flex flex-col gap-2.5">
              <div className="flex justify-between text-[13px]"><span className="text-[#8896B3]">Won</span><span className="text-[#4DDDB0] font-semibold">18 bids</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-[#8896B3]">Under Review</span><span className="text-[#FFD07A] font-semibold">3 bids</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-[#8896B3]">Lost</span><span className="text-[#F08080] font-semibold">7 bids</span></div>
            </div>
          </div>

          <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 flex-1">
            <div className="font-syne text-[17px] font-bold tracking-tight text-white mb-3">Recent Activity</div>
            <div className="flex flex-col">
              {[
                { dot: '#4DDDB0', txt: <>Bid on <strong className="text-white font-medium">Road Construction NH-24</strong> approved</>, time: '2h ago' },
                { dot: '#4D90FF', txt: <>New match: <strong className="text-white font-medium">Water Pipeline East Zone</strong></>, time: '3h ago' },
                { dot: '#FFD07A', txt: <>Reminder: <strong className="text-white font-medium">IT Equipment</strong> closes in 2 days</>, time: 'Yesterday' },
                { dot: '#F08080', txt: <><strong className="text-white font-medium">School Building Bid</strong> — not selected</>, time: '2 days ago' },
              ].map((act, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-[rgba(255,255,255,0.07)] last:border-0">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: act.dot }}></div>
                  <div className="flex-1 text-[13px] text-[#8896B3] leading-snug">{act.txt}</div>
                  <div className="text-[11px] text-[#5A6785] whitespace-nowrap">{act.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="animate-fade-in-up">
      {/* Search Bar */}
      <div className="flex items-center gap-2.5 mb-4.5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none">🔍</span>
          <input type="text" placeholder="Search by title, ref no, location..." className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3.5 pl-9 text-white text-[13px] outline-none focus:border-[#1A6BFF]" />
        </div>
        {['All Categories', 'All Locations', 'Sort: Best Match'].map((opt, i) => (
          <select key={i} className="bg-white/5 border border-white/10 rounded-lg py-2 px-3.5 text-white text-[13px] outline-none cursor-pointer">
            <option className="bg-[#0F1729] text-white">{opt}</option>
          </select>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-[13px] text-[#8896B3]">Showing <strong className="text-white">38 active</strong> tenders · 8 AI matches</div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-[rgba(255,255,255,0.07)] rounded-md text-[12px] font-medium text-[#8896B3] hover:bg-white/5 hover:text-white transition-all">🤖 AI Matches Only</button>
          <button className="px-3 py-1.5 border border-[rgba(255,255,255,0.07)] rounded-md text-[12px] font-medium text-[#8896B3] hover:bg-white/5 hover:text-white transition-all">📅 Closing Soon</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: 'Road Construction — NH-24 Gomti Nagar Phase 2', dept: 'PWD · Lucknow, UP · Ref: UP/PWD/2026/0412',
            match: '★ 96% match', time: '8 days', timeClass: 'bg-[rgba(226,75,74,0.12)] text-[#F08080] border-[rgba(226,75,74,0.3)]',
            val: '₹2.5 Cr', bids: '14 bids', cat: 'Infrastructure', emd: '₹2.5 L'
          },
          {
            title: 'Water Pipeline — Lucknow East Zone', dept: 'Jal Nigam · Lucknow, UP · Ref: UP/JN/2026/0389',
            match: '★ 89% match', time: '13 days', timeClass: 'bg-[rgba(245,166,35,0.12)] text-[#FFD07A] border-[rgba(245,166,35,0.3)]',
            val: '₹1.8 Cr', bids: '9 bids', cat: 'Civil Works', emd: '₹1.8 L'
          },
          {
            title: 'Street Light Maintenance — Kanpur City Zone A', dept: 'Municipal Corp · Kanpur, UP · Ref: UP/MC/2026/0199',
            match: null, time: '23 days', timeClass: 'bg-[rgba(29,158,117,0.12)] text-[#4DDDB0] border-[rgba(29,158,117,0.3)]',
            val: '₹28 L', bids: '3 bids', cat: 'Maintenance', emd: '₹28,000'
          },
          {
            title: 'Government Hospital Building Renovation', dept: 'Health Dept · Agra, UP · Ref: UP/HLT/2026/0344',
            match: '★ 81% match', time: '18 days', timeClass: 'bg-[rgba(29,158,117,0.12)] text-[#4DDDB0] border-[rgba(29,158,117,0.3)]',
            val: '₹4.1 Cr', bids: '6 bids', cat: 'Infrastructure', emd: '₹4.1 L'
          },
          {
            title: 'IT Equipment Supply — District Collectorate Varanasi', dept: 'IT Dept · Varanasi, UP · Ref: UP/IT/2026/0301',
            match: null, time: '11 days', timeClass: 'bg-[rgba(245,166,35,0.12)] text-[#FFD07A] border-[rgba(245,166,35,0.3)]',
            val: '₹45 L', bids: '22 bids', cat: 'IT & Equipment', emd: '₹45,000'
          },
          {
            title: 'Solar Panel Installation — Govt Schools Agra', dept: 'Education Dept · Agra, UP · Ref: UP/EDU/2026/0278',
            match: null, time: '30 days', timeClass: 'bg-[rgba(29,158,117,0.12)] text-[#4DDDB0] border-[rgba(29,158,117,0.3)]',
            val: '₹90 L', bids: '7 bids', cat: 'Services', emd: '₹90,000'
          }
        ].map((t, i) => (
          <div key={i} className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.13)] rounded-2xl p-5 transition-all transform hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3 mb-3.5">
              <div className="flex gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-[rgba(29,158,117,0.12)] text-[#4DDDB0] px-2.5 py-1 rounded-full text-[11px] font-semibold"><div className="w-1.5 h-1.5 rounded-full bg-[#4DDDB0]"></div>Active</span>
                {t.match && <span className="bg-[rgba(29,158,117,0.12)] text-[#4DDDB0] border border-[rgba(29,158,117,0.2)] px-2.5 py-1 rounded-full text-[11px] font-bold">{t.match}</span>}
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${t.timeClass}`}>{t.time}</span>
            </div>
            <div className="font-syne text-[15px] font-bold leading-snug mb-1.5 text-white">{t.title}</div>
            <div className="text-[12px] text-[#8896B3] mb-3.5">{t.dept}</div>
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              {[ {l: 'Est. Value', v: t.val}, {l: 'Bids So Far', v: t.bids}, {l: 'Category', v: t.cat}, {l: 'EMD', v: t.emd} ].map((d, di) => (
                <div key={di} className="bg-white/5 rounded-lg p-2.5">
                  <div className="text-[10px] text-[#5A6785] uppercase tracking-wide mb-1">{d.l}</div>
                  <div className="text-[13px] font-medium text-white">{d.v}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3.5 border-t border-[rgba(255,255,255,0.07)]">
              <button className="px-4 py-2 bg-transparent border border-[rgba(255,255,255,0.13)] hover:bg-white/5 rounded-lg text-white text-[13px] font-medium transition-all">View Details</button>
              <button onClick={() => setActivePage('submit')} className="px-4 py-2 bg-[#1A6BFF] hover:bg-[#4D90FF] rounded-lg text-white text-[13px] font-medium transition-colors">Submit Bid →</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5 text-[13px] text-[#8896B3]">
        <span>Showing 6 of 38 tenders</span>
        <div className="flex gap-1.5">
          <button className="px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.07)] hover:bg-[rgba(26,107,255,0.12)] hover:border-[#1A6BFF] hover:text-[#4D90FF] transition-all">← Prev</button>
          <button className="px-3 py-1.5 rounded-md border border-[#1A6BFF] bg-[rgba(26,107,255,0.12)] text-[#4D90FF]">1</button>
          <button className="px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.07)] hover:bg-white/5 transition-all">2</button>
          <button className="px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.07)] hover:bg-white/5 transition-all">3</button>
          <button className="px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.07)] hover:bg-[rgba(26,107,255,0.12)] hover:border-[#1A6BFF] hover:text-[#4D90FF] transition-all">Next →</button>
        </div>
      </div>
    </div>
  );

  const renderSubmit = () => (
    <div className="animate-fade-in-up">
      <div className="bg-gradient-to-br from-[#0F1E4A] to-[#0A1730] border border-[rgba(26,107,255,0.2)] rounded-2xl p-5 md:p-6 mb-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex-1">
          <div className="text-[11px] text-[#4D90FF] font-semibold uppercase tracking-wide mb-1.5">UP/PWD/2026/0412 · Infrastructure · Lucknow</div>
          <div className="font-syne text-[18px] font-extrabold mb-1.5 tracking-tight text-white">Road Construction — NH-24 Gomti Nagar Phase 2</div>
          <div className="text-[13px] text-[#8896B3]">Public Works Department, Uttar Pradesh</div>
        </div>
        <div className="flex gap-6 shrink-0">
          <div className="text-center"><div className="font-syne text-[20px] font-extrabold text-white">₹2.5Cr</div><div className="text-[11px] text-[#8896B3] mt-0.5">Est. Value</div></div>
          <div className="text-center"><div className="font-syne text-[20px] font-extrabold text-[#F08080]">8d</div><div className="text-[11px] text-[#8896B3] mt-0.5">Remaining</div></div>
          <div className="text-center"><div className="font-syne text-[20px] font-extrabold text-white">14</div><div className="text-[11px] text-[#8896B3] mt-0.5">Bidders</div></div>
          <div className="text-center"><div className="font-syne text-[20px] font-extrabold text-[#4DDDB0]">96%</div><div className="text-[11px] text-[#8896B3] mt-0.5">AI Match</div></div>
        </div>
      </div>

      <div className="flex items-center mb-7 max-w-[760px]">
        {[
          { n: 1, l: 'Bid Details' },
          { n: 2, l: 'Documents' },
          { n: 3, l: 'Review & Submit' }
        ].map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 transition-all ${
                submitStep > s.n ? 'bg-[#1D9E75] text-white' : submitStep === s.n ? 'bg-[#1A6BFF] text-white' : 'bg-white/5 border border-[rgba(255,255,255,0.07)] text-[#8896B3]'
              }`}>
                {submitStep > s.n ? '✓' : s.n}
              </div>
              <span className={`text-[12px] font-medium whitespace-nowrap ${submitStep === s.n ? 'text-white' : 'text-[#8896B3]'}`}>{s.l}</span>
            </div>
            {i < 2 && <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.07)] mx-3"></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="max-w-[760px]">
        {submitStep === 1 && (
          <div className="animate-fade-in-up">
            <div className="mb-6">
              <div className="font-syne text-[14px] font-bold text-white mb-4 pb-2.5 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-2">
                <span>💰</span> Financial Details
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Quoted Amount (₹) *</label>
                  <input type="text" value={bidAmt} onChange={(e) => setBidAmt(e.target.value)} placeholder="e.g. 2,28,00,000" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" />
                  <span className="text-[11px] text-[#8896B3] mt-[-4px]">Estimated value: ₹2,50,00,000 — bid competitively</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">EMD Deposit Mode *</label>
                  <select className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)] cursor-pointer">
                    <option className="bg-[#0F1729] text-white">Bank Guarantee</option>
                    <option className="bg-[#0F1729] text-white">DD / Pay Order</option>
                    <option className="bg-[#0F1729] text-white">Online NEFT</option>
                  </select>
                </div>
              </div>
              <div className="bg-white/5 border border-[rgba(255,255,255,0.07)] rounded-xl p-4 mt-3">
                <div className="flex justify-between py-1.5 border-b border-[rgba(255,255,255,0.07)] text-[13px]"><span className="text-[#8896B3]">Quoted Amount</span><span className="text-white">{bidAmt ? '₹ ' + amtNum.toLocaleString('en-IN') : '₹ —'}</span></div>
                <div className="flex justify-between py-1.5 border-b border-[rgba(255,255,255,0.07)] text-[13px]"><span className="text-[#8896B3]">EMD (1%)</span><span className="text-white">{bidAmt ? '₹ ' + emd.toLocaleString('en-IN') : '₹ —'}</span></div>
                <div className="flex justify-between py-1.5 border-b border-[rgba(255,255,255,0.07)] text-[13px]"><span className="text-[#8896B3]">Tender Fee</span><span className="text-white">₹ 2,500</span></div>
                <div className="flex justify-between pt-2.5 mt-1 font-semibold text-[14px]"><span className="text-[#8896B3]">Total Payable Now</span><span className="text-[#F5A623]">{bidAmt ? '₹ ' + totalPayable.toLocaleString('en-IN') : '₹ —'}</span></div>
              </div>
            </div>

            <div className="font-syne text-[14px] font-bold text-white mb-4 pb-2.5 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-2">
              <span>📝</span> Technical Proposal
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Approach & Methodology *</label>
                <textarea className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none min-h-[110px] resize-y focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" placeholder="Describe your technical approach..."></textarea>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Proposed Timeline</label>
                <input type="text" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" placeholder="e.g. 12 months" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Team Size</label>
                <input type="number" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" placeholder="e.g. 45 workers" />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Past Similar Projects</label>
                <textarea className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none min-h-[70px] resize-y focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" placeholder="List 2-3 similar completed projects..."></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[rgba(255,255,255,0.07)]">
              <button onClick={() => setActivePage('dashboard')} className="px-6 py-2.5 bg-transparent border border-[rgba(255,255,255,0.13)] hover:bg-white/5 text-[#8896B3] hover:text-white rounded-lg text-[14px] font-medium transition-colors">Cancel</button>
              <button onClick={() => setSubmitStep(2)} className="px-7 py-2.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-lg text-[14px] font-medium transition-all transform hover:-translate-y-0.5">Save & Continue →</button>
            </div>
          </div>
        )}

        {submitStep === 2 && (
          <div className="animate-fade-in-up">
            <div className="font-syne text-[14px] font-bold text-white mb-4 pb-2.5 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-2">
              <span>📎</span> Required Documents
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <div className="text-[12px] font-semibold text-[#8896B3] uppercase tracking-wide mb-2">Mandatory</div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[13px]"><span className="text-[#4DDDB0]">✓</span><span className="text-[#8896B3]">Company Registration</span></div>
                  <div className="flex items-center gap-2 text-[13px]"><span className="text-[#4DDDB0]">✓</span><span className="text-[#8896B3]">GST Certificate</span></div>
                  <div className="flex items-center gap-2 text-[13px]"><span className="text-[#FFD07A]">○</span><span className="text-[#8896B3]">Financial Statements</span></div>
                  <div className="flex items-center gap-2 text-[13px]"><span className="text-[#F08080]">✗</span><span className="text-[#8896B3]">Technical Bid Document</span></div>
                </div>
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#8896B3] uppercase tracking-wide mb-2">Optional</div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[13px]"><span className="text-[#8896B3]">○</span><span className="text-[#8896B3]">ISO Certification</span></div>
                  <div className="flex items-center gap-2 text-[13px]"><span className="text-[#8896B3]">○</span><span className="text-[#8896B3]">Past Completion Certs</span></div>
                </div>
              </div>
            </div>
            <div className="border-2 border-dashed border-white/15 bg-white/5 hover:bg-[rgba(26,107,255,0.12)] hover:border-[#1A6BFF] rounded-xl p-7 text-center cursor-pointer transition-all">
              <div className="text-[28px] mb-2">☁️</div>
              <p className="text-[13px] text-[#8896B3]"><strong className="text-[#4D90FF]">Click to upload</strong> or drag and drop</p>
              <p className="text-[12px] text-[#8896B3] mt-1">PDF, DOC — Max 10MB per file</p>
            </div>
            <div className="flex flex-col gap-2.5 mt-3">
              {['Company_Registration.pdf (1.2 MB)', 'GST_Certificate.pdf (0.8 MB)'].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2.5 px-3.5 bg-white/5 border border-[rgba(255,255,255,0.07)] rounded-lg">
                  <span className="text-[18px]">📄</span>
                  <span className="text-[13px] flex-1 text-white">{f.split(' ')[0]}</span>
                  <span className="text-[11px] text-[#8896B3]">{f.split(' ')[1]}</span>
                  <button className="text-[#8896B3] hover:text-[#E24B4A]">✕</button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[rgba(255,255,255,0.07)]">
              <button onClick={() => setSubmitStep(1)} className="px-6 py-2.5 bg-transparent border border-[rgba(255,255,255,0.13)] hover:bg-white/5 text-[#8896B3] hover:text-white rounded-lg text-[14px] font-medium transition-colors">← Back</button>
              <button onClick={() => setSubmitStep(3)} className="px-7 py-2.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-lg text-[14px] font-medium transition-all transform hover:-translate-y-0.5">Review Bid →</button>
            </div>
          </div>
        )}

        {submitStep === 3 && (
          <div className="animate-fade-in-up">
            <div className="font-syne text-[14px] font-bold text-white mb-4 pb-2.5 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-2">
              <span>👁️</span> Review Your Bid
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-xl p-4.5">
                <div className="text-[12px] text-[#8896B3] uppercase tracking-wide font-semibold mb-3">Tender Details</div>
                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex justify-between"><span className="text-[#8896B3]">Reference</span><span className="text-white">UP/PWD/2026/0412</span></div>
                  <div className="flex justify-between"><span className="text-[#8896B3]">Category</span><span className="text-white">Infrastructure</span></div>
                  <div className="flex justify-between"><span className="text-[#8896B3]">Deadline</span><span className="text-[#F08080]">30 Apr 2026</span></div>
                  <div className="flex justify-between"><span className="text-[#8896B3]">Est. Value</span><span className="text-white">₹2.5 Cr</span></div>
                </div>
              </div>
              <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-xl p-4.5">
                <div className="text-[12px] text-[#8896B3] uppercase tracking-wide font-semibold mb-3">Your Bid</div>
                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex justify-between"><span className="text-[#8896B3]">Quoted</span><span className="text-white font-semibold">{bidAmt ? '₹ ' + amtNum.toLocaleString('en-IN') : '₹ —'}</span></div>
                  <div className="flex justify-between"><span className="text-[#8896B3]">EMD</span><span className="text-white">{bidAmt ? '₹ ' + emd.toLocaleString('en-IN') : '₹ —'}</span></div>
                  <div className="flex justify-between"><span className="text-[#8896B3]">Tender Fee</span><span className="text-white">₹ 2,500</span></div>
                  <div className="flex justify-between pt-2 mt-1 border-t border-[rgba(255,255,255,0.07)]"><span className="text-[#8896B3]">AI Match Score</span><span className="text-[#4DDDB0] font-bold">96%</span></div>
                </div>
              </div>
            </div>
            <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-xl p-4 mb-4">
              <div className="text-[12px] text-[#8896B3] uppercase tracking-wide font-semibold mb-2.5">Documents Attached</div>
              <div className="flex gap-2.5 flex-wrap">
                <span className="bg-white/5 border border-[rgba(255,255,255,0.07)] px-3 py-1.5 rounded-lg text-[12px] text-white">📄 Company_Registration.pdf</span>
                <span className="bg-white/5 border border-[rgba(255,255,255,0.07)] px-3 py-1.5 rounded-lg text-[12px] text-white">📄 GST_Certificate.pdf</span>
              </div>
            </div>
            <div className="bg-[rgba(245,166,35,0.12)] border border-[rgba(245,166,35,0.3)] rounded-xl p-3.5 px-4 mb-4 flex items-start gap-2.5">
              <span className="text-[18px] shrink-0">⚠️</span>
              <div className="text-[13px] text-[#FFD07A] leading-relaxed">Once submitted, your bid <strong className="font-semibold">cannot be edited</strong>. You may withdraw before the deadline. Ensure all details are correct.</div>
            </div>
            <div className="flex items-start gap-2.5 mb-5 cursor-pointer" onClick={() => setDeclChk(!declChk)}>
              <input type="checkbox" checked={declChk} readOnly className="mt-0.5 accent-[#1A6BFF] w-4 h-4 cursor-pointer" />
              <div className="text-[13px] text-[#8896B3] select-none">I declare all information submitted is accurate and I have read the tender terms and conditions.</div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-[rgba(255,255,255,0.07)]">
              <button onClick={() => setSubmitStep(2)} className="px-6 py-2.5 bg-transparent border border-[rgba(255,255,255,0.13)] hover:bg-white/5 text-[#8896B3] hover:text-white rounded-lg text-[14px] font-medium transition-colors">← Back</button>
              <button onClick={handleBidSubmit} className="px-7 py-2.5 bg-[#1D9E75] hover:bg-[#188B66] text-white rounded-lg text-[14px] font-medium transition-all transform hover:-translate-y-0.5 flex items-center gap-2">🚀 Submit Bid</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMyBids = () => (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-2.5 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] pointer-events-none">🔍</span>
          <input type="text" placeholder="Search bids..." className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3.5 pl-9 text-white text-[13px] outline-none focus:border-[#1A6BFF]" />
        </div>
        <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-3.5 text-white text-[13px] outline-none cursor-pointer"><option className="bg-[#0F1729]">All Status</option><option className="bg-[#0F1729]">Under Review</option></select>
        <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-3.5 text-white text-[13px] outline-none cursor-pointer"><option className="bg-[#0F1729]">All Time</option><option className="bg-[#0F1729]">This Month</option></select>
      </div>

      <div className="flex gap-2.5 mb-5 flex-wrap">
        {[
          {n: '28', l: 'Total Bids', bg: 'bg-[#0F1729] border-[rgba(255,255,255,0.07)]', tc: 'text-white'},
          {n: '18', l: 'Won', bg: 'bg-[rgba(29,158,117,0.12)] border-[rgba(29,158,117,0.2)]', tc: 'text-[#4DDDB0]'},
          {n: '3', l: 'Under Review', bg: 'bg-[rgba(245,166,35,0.12)] border-[rgba(245,166,35,0.2)]', tc: 'text-[#FFD07A]'},
          {n: '7', l: 'Lost', bg: 'bg-[rgba(226,75,74,0.12)] border-[rgba(226,75,74,0.2)]', tc: 'text-[#F08080]'}
        ].map((s,i) => (
          <div key={i} className={`${s.bg} border rounded-xl py-3 px-4.5 flex items-center gap-2.5`}>
            <div className={`font-syne text-[22px] font-extrabold ${s.tc}`}>{s.n}</div>
            <div className={`text-[12px] ${s.tc}`}>{s.l}</div>
          </div>
        ))}
      </div>

      {[
        { t: 'Road Construction — NH-24 Gomti Nagar Phase 2', r: 'UP/PWD/2026/0412 · PWD · Lucknow', v: '₹2.28 Cr', sub: '22 Apr 2026', dead: '30 Apr 2026', deadCol: 'text-[#F08080]', badge: 'Under Review', bg: 'bg-[rgba(26,107,255,0.12)] text-[#4D90FF]', step: 2, match: '96% match', docs: '3' },
        { t: 'Water Pipeline — Lucknow East Zone', r: 'UP/JN/2026/0389 · Jal Nigam · Lucknow', v: '₹1.72 Cr', sub: '18 Apr 2026', dead: '5 May 2026', deadCol: 'text-white', badge: 'Under Review', bg: 'bg-[rgba(26,107,255,0.12)] text-[#4D90FF]', step: 2, match: '89% match', docs: '4' },
        { t: 'Solar Panel Installation — Govt Schools Agra', r: 'UP/EDU/2026/0278 · Education Dept · Agra', v: '₹86 L', sub: '10 Apr 2026', dead: '20 Apr 2026 (Awarded)', deadCol: 'text-white', badge: 'Won 🏆', bg: 'bg-[rgba(29,158,117,0.12)] text-[#4DDDB0]', step: 4, match: '91% match', docs: '5', awarded: true },
        { t: 'IT Equipment Supply — District Collectorate Varanasi', r: 'UP/IT/2026/0301 · IT Dept · Varanasi', v: '₹41 L', sub: '5 Apr 2026', dead: '15 Apr 2026 (Closed)', deadCol: 'text-white', badge: 'Not Selected', bg: 'bg-[rgba(226,75,74,0.12)] text-[#F08080]', step: 3, match: '62% match', docs: '3', lost: true }
      ].map((b,i) => (
        <div key={i} className={`bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-2xl p-5 mb-3 transition-colors hover:border-[rgba(255,255,255,0.13)] ${b.lost ? 'opacity-70' : ''}`}>
          <div className="flex items-start justify-between gap-3 mb-3.5">
            <div>
              <div className="font-syne text-[15px] font-bold mb-1 leading-snug text-white">{b.t}</div>
              <div className="text-[12px] text-[#8896B3]">{b.r}</div>
            </div>
            <div className="text-right">
              <div className="font-syne text-[20px] font-extrabold text-white leading-none mb-1">{b.v}</div>
              <div className="text-[11px] text-[#8896B3]">Your Quote</div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap mb-3.5 items-center">
            <div className="text-[12px] text-[#8896B3]">📅 Submitted: <strong className="text-white font-medium">{b.sub}</strong></div>
            <div className="text-[12px] text-[#8896B3]">🕐 {b.awarded ? 'Awarded:' : b.lost ? 'Closed:' : 'Deadline:'} <strong className={`${b.deadCol} font-medium`}>{b.dead}</strong></div>
            <div className="text-[12px] text-[#8896B3]">📎 <strong className="text-white font-medium">{b.docs}</strong> docs</div>
            <div className="text-[12px] text-[#8896B3]">★ <strong className={`${b.awarded||b.match.includes('9')?'text-[#4DDDB0]':'text-[#FFD07A]'} font-medium`}>{b.match}</strong></div>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${b.bg}`}>
              <div className="w-1 h-1 rounded-full bg-current"></div>{b.badge}
            </span>
          </div>
          
          <div className="flex items-center pt-3.5 border-t border-[rgba(255,255,255,0.07)]">
            {[ 'Submitted', 'Received', 'Under Review', 'Decision', 'Award' ].map((step, idx) => {
              let status = 'idle';
              if (b.awarded && idx === 4) status = 'awarded';
              else if (b.lost && idx === 3) status = 'lost';
              else if (b.lost && idx === 4) status = 'idle';
              else if (idx < b.step) status = 'done';
              else if (idx === b.step) status = 'cur';
              
              const isLast = idx === 4;
              
              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      status === 'done' ? 'bg-[#4DDDB0]' : 
                      status === 'cur' ? 'bg-[#1A6BFF] ring-[3px] ring-[rgba(26,107,255,0.2)]' : 
                      status === 'awarded' ? 'bg-[#FFD07A]' :
                      status === 'lost' ? 'bg-[#F08080]' :
                      'bg-white/10'
                    }`}></div>
                    <div className={`text-[10px] text-center whitespace-nowrap ${
                      status === 'done' ? 'text-[#4DDDB0]' : 
                      status === 'cur' ? 'text-[#4D90FF]' : 
                      status === 'awarded' ? 'text-[#FFD07A]' :
                      status === 'lost' ? 'text-[#F08080]' :
                      'text-[#8896B3]'
                    }`}>{status === 'lost' && idx === 3 ? 'Not Selected' : step}</div>
                  </div>
                  {!isLast && (
                    <div className={`flex-1 h-[1px] mb-3.5 ${
                      (idx < b.step && !b.lost) || (b.lost && idx < 2) || (b.awarded && idx < 4) ? 'bg-[#4DDDB0]' : 
                      (b.lost && idx === 2) ? 'bg-[#F08080]' :
                      'bg-[rgba(255,255,255,0.07)]'
                    }`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="animate-fade-in-up">
      <div className="bg-gradient-to-br from-[#0F1E4A] to-[#0A1730] border border-[rgba(26,107,255,0.2)] rounded-2xl p-7 mb-6 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
        <div className="w-[72px] h-[72px] rounded-2xl bg-[rgba(29,158,117,0.12)] border-2 border-[rgba(29,158,117,0.4)] flex items-center justify-center font-syne text-[26px] font-extrabold text-[#4DDDB0] shrink-0">
          SC
        </div>
        <div className="flex-1">
          <div className="font-syne text-[22px] font-extrabold mb-1 text-white">Sharma Constructions Pvt Ltd</div>
          <div className="text-[14px] text-[#8896B3] mb-2.5">Managed by Rishabh Singh · Lucknow, Uttar Pradesh</div>
          <div className="flex justify-center md:justify-start gap-2 flex-wrap">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(26,107,255,0.12)] text-[#4D90FF] border border-[rgba(26,107,255,0.25)]">Infrastructure</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(26,107,255,0.12)] text-[#4D90FF] border border-[rgba(26,107,255,0.25)]">Civil Works</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(29,158,117,0.12)] text-[#4DDDB0] border border-[rgba(29,158,117,0.25)]">GST Verified ✓</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(245,166,35,0.12)] text-[#FFD07A] border border-[rgba(245,166,35,0.25)]">64% Win Rate</span>
          </div>
        </div>
        <div className="flex gap-7 shrink-0 md:ml-auto mt-2 md:mt-0">
          <div className="text-center"><div className="font-syne text-[24px] font-extrabold text-[#4DDDB0]">18</div><div className="text-[11px] text-[#8896B3] mt-0.5">Bids Won</div></div>
          <div className="text-center"><div className="font-syne text-[24px] font-extrabold text-white">₹14Cr</div><div className="text-[11px] text-[#8896B3] mt-0.5">Contract Value</div></div>
          <div className="text-center"><div className="font-syne text-[24px] font-extrabold text-[#4D90FF]">96%</div><div className="text-[11px] text-[#8896B3] mt-0.5">Top AI Score</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5">
        <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6">
          <h3 className="font-syne text-[15px] font-bold text-white mb-4.5 pb-3 border-b border-[rgba(255,255,255,0.07)]">Company Information</h3>
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            <div className="col-span-2 flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Company Name</label><input type="text" defaultValue="Sharma Constructions Pvt Ltd" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" /></div>
            <div className="flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">GST Number</label><input type="text" defaultValue="09AAPCS1234F1Z5" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" /></div>
            <div className="flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">PAN Number</label><input type="text" defaultValue="AAPCS1234F" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" /></div>
            <div className="flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">City</label><input type="text" defaultValue="Lucknow" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" /></div>
            <div className="flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">State</label><select className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]"><option>Uttar Pradesh</option><option>Delhi</option></select></div>
            <div className="flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Annual Turnover</label><input type="text" defaultValue="₹5.2 Cr" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" /></div>
            <div className="flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Years in Business</label><input type="text" defaultValue="12 years" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)]" /></div>
            <div className="col-span-2 flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Company Description</label><textarea defaultValue="Leading infrastructure contractor with 12+ years experience in road construction, water pipelines, and civil engineering across UP." className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF] focus:bg-[rgba(26,107,255,0.06)] min-h-[70px] resize-y" /></div>
          </div>
          <button className="w-full py-2.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-lg text-[14px] font-medium transition-colors">Save Company Info</button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6">
            <h3 className="font-syne text-[15px] font-bold text-white mb-4.5 pb-3 border-b border-[rgba(255,255,255,0.07)]">Contact Person</h3>
            <div className="grid grid-cols-2 gap-3.5 mb-4">
              <div className="flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">First Name</label><input type="text" defaultValue="Rishabh" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF]" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Last Name</label><input type="text" defaultValue="Singh" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF]" /></div>
              <div className="col-span-2 flex flex-col gap-1.5"><label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Email</label><input type="text" defaultValue="rishabh@sharmaconst.in" className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF]" /></div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <label className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Mobile</label>
                <div className="flex gap-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] whitespace-nowrap">🇮🇳 +91</div>
                  <input type="text" defaultValue="98765 43210" className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-[14px] outline-none focus:border-[#1A6BFF]" />
                </div>
              </div>
            </div>
            <button className="w-full py-2.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-lg text-[14px] font-medium transition-colors">Save Contact Info</button>
          </div>

          <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6">
            <h3 className="font-syne text-[15px] font-bold text-white mb-2 pb-3 border-b border-[rgba(255,255,255,0.07)]">Expertise & Categories</h3>
            <div className="text-[12px] text-[#8896B3] mb-3">These power your AI tender recommendations</div>
            <div className="flex flex-wrap gap-2">
              {['Infrastructure ✓', 'Civil Works ✓', 'Maintenance ✓'].map(t => <span key={t} className="bg-[rgba(26,107,255,0.12)] border border-[rgba(26,107,255,0.3)] text-[#4D90FF] text-[12px] font-medium px-3 py-1 rounded-full">{t}</span>)}
              {['IT & Equipment', 'Consulting', 'Services'].map(t => <span key={t} className="bg-white/5 border border-[rgba(255,255,255,0.13)] text-[#8896B3] text-[12px] font-medium px-3 py-1 rounded-full">{t}</span>)}
              <span className="border border-dashed border-[rgba(255,255,255,0.13)] text-[#4D90FF] text-[12px] font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-white/5">+ Add Category</span>
            </div>
          </div>

          <div className="bg-[#0F1729] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6">
            <h3 className="font-syne text-[15px] font-bold text-white mb-3 pb-3 border-b border-[rgba(255,255,255,0.07)]">Notification Preferences</h3>
            <div className="flex flex-col gap-0">
              {[
                { l: 'New Tender Alerts', s: 'Notify when matching tenders post', on: true },
                { l: 'Deadline Reminders', s: '48hr & 24hr before close', on: true },
                { l: 'Bid Status Updates', s: 'Approved / rejected alerts', on: true },
                { l: 'Weekly Summary Email', s: 'Every Monday morning', on: false }
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.07)] last:border-0">
                  <div><div className="text-[13px] text-white">{t.l}</div><div className="text-[11px] text-[#8896B3] mt-0.5">{t.s}</div></div>
                  <Toggle defaultOn={t.on} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0A0F1E] text-[#F0F4FF] font-sans">
      {/* Sidebar */}
      <aside className="w-[240px] min-w-[240px] bg-[#0F1729] border-r border-[rgba(255,255,255,0.07)] flex flex-col fixed top-0 left-0 h-screen overflow-y-auto z-50">
        <div className="px-5 pt-6 pb-5 border-b border-[rgba(255,255,255,0.07)] font-syne text-[20px] font-extrabold flex items-center">
          Bid<span className="text-[#1A6BFF]">Smart</span>
          <sup className="text-[8px] bg-[#F5A623] text-[#0A0F1E] px-1.5 py-[1px] rounded-[3px] font-bold ml-1 align-super">AI</sup>
        </div>
        
        <div className="mx-4 my-3 px-3 py-2 bg-[rgba(29,158,117,0.12)] border border-[rgba(29,158,117,0.25)] rounded-lg text-[11px] font-semibold text-[#4DDDB0] uppercase tracking-wide flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#4DDDB0] rounded-full"></div>
          Vendor Portal
        </div>

        <div className="px-4 py-2 mt-2 text-[10px] font-semibold text-[#5A6785] uppercase tracking-wider">Main</div>
        <NavItem id="dashboard" icon="🏠" label="Dashboard" />
        <NavItem id="browse" icon="🔍" label="Browse Tenders" badge="38" />

        <div className="px-4 py-2 mt-2 text-[10px] font-semibold text-[#5A6785] uppercase tracking-wider">Bidding</div>
        <NavItem id="submit" icon="📤" label="Submit a Bid" />
        <NavItem id="mybids" icon="📋" label="My Bids" badge="3" badgeColor="gold" />

        <div className="px-4 py-2 mt-2 text-[10px] font-semibold text-[#5A6785] uppercase tracking-wider">Account</div>
        <NavItem id="profile" icon="👤" label="Profile & Settings" />

        <div className="mt-auto p-4 border-t border-[rgba(255,255,255,0.07)]">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-full bg-[rgba(29,158,117,0.12)] border border-[rgba(29,158,117,0.3)] flex items-center justify-center font-syne text-[13px] font-bold text-[#4DDDB0] shrink-0">SC</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-white truncate">Rishabh Singh</div>
              <div className="text-[11px] text-[#8896B3]">Sharma Constructions</div>
            </div>
            <button onClick={onLogout} className="text-[#8896B3] hover:text-[#E24B4A] text-[16px] p-1 rounded-md transition-colors">⏻</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-[240px] flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <div className="sticky top-0 z-40 bg-[rgba(10,15,30,0.92)] backdrop-blur-md border-b border-[rgba(255,255,255,0.07)] px-8 h-[60px] flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <div className="font-syne text-[17px] font-bold tracking-tight">{pages[activePage]?.title}</div>
            <div className="text-[11px] text-[#8896B3]">BidSmart Vendor → {pages[activePage]?.crumb}</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-[16px] hover:bg-white/5 transition-colors relative">
              🔔<span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-[#F5A623] rounded-full border-[1.5px] border-[#0A0F1E]"></span>
            </button>
            <button className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-[16px] hover:bg-white/5 transition-colors">
              ❓
            </button>
            <button onClick={() => setActivePage('browse')} className="px-4 py-2 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-lg text-[13px] font-medium transition-colors flex items-center gap-1.5">
              🔍 Browse Tenders
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-7 px-8 flex-1">
          {activePage === 'dashboard' && renderDashboard()}
          {activePage === 'browse' && renderBrowse()}
          {activePage === 'submit' && renderSubmit()}
          {activePage === 'mybids' && renderMyBids()}
          {activePage === 'profile' && renderProfile()}
        </div>
      </div>
    </div>
  );
}
