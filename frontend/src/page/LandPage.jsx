import React from 'react';
import { 
  BrainCircuit, Bell, BarChart, ShieldCheck,
  SearchX, Clock, LayoutList,
  ChevronRight, Play
} from 'lucide-react';

const Navbar = ({ onNavigate }) => (
  <nav className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto border-b border-white/5">
    <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-1">
      Bid<span className="text-electric-blue">Smart</span>
    </div>
    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
      <a href="#features" className="hover:text-white transition-colors">Features</a>
      <a href="#tenders" className="hover:text-white transition-colors">Browse Tenders</a>
      <a href="#vendors" className="hover:text-white transition-colors">For Vendors</a>
      <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
    </div>
    <div className="flex items-center space-x-4">
      <button onClick={() => onNavigate('login')} className="text-sm font-medium hover:text-white transition-colors">Log In</button>
      <button onClick={() => onNavigate('register')} className="bg-electric-blue hover:bg-electric-blue-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(0,82,255,0.4)] transition-all">
        Register Free
      </button>
    </div>
  </nav>
);

const Hero = ({ onNavigate }) => (
  <section className="text-center pt-24 pb-20 px-4 max-w-5xl mx-auto">
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-wider mb-8">
      <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
      AI-Powered E-Tender Platform for India
    </div>
    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
      Find the Right Tenders.<br/>
      Bid with <span className="text-electric-blue relative inline-block">
        Intelligence
        <div className="absolute inset-x-0 bottom-1/4 h-3 bg-electric-blue/20 blur-sm -z-10"></div>
      </span>.<br/>
      Win with <span className="text-amber-500">Confidence.</span>
    </h1>
    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
      BidSmart cuts through thousands of daily government tenders to surface only the ones that match your business—powered by AI recommendations, real-time alerts, and seamless bid submission.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <button onClick={() => onNavigate('register')} className="w-full sm:w-auto bg-electric-blue hover:bg-electric-blue-hover text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,82,255,0.4)] transition-all transform hover:-translate-y-0.5">
        Start for Free <ChevronRight size={20} />
      </button>
      <button className="w-full sm:w-auto bg-transparent hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
        <Play size={18} /> Browse Live Tenders
      </button>
    </div>
  </section>
);

const Stats = () => (
  <section className="border-y border-white/5 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-white/10">
        <div className="flex flex-col">
          <span className="text-4xl font-black text-white mb-2">12K+</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Tenders</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-black text-white mb-2">4K+</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Registered Vendors</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-black text-white mb-2">28+</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">States Covered</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-black text-white mb-2">94%</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Match Accuracy</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-black text-white mb-2">15<span className="text-2xl">min</span></span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Alert Frequency</span>
        </div>
      </div>
    </div>
  </section>
);

const Problems = () => (
  <section className="py-24 px-4 max-w-7xl mx-auto">
    <div className="mb-16">
      <p className="text-electric-blue text-sm font-bold tracking-wider uppercase mb-2">The Problem</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Why vendors miss tenders — and lose crores</h2>
      <p className="text-slate-400 text-lg max-w-2xl">India's existing e-tender portals are built for bureaucracy, not businesses. The result? Missed opportunities every single day.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { title: "Impossible Discovery", desc: "Thousands of tenders across dozens of portals with no smart filtering, no relevance ranking, no way to find what actually matters to your business.", icon: <SearchX size={32} className="text-slate-400" /> },
        { title: "Missed Deadlines", desc: "Critical tender deadlines slip by with no proactive alerts. By the time you find a relevant tender, the bid window has already closed.", icon: <Clock size={32} className="text-slate-400" /> },
        { title: "Complex Interfaces", desc: "Old government portals have outdated UI that confuses first-time vendors and even experienced contractors, making the entire process painful.", icon: <LayoutList size={32} className="text-slate-400" /> }
      ].map((item, i) => (
        <div key={i} className="bg-dark-card border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-colors">
          <div className="mb-6">{item.icon}</div>
          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
    <div className="mb-16">
      <p className="text-amber-500 text-sm font-bold tracking-wider uppercase mb-2">What BidSmart Offers</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything a vendor needs.<br/>Nothing they don't.</h2>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { title: "AI-Powered Matching", tag: "CORE AI FEATURE", desc: "Our recommendation engine analyzes your company profile, category, location, expertise, and past bids to serve tenders with the highest win probability first.", icon: <BrainCircuit size={28} className="text-electric-blue" /> },
        { title: "Real-Time Alerts", tag: "LIVE ALERTS", desc: "New tenders matching your profile trigger instant notifications via email and in-app bell. Never miss a deadline with automated countdown reminders.", icon: <Bell size={28} className="text-electric-blue" /> },
        { title: "Vendor Analytics Dashboard", tag: "INSIGHTS", desc: "Track bid history, success rates, and competitor trends. Visual charts give you data to make smarter bidding decisions over time.", icon: <BarChart size={28} className="text-electric-blue" /> },
        { title: "Secure Bid Submission", tag: "BANK-GRADE SECURITY", desc: "Submit bids with confidence. 2FA authentication, end-to-end encryption, document validation, and deadline-locked submissions keep every bid safe and audit-ready.", icon: <ShieldCheck size={28} className="text-electric-blue" /> }
      ].map((item, i) => (
        <div key={i} className="group bg-dark-card border border-white/5 rounded-2xl p-8 hover:border-electric-blue/30 transition-all relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="bg-electric-blue/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-electric-blue/20">
            {item.icon}
          </div>
          <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
          <p className="text-slate-400 mb-6 leading-relaxed">{item.desc}</p>
          <div className="inline-block px-3 py-1 rounded border border-white/10 text-xs font-bold tracking-wider text-slate-300">
            {item.tag}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
    <div className="mb-20">
      <p className="text-amber-500 text-sm font-bold tracking-wider uppercase mb-2">How It Works</p>
      <h2 className="text-4xl md:text-5xl font-bold">From signup to winning bid — in 4 steps</h2>
    </div>
    <div className="grid md:grid-cols-4 gap-8 relative">
      <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-white/10 -z-10"></div>
      {[
        { step: 1, title: "Create Your Profile", desc: "Register with company details, GST, PAN, and expertise categories. This powers the AI engine." },
        { step: 2, title: "Get Matched", desc: "AI scans live tenders and surfaces top matches on your dashboard updated every 15 minutes." },
        { step: 3, title: "Submit Your Bid", desc: "Upload documents, set your quoted amount, and submit securely before the deadline." },
        { step: 4, title: "Track & Win", desc: "Monitor bid status, get award notifications, and use analytics to improve future bids." }
      ].map((item) => (
        <div key={item.step} className="text-center">
          <div className="w-20 h-20 mx-auto bg-dark-navy border-2 border-electric-blue text-electric-blue rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-[0_0_20px_rgba(0,82,255,0.2)]">
            {item.step}
          </div>
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-slate-400 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const CTA = ({ onNavigate }) => (
  <section className="py-20 px-4 max-w-5xl mx-auto">
    <div className="bg-gradient-to-br from-[#0c1631] to-[#12214a] border border-blue-900/50 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-blue/20 via-transparent to-transparent opacity-50"></div>
      <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">
        Stop Losing Tenders to Complexity.<br/>Start Winning with BidSmart.
      </h2>
      <p className="text-blue-100/80 mb-10 pb-0 relative z-10 text-lg md:text-xl">
        Join thousands of vendors already using AI to discover and win government contracts.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        <button onClick={() => onNavigate('register')} className="bg-electric-blue hover:bg-electric-blue-hover text-white px-8 py-4 rounded-xl font-semibold shadow-[0_0_20px_rgba(0,82,255,0.6)] transition-all">
          Register Free — No Credit Card
        </button>
        <button className="bg-transparent hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all">
          See Live Demo
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 py-12 text-sm text-slate-500">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-xl font-black text-white flex items-center gap-1">
        Bid<span className="text-electric-blue">Smart</span>
      </div>
      <div className="flex gap-8">
        <a href="#" className="hover:text-white transition-colors">About</a>
        <a href="#" className="hover:text-white transition-colors">Features</a>
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
      <div>
        &copy; {new Date().getFullYear()} BidSmart. Built for Indian Vendors.
      </div>
    </div>
  </footer>
);

export default function LandPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-dark-navy text-slate-300 font-sans selection:bg-electric-blue selection:text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-electric-blue/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none"></div>
      
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <Stats />
      <Problems />
      <Features />
      <HowItWorks />
      <CTA onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}
