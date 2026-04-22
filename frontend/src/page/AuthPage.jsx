import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

export default function AuthPage({ initialMode = 'login', onBack, onLogin }) {
  const [mode, setMode] = useState(initialMode);
  const [loginRole, setLoginRole] = useState('vendor');
  const [regRole, setRegRole] = useState('vendor');
  const [regStep, setRegStep] = useState(1);
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegPass2, setShowRegPass2] = useState(false);
  const [password, setPassword] = useState('');

  // Password strength
  const getStrength = (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strength = getStrength(password);
  const bgCols = ['bg-white/10', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];
  const textCols = ['', 'text-red-500', 'text-amber-500', 'text-blue-500', 'text-emerald-500'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  const switchMode = (newMode) => {
    setMode(newMode);
    if (newMode === 'register') setRegStep(1);
  };

  const handleRegister = () => {
    alert('Account created! Redirecting to dashboard...');
    if (onLogin) onLogin(regRole);
    else onBack();
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F0F4FF] font-sans grid grid-cols-1 md:grid-cols-2">
      {/* Left Panel */}
      <div className="hidden md:flex bg-[#0F1729] border-r border-white/10 flex-col justify-between p-10 relative overflow-hidden min-h-screen">
        <div className="absolute -top-[120px] -left-[80px] w-[400px] h-[400px] bg-[#1A6BFF]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[100px] -right-[60px] w-[300px] h-[300px] bg-[#F5A623]/10 rounded-full blur-3xl"></div>
        
        <button onClick={onBack} className="text-2xl font-black tracking-tighter text-white flex items-center gap-1 z-10 w-fit hover:opacity-80 transition-opacity">
          Bid<span className="text-electric-blue">Smart</span><sup className="text-[9px] bg-amber-500 text-[#0A0F1E] px-1 py-0.5 rounded font-bold ml-0.5 align-super">AI</sup>
        </button>

        <div className="relative z-10 my-auto py-10">
          <div className="inline-flex items-center gap-2 bg-[#1A6BFF]/10 border border-[#1A6BFF]/20 text-[#4D90FF] text-xs font-medium px-3.5 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 bg-[#1A6BFF] rounded-full animate-pulse"></span>
            Trusted by 4,000+ vendors
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            India's Smartest<br/><span className="text-[#1A6BFF]">E-Tender</span><br/>Platform
          </h2>
          <p className="text-[#8896B3] text-sm leading-relaxed mb-9 max-w-xs">
            AI-powered tender discovery, smart bid recommendations, and secure submission — all in one dashboard built for Indian businesses.
          </p>
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3 text-[13px] text-[#8896B3]">
              <div className="w-8 h-8 rounded-lg bg-[#1A6BFF]/10 flex items-center justify-center text-lg shrink-0">🤖</div>
              <span>AI matches you with tenders you're most likely to win</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] text-[#8896B3]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-lg shrink-0">🔒</div>
              <span>Bank-grade security — JWT + bcrypt encrypted data</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] text-[#8896B3]">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-lg shrink-0">⚡</div>
              <span>Real-time alerts every 15 minutes for new tenders</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#8896B3]">
          © {new Date().getFullYear()} BidSmart · Privacy Policy · Terms of Use
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 min-h-screen overflow-y-auto relative">
        <button onClick={onBack} className="md:hidden absolute top-6 left-6 text-[#8896B3] hover:text-white flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Back
        </button>
        
        <div className="w-full max-w-[420px] mt-10 md:mt-0">
          <div className="mb-7">
            <h1 className="text-[26px] font-extrabold tracking-tight mb-1.5">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-sm text-[#8896B3]">
              {mode === 'login' ? 'Sign in to your BidSmart account' : 'Join thousands of vendors on BidSmart'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 mb-7">
            <button 
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${mode === 'login' ? 'bg-[#1A6BFF] text-white shadow-sm' : 'text-[#8896B3] hover:text-white'}`}
              onClick={() => switchMode('login')}
            >
              Log In
            </button>
            <button 
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${mode === 'register' ? 'bg-[#1A6BFF] text-white shadow-sm' : 'text-[#8896B3] hover:text-white'}`}
              onClick={() => switchMode('register')}
            >
              Register
            </button>
          </div>

          {mode === 'login' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex gap-2.5 mb-5">
                <button 
                  className={`flex-1 py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${loginRole === 'vendor' ? 'border-[#1A6BFF] bg-[#1A6BFF]/10 text-white' : 'border-white/10 bg-white/5 text-[#8896B3] hover:border-white/20'}`}
                  onClick={() => setLoginRole('vendor')}
                >
                  <span className="text-lg">🏢</span>
                  <span className="text-[13px] font-medium">Vendor</span>
                </button>
                <button 
                  className={`flex-1 py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${loginRole === 'admin' ? 'border-[#1A6BFF] bg-[#1A6BFF]/10 text-white' : 'border-white/10 bg-white/5 text-[#8896B3] hover:border-white/20'}`}
                  onClick={() => setLoginRole('admin')}
                >
                  <span className="text-lg">👨‍💼</span>
                  <span className="text-[13px] font-medium">Admin</span>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px]">✉️</span>
                  <input type="email" placeholder="you@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-4 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px]">🔑</span>
                  <input type={showLoginPass ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-16 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                  <button type="button" onClick={() => setShowLoginPass(!showLoginPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8896B3] hover:text-white transition-colors">
                    {showLoginPass ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex justify-end -mt-1 mb-4">
                <button className="text-xs text-[#4D90FF] hover:underline font-medium">Forgot password?</button>
              </div>

              <button onClick={() => {alert('Logged in!'); if (onLogin) onLogin(loginRole); else onBack();}} className="w-full py-3.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-xl text-[15px] font-medium transition-all transform hover:-translate-y-0.5">
                Sign In →
              </button>

              <div className="flex items-center gap-3 my-5 text-xs text-[#8896B3]">
                <div className="flex-1 h-px bg-white/10"></div>
                <span>or continue with</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <button className="w-full py-3 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-xl text-sm flex items-center justify-center gap-2 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
            </div>
          )}

          {mode === 'register' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Step indicator */}
              <div className="flex items-center mb-6">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${regStep > 1 ? 'bg-emerald-500 text-white' : regStep === 1 ? 'bg-[#1A6BFF] text-white' : 'bg-white/5 border border-white/10 text-[#8896B3]'}`}>
                    {regStep > 1 ? <Check size={12} /> : '1'}
                  </div>
                  <span className={regStep >= 1 ? 'text-white' : 'text-[#8896B3]'}>Role</span>
                </div>
                <div className="flex-1 h-px bg-white/10 mx-2"></div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${regStep > 2 ? 'bg-emerald-500 text-white' : regStep === 2 ? 'bg-[#1A6BFF] text-white' : 'bg-white/5 border border-white/10 text-[#8896B3]'}`}>
                    {regStep > 2 ? <Check size={12} /> : '2'}
                  </div>
                  <span className={regStep >= 2 ? 'text-white' : 'text-[#8896B3]'}>Details</span>
                </div>
                <div className="flex-1 h-px bg-white/10 mx-2"></div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${regStep === 3 ? 'bg-[#1A6BFF] text-white' : 'bg-white/5 border border-white/10 text-[#8896B3]'}`}>
                    3
                  </div>
                  <span className={regStep === 3 ? 'text-white' : 'text-[#8896B3]'}>Security</span>
                </div>
              </div>

              {/* Step 1 */}
              {regStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="text-[13px] text-[#8896B3] mb-3.5 font-medium">I am registering as a —</div>
                  <div className="flex flex-col gap-3 mb-4">
                    <button 
                      className={`flex items-start p-4 rounded-xl border gap-3.5 transition-all text-left ${regRole === 'vendor' ? 'border-[#1A6BFF] bg-[#1A6BFF]/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                      onClick={() => setRegRole('vendor')}
                    >
                      <span className="text-xl mt-0.5">🏢</span>
                      <div>
                        <div className="text-sm font-semibold text-white">Vendor / Contractor</div>
                        <div className="text-xs text-[#8896B3] mt-1">Discover tenders, submit bids, track results</div>
                      </div>
                    </button>
                    <button 
                      className={`flex items-start p-4 rounded-xl border gap-3.5 transition-all text-left ${regRole === 'admin' ? 'border-[#1A6BFF] bg-[#1A6BFF]/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                      onClick={() => setRegRole('admin')}
                    >
                      <span className="text-xl mt-0.5">👨‍💼</span>
                      <div>
                        <div className="text-sm font-semibold text-white">Admin / Manager</div>
                        <div className="text-xs text-[#8896B3] mt-1">Create tenders, review bids, manage platform</div>
                      </div>
                    </button>
                  </div>
                  <button onClick={() => setRegStep(2)} className="w-full py-3.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-xl text-[15px] font-medium transition-all mt-2">
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {regStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">First Name</label>
                      <input type="text" placeholder="Rishabh" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">Last Name</label>
                      <input type="text" placeholder="Singh" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px]">✉️</span>
                      <input type="email" placeholder="you@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-4 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">Company Name</label>
                    <input type="text" placeholder="ABC Infrastructure Pvt Ltd" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                  </div>
                  {regRole === 'vendor' && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">GST Number</label>
                        <input type="text" placeholder="27AAPFU..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">PAN Number</label>
                        <input type="text" placeholder="AAPFU1234C" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                      </div>
                    </div>
                  )}
                  <button onClick={() => setRegStep(3)} className="w-full py-3.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-xl text-[15px] font-medium transition-all mt-2">
                    Continue →
                  </button>
                  <button onClick={() => setRegStep(1)} className="w-full py-2.5 mt-2 bg-transparent text-[#8896B3] hover:text-white border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium transition-all">
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 3 */}
              {regStep === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">Create Password</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px]">🔑</span>
                      <input 
                        type={showRegPass ? 'text' : 'password'} 
                        placeholder="Min. 8 characters" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-16 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" 
                      />
                      <button type="button" onClick={() => setShowRegPass(!showRegPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8896B3] hover:text-white transition-colors">
                        {showRegPass ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i <= strength ? bgCols[strength] : 'bg-white/10'}`}></div>
                      ))}
                    </div>
                    {password && <div className={`text-[11px] mt-1 font-medium ${textCols[strength]}`}>{labels[strength]}</div>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">Confirm Password</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px]">🔑</span>
                      <input type={showRegPass2 ? 'text' : 'password'} placeholder="Re-enter password" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-16 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                      <button type="button" onClick={() => setShowRegPass2(!showRegPass2)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8896B3] hover:text-white transition-colors">
                        {showRegPass2 ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[#8896B3] mb-1.5 uppercase tracking-wide">Mobile Number</label>
                    <div className="flex gap-2">
                      <div className="bg-white/5 border border-white/10 rounded-xl py-3 px-3.5 text-sm text-white flex items-center shrink-0">
                        🇮🇳 +91
                      </div>
                      <input type="tel" placeholder="98765 43210" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#1A6BFF] focus:bg-[#1A6BFF]/5 transition-all" />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mb-4 text-xs text-[#8896B3] leading-relaxed">
                    <input type="checkbox" className="mt-0.5 shrink-0 accent-[#1A6BFF] w-3.5 h-3.5 rounded border-white/20 bg-white/5" id="termsCheck" />
                    <label htmlFor="termsCheck">
                      I agree to BidSmart's <a href="#" className="text-[#4D90FF] hover:underline">Terms of Service</a> and <a href="#" className="text-[#4D90FF] hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  <button onClick={handleRegister} className="w-full py-3.5 bg-[#1A6BFF] hover:bg-[#4D90FF] text-white rounded-xl text-[15px] font-medium transition-all transform hover:-translate-y-0.5">
                    Create Account →
                  </button>
                  <button onClick={() => setRegStep(2)} className="w-full py-2.5 mt-2 bg-transparent text-[#8896B3] hover:text-white border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium transition-all">
                    ← Back
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-6 text-[13px] text-[#8896B3]">
            {mode === 'login' ? (
              <>Don't have an account? <button onClick={() => switchMode('register')} className="text-[#4D90FF] font-medium hover:underline">Register free →</button></>
            ) : (
              <>Already have an account? <button onClick={() => switchMode('login')} className="text-[#4D90FF] font-medium hover:underline">Sign in →</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
