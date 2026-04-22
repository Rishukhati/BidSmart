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

export default function AdminDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('overview');

  const pages = {
    overview:  { title: 'Overview',     crumb: 'Dashboard' },
    post:      { title: 'Post New Tender', crumb: 'Tenders → Post New' },
    tenders:   { title: 'All Tenders',  crumb: 'Tenders → All' },
    bids:      { title: 'Review Bids',  crumb: 'Bids → Review' },
    vendors:   { title: 'Vendors',      crumb: 'Vendors → All' },
    reports:   { title: 'Reports',      crumb: 'Analytics → Reports' },
    settings:  { title: 'Settings',     crumb: 'System → Settings' },
  };

  const NavItem = ({ id, icon, label, badge }) => {
    const isActive = activePage === id;
    return (
      <div 
        onClick={() => setActivePage(id)}
        className={`flex items-center gap-2.5 py-2.5 px-4 mx-2 rounded-lg cursor-pointer text-[13px] font-medium transition-colors relative ${isActive ? 'bg-[#1A6BFF]/10 text-white' : 'text-[#8896B3] hover:bg-white/5 hover:text-white'}`}
      >
        {isActive && <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-[#1A6BFF] rounded-r-sm"></div>}
        <span className="text-[16px] w-5 text-center shrink-0">{icon}</span>
        <span>{label}</span>
        {badge && <span className="ml-auto bg-[#E24B4A] text-white text-[10px] font-bold px-1.5 py-px rounded-full">{badge}</span>}
      </div>
    );
  };

  const current = pages[activePage] || pages.overview;

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F0F4FF] font-sans flex text-[14px]">
      
      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside className="w-[240px] min-w-[240px] bg-[#0F1729] border-r border-white/10 flex flex-col fixed top-0 left-0 h-screen overflow-y-auto z-50">
        <div className="pt-6 px-5 pb-5 border-b border-white/10 font-black tracking-tighter text-xl shrink-0 font-['Syne']">
          Bid<span className="text-[#1A6BFF]">Smart</span><sup className="text-[8px] bg-[#F5A623] text-[#0A0F1E] px-1 py-0.5 rounded font-bold ml-0.5 align-super">AI</sup>
        </div>
        <div className="mx-4 my-3 px-3 py-2 bg-[#1A6BFF]/10 border border-[#1A6BFF]/20 rounded-lg text-[11px] font-semibold text-[#4D90FF] uppercase tracking-wider flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#1A6BFF] rounded-full"></div>
          Admin Panel
        </div>

        <div className="px-4 pt-2 pb-1 text-[10px] font-semibold text-[#5A6785] uppercase tracking-[1.2px] mt-2">Main</div>
        <NavItem id="overview" icon="📊" label="Overview" />
        <NavItem id="post" icon="➕" label="Post New Tender" />

        <div className="px-4 pt-2 pb-1 text-[10px] font-semibold text-[#5A6785] uppercase tracking-[1.2px] mt-2">Manage</div>
        <NavItem id="tenders" icon="📋" label="All Tenders" />
        <NavItem id="bids" icon="📥" label="Review Bids" badge="6" />
        <NavItem id="vendors" icon="🏢" label="Vendors" />

        <div className="px-4 pt-2 pb-1 text-[10px] font-semibold text-[#5A6785] uppercase tracking-[1.2px] mt-2">System</div>
        <NavItem id="reports" icon="📈" label="Reports" />
        <NavItem id="settings" icon="⚙️" label="Settings" />

        <div className="mt-auto p-4 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-full bg-[#1A6BFF]/10 border border-[#1A6BFF]/30 flex items-center justify-center font-['Syne'] text-[13px] font-bold text-[#4D90FF] shrink-0">
              RS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-white whitespace-nowrap overflow-hidden text-ellipsis">Rishabh Singh</div>
              <div className="text-[11px] text-[#8896B3]">Super Admin</div>
            </div>
            <button onClick={onLogout} className="text-[#8896B3] hover:text-[#E24B4A] text-lg p-1 rounded transition-colors" title="Logout">
              ⏻
            </button>
          </div>
        </div>
      </aside>

      {/* ═══════════ MAIN ═══════════ */}
      <div className="ml-[240px] flex-1 flex flex-col min-h-screen relative">
        
        {/* TOPBAR */}
        <div className="sticky top-0 z-40 bg-[#0A0F1E]/90 backdrop-blur-md border-b border-white/10 px-8 h-[60px] flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <div className="font-['Syne'] text-[17px] font-bold tracking-tight">{current.title}</div>
            <div className="text-[11px] text-[#8896B3]">BidSmart Admin → {current.crumb}</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-[16px] transition-colors relative cursor-pointer">
              🔔<span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-[#E24B4A] rounded-full border-[1.5px] border-[#0A0F1E]"></span>
            </button>
            <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-[16px] transition-colors cursor-pointer">
              ❓
            </button>
            <button onClick={() => setActivePage('post')} className="py-2 px-4 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white border-none rounded-lg font-sans text-[13px] font-medium cursor-pointer transition-all hover:-translate-y-0.5 flex items-center gap-1.5">
              <span>＋</span> Post Tender
            </button>
          </div>
        </div>

        <div className="p-7 md:p-8 flex-1">
          
          {/* ══════ PAGE: OVERVIEW ══════ */}
          {activePage === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="grid grid-cols-4 gap-4 mb-7">
                <div className="bg-[#0F1729] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Total Tenders</div>
                    <div className="w-9 h-9 rounded-lg bg-[#1A6BFF]/10 flex items-center justify-center text-[17px]">📋</div>
                  </div>
                  <div className="font-['Syne'] text-[28px] font-extrabold tracking-tight leading-none">142</div>
                  <div className="text-[12px] mt-1.5 text-[#1D9E75]">↑ 12 this month</div>
                </div>
                <div className="bg-[#0F1729] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Active Tenders</div>
                    <div className="w-9 h-9 rounded-lg bg-[#1D9E75]/10 flex items-center justify-center text-[17px]">✅</div>
                  </div>
                  <div className="font-['Syne'] text-[28px] font-extrabold tracking-tight leading-none">38</div>
                  <div className="text-[12px] mt-1.5 text-[#1D9E75]">↑ 5 since last week</div>
                </div>
                <div className="bg-[#0F1729] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Bids Received</div>
                    <div className="w-9 h-9 rounded-lg bg-[#F5A623]/10 flex items-center justify-center text-[17px]">📥</div>
                  </div>
                  <div className="font-['Syne'] text-[28px] font-extrabold tracking-tight leading-none">614</div>
                  <div className="text-[12px] mt-1.5 text-[#1D9E75]">↑ 48 new bids</div>
                </div>
                <div className="bg-[#0F1729] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="text-[12px] text-[#8896B3] font-medium uppercase tracking-wide">Registered Vendors</div>
                    <div className="w-9 h-9 rounded-lg bg-[#F5A623]/10 flex items-center justify-center text-[17px]">🏢</div>
                  </div>
                  <div className="font-['Syne'] text-[28px] font-extrabold tracking-tight leading-none">4,218</div>
                  <div className="text-[12px] mt-1.5 text-[#1D9E75]">↑ 103 this month</div>
                </div>
              </div>

              <div className="grid grid-cols-[1.6fr_1fr] gap-5">
                {/* Activity Feed */}
                <div className="bg-[#0F1729] border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-['Syne'] text-[17px] font-bold">Recent Activity</div>
                      <div className="text-[12px] text-[#8896B3] mt-0.5">Live platform events</div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {[
                      { c: '#4DDDB0', t: <><strong className="text-white font-medium">Sharma Constructions Pvt Ltd</strong> submitted a bid on Road Repair — UP NH-24</>, time: '2 min ago' },
                      { c: '#4D90FF', t: <>New tender published: <strong className="text-white font-medium">Water Pipeline — Lucknow East Zone</strong></>, time: '18 min ago' },
                      { c: '#FFD07A', t: <><strong className="text-white font-medium">Rajesh Infra Ltd</strong> was awarded the Solar Panel Installation tender</>, time: '1 hr ago' },
                      { c: '#4DDDB0', t: <><strong className="text-white font-medium">TechBuild Solutions</strong> registered as a new vendor</>, time: '2 hr ago' },
                      { c: '#F08080', t: <>Tender <strong className="text-white font-medium">School Building — Varanasi Block C</strong> deadline passed — 12 bids received</>, time: '5 hr ago' },
                      { c: '#4D90FF', t: <>New tender published: <strong className="text-white font-medium">IT Equipment Supply — District Collectorate</strong></>, time: 'Yesterday' }
                    ].map((act, i) => (
                      <div key={i} className="flex items-start gap-3 py-3 border-b border-white/10 last:border-0">
                        <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: act.c }}></div>
                        <div className="flex-1 text-[13px] text-[#8896B3] leading-relaxed">{act.t}</div>
                        <div className="text-[11px] text-[#5A6785] whitespace-nowrap mt-1">{act.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-[#0F1729] border border-white/10 rounded-xl p-6">
                  <div className="font-['Syne'] text-[17px] font-bold mb-5">Tenders by Category</div>
                  <svg viewBox="0 0 160 160" width="140" className="block mx-auto mb-5">
                    <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(26,107,255,0.8)" strokeWidth="22" strokeDasharray="188 189" strokeDashoffset="0" transform="rotate(-90 80 80)"/>
                    <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(245,166,35,0.8)" strokeWidth="22" strokeDasharray="94 283" strokeDashoffset="-188" transform="rotate(-90 80 80)"/>
                    <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(29,158,117,0.8)" strokeWidth="22" strokeDasharray="56 321" strokeDashoffset="-282" transform="rotate(-90 80 80)"/>
                    <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(226,75,74,0.7)" strokeWidth="22" strokeDasharray="40 337" strokeDashoffset="-338" transform="rotate(-90 80 80)"/>
                    <text x="80" y="76" textAnchor="middle" fill="#F0F4FF" fontFamily="Syne,sans-serif" fontSize="20" fontWeight="800">142</text>
                    <text x="80" y="92" textAnchor="middle" fill="#8896B3" fontFamily="DM Sans,sans-serif" fontSize="9">tenders</text>
                  </svg>
                  <div className="flex flex-col gap-2 w-full">
                    {[
                      { l: 'Infrastructure', c: 'rgba(26,107,255,0.8)', v: '50%' },
                      { l: 'IT & Equipment', c: 'rgba(245,166,35,0.8)', v: '25%' },
                      { l: 'Services', c: 'rgba(29,158,117,0.8)', v: '15%' },
                      { l: 'Others', c: 'rgba(226,75,74,0.7)', v: '10%' }
                    ].map((lg, i) => (
                      <div key={i} className="flex items-center justify-between text-[13px]">
                        <div className="flex items-center text-[#8896B3]">
                          <div className="w-2.5 h-2.5 rounded-full mr-2 shrink-0" style={{ background: lg.c }}></div>
                          {lg.l}
                        </div>
                        <div className="font-semibold text-white">{lg.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════ PAGE: POST TENDER ══════ */}
          {activePage === 'post' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-[860px]">
              
              <div className="mb-6">
                <div className="font-['Syne'] text-[14px] font-bold text-white mb-4 pb-2.5 border-b border-white/10 flex items-center gap-2">
                  <span className="text-[16px]">📋</span> Basic Information
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Tender Title *</label>
                    <input type="text" className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors placeholder-white/40" placeholder="e.g. Construction of Road from Gomti Nagar to Hazratganj — Phase 2" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Reference Number *</label>
                    <input type="text" className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors placeholder-white/40" placeholder="e.g. UP/PWD/2026/0412" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Department *</label>
                    <select className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors cursor-pointer appearance-none">
                      <option value="" className="bg-[#0F1729] text-white">Select Department</option>
                      <option className="bg-[#0F1729] text-white">Public Works Department (PWD)</option>
                      <option className="bg-[#0F1729] text-white">Municipal Corporation</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Category *</label>
                    <select className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors cursor-pointer appearance-none">
                      <option value="" className="bg-[#0F1729] text-white">Select Category</option>
                      <option className="bg-[#0F1729] text-white">Infrastructure / Construction</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Location / District *</label>
                    <input type="text" className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors placeholder-white/40" placeholder="e.g. Lucknow, Uttar Pradesh" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="font-['Syne'] text-[14px] font-bold text-white mb-4 pb-2.5 border-b border-white/10 flex items-center gap-2">
                  <span className="text-[16px]">📝</span> Tender Description
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Scope of Work *</label>
                    <textarea className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors placeholder-white/40 min-h-[120px] resize-y" placeholder="Describe the complete scope of work..."></textarea>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="font-['Syne'] text-[14px] font-bold text-white mb-4 pb-2.5 border-b border-white/10 flex items-center gap-2">
                  <span className="text-[16px]">📅</span> Dates & Deadlines
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Publish Date *</label>
                    <input type="date" className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Submission Deadline *</label>
                    <input type="date" className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Status</label>
                    <select className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3.5 text-white text-[14px] focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-colors cursor-pointer appearance-none">
                      <option value="draft" className="bg-[#0F1729] text-white">Save as Draft</option>
                      <option value="active" className="bg-[#0F1729] text-white">Publish as Active</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-white/10">
                <button className="py-2.5 px-7 bg-[#151E35] border border-white/10 hover:bg-white/5 text-[#8896B3] hover:text-white rounded-lg text-[14px] font-medium transition-colors">
                  💾 Save as Draft
                </button>
                <button onClick={() => {alert('Tender published!'); setActivePage('overview');}} className="py-2.5 px-7 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-lg text-[14px] font-medium transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                  🚀 Publish Tender
                </button>
              </div>
            </div>
          )}

          {/* ══════ PAGE: ALL TENDERS ══════ */}
          {activePage === 'tenders' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px]">🔍</span>
                  <input type="text" placeholder="Search tenders..." className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-[13px] text-white focus:outline-none focus:border-[#1A6BFF] transition-colors" />
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-3.5 text-[13px] text-white cursor-pointer focus:outline-none focus:border-[#1A6BFF] transition-colors appearance-none">
                  <option className="bg-[#0F1729] text-white">All Status</option>
                  <option className="bg-[#0F1729] text-white">Active</option>
                </select>
                <button onClick={() => setActivePage('post')} className="py-2 px-4 bg-[#1A6BFF] text-white rounded-lg text-[13px] font-medium hover:bg-[#4D90FF] transition-colors">
                  ＋ Post New
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse bg-[#0F1729] text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 text-[11px] font-semibold text-[#8896B3] uppercase tracking-wide whitespace-nowrap">Tender Title</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-[#8896B3] uppercase tracking-wide whitespace-nowrap">Ref No.</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-[#8896B3] uppercase tracking-wide whitespace-nowrap">Status</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-[#8896B3] uppercase tracking-wide whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-[13px] text-white align-middle">
                        <div className="font-medium">Road Construction — NH-24 Gomti Nagar</div>
                        <div className="text-[#8896B3] text-[11px] mt-0.5">PWD · Lucknow</div>
                      </td>
                      <td className="py-3 px-4 text-[13px] text-[#8896B3] align-middle">UP/PWD/2026/0412</td>
                      <td className="py-3 px-4 align-middle">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#1D9E75]/10 text-[#4DDDB0] rounded-full text-[11px] font-semibold"><span className="w-1 h-1 rounded-full bg-[#4DDDB0]"></span>Active</span>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <div className="flex gap-1.5">
                          <button onClick={() => setActivePage('bids')} className="py-1 px-3 border border-[#1A6BFF] bg-[#1A6BFF]/10 text-[#4D90FF] rounded-md text-[12px] font-medium hover:bg-[#1A6BFF] hover:text-white transition-colors">Bids</button>
                          <button className="py-1 px-3 border border-white/10 bg-transparent text-[#8896B3] rounded-md text-[12px] font-medium hover:bg-white/5 hover:text-white transition-colors">Edit</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════ PAGE: REVIEW BIDS ══════ */}
          {activePage === 'bids' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex gap-2.5 mb-4 flex-wrap items-center">
                <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-3.5 text-[13px] text-white cursor-pointer min-w-[260px] appearance-none">
                  <option className="bg-[#0F1729]">Road Construction — NH-24 Gomti Nagar</option>
                </select>
                <div className="ml-auto text-[13px] text-[#8896B3]">14 bids · ₹2.5 Cr estimated</div>
              </div>

              {[1, 2].map(i => (
                <div key={i} className="bg-[#0F1729] border border-white/10 rounded-xl p-5 mb-3 flex items-center gap-4 hover:border-white/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#1A6BFF]/10 border border-[#1A6BFF]/20 flex items-center justify-center font-['Syne'] text-[14px] font-bold text-[#4D90FF] shrink-0">SC</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-white">Sharma Constructions Pvt Ltd</div>
                    <div className="text-[12px] text-[#8896B3] mt-0.5">GST: 09AAPCS1234F1Z5 · Lucknow · Submitted 22 Apr 2026, 10:42 AM</div>
                    <div className="mt-2 flex gap-2 flex-wrap items-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#1A6BFF]/10 text-[#4D90FF] rounded-full text-[11px] font-semibold"><span className="w-1 h-1 rounded-full bg-[#4D90FF]"></span>Under Review</span>
                      <span className="text-[12px] text-[#4DDDB0]">★ AI Match Score: 92%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['Syne'] text-[18px] font-bold text-white whitespace-nowrap">₹2.28 Cr</div>
                    <div className="text-[11px] text-[#8896B3] mt-px">Quoted Amount</div>
                  </div>
                  <div className="flex flex-col gap-1.5 ml-2">
                    <button className="py-1.5 px-4 bg-[#1D9E75]/10 border border-[#1D9E75] rounded-md text-[#4DDDB0] font-sans text-[12px] font-semibold cursor-pointer hover:bg-[#1D9E75] hover:text-white transition-all">Approve</button>
                    <button className="py-1.5 px-4 bg-[#E24B4A]/10 border border-[#E24B4A] rounded-md text-[#F08080] font-sans text-[12px] font-semibold cursor-pointer hover:bg-[#E24B4A] hover:text-white transition-all">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══════ PAGE: VENDORS ══════ */}
          {activePage === 'vendors' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex gap-2.5 mb-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px]">🔍</span>
                  <input type="text" placeholder="Search vendors..." className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-[13px] text-white focus:outline-none focus:border-[#1A6BFF]" />
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full border-collapse bg-[#0F1729] text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 text-[11px] font-semibold text-[#8896B3] uppercase tracking-wide">Vendor</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-[#8896B3] uppercase tracking-wide">GST</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-[#8896B3] uppercase tracking-wide">Location</th>
                      <th className="py-3 px-4 text-[11px] font-semibold text-[#8896B3] uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-[13px] text-white align-middle">
                        <div className="font-medium">Sharma Constructions Pvt Ltd</div>
                        <div className="text-[#8896B3] text-[11px] mt-0.5">sharma@constructions.in</div>
                      </td>
                      <td className="py-3 px-4 text-[13px] text-[#8896B3]">09AAPCS1234F1Z5</td>
                      <td className="py-3 px-4 text-[13px] text-white">Lucknow, UP</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#1D9E75]/10 text-[#4DDDB0] rounded-full text-[11px] font-semibold"><span className="w-1 h-1 rounded-full bg-[#4DDDB0]"></span>Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════ PAGE: REPORTS ══════ */}
          {activePage === 'reports' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="bg-[#0F1729] border border-white/10 rounded-xl p-16 text-center">
                <div className="text-[40px] mb-4">📈</div>
                <div className="font-['Syne'] text-[18px] font-bold mb-2 text-white">Detailed Reports</div>
                <div className="text-[14px] text-[#8896B3] max-w-md mx-auto">
                  Monthly tender activity charts, bid analytics, vendor performance reports, and export to PDF/Excel functionality can be integrated here.
                </div>
              </div>
            </div>
          )}

          {/* ══════ PAGE: SETTINGS ══════ */}
          {activePage === 'settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-[#0F1729] border border-white/10 rounded-xl p-6">
                  <h3 className="font-['Syne'] text-[15px] font-bold text-white mb-4">Notifications</h3>
                  <div className="flex items-center justify-between py-2.5 border-b border-white/10">
                    <div>
                      <div className="text-[13px] text-white">New Bid Alerts</div>
                      <div className="text-[11px] text-[#8896B3] mt-0.5">Get notified when a vendor submits a bid</div>
                    </div>
                    <Toggle defaultOn={true} />
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="text-[13px] text-white">Weekly Reports</div>
                      <div className="text-[11px] text-[#8896B3] mt-0.5">Auto-send summary every Monday</div>
                    </div>
                    <Toggle defaultOn={true} />
                  </div>
                </div>

                <div className="bg-[#0F1729] border border-white/10 rounded-xl p-6">
                  <h3 className="font-['Syne'] text-[15px] font-bold text-white mb-4">Admin Profile</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Full Name</label>
                      <input type="text" defaultValue="Rishabh Singh" className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white text-[13px] focus:outline-none focus:border-[#1A6BFF]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-[#8896B3] uppercase tracking-wide">Email</label>
                      <input type="text" defaultValue="rishabh@bidsmart.in" className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white text-[13px] focus:outline-none focus:border-[#1A6BFF]" />
                    </div>
                    <button className="py-2.5 mt-2 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-lg text-[13px] font-medium transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
