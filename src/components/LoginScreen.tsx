import React, { useState } from 'react';
import { AppScreen } from '../types';

interface LoginScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onLoginSuccess: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('john@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setFeedbackMsg('Please fill in your Email or Phone Number.');
      return;
    }
    // Simulate successful login
    setFeedbackMsg('');
    onLoginSuccess(emailOrPhone.trim());
  };

  return (
    <div className="bg-[#faf9ff] text-[#051a3e] min-h-[calc(100vh-64px)] flex items-center justify-center p-4 select-none relative">
      <div className="w-full max-w-[440px] bg-white rounded-2xl p-8 md:p-12 shadow-md border border-slate-100 flex flex-col justify-between">
        
        {/* Branding Header */}
        <header className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4">
            <img 
              alt="MarketMate Logo" 
              className="h-16 w-auto object-contain cursor-pointer"
              onClick={() => onNavigate('Welcome')}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC46Oycuprai977xtK3Rx92TRN5gxwyz-nD5tICZ4nGaLGtmrluVl2K6s9k_MhJXeBOcAEatsPr56HjyXH2LLsLji7PXcVhtwSKcTsawbPooL6rKqeQuSOM5CkqxXVu9nN-gOPpGe_JFOQcmwI2ZloTTwHomTXLNQusZLbv4IFXNc8jSlifqvMLX6YlaWTSLHqC_DlqipWZTCT_74O5NPT4o9w2si8nWColUqHQfgxzXLuSRFXRCF-SHxI1Kf-RSOF0QdaUaEooUPfD" 
            />
          </div>
          <h1 className="text-2xl font-bold text-[#003d9b] mb-1">Welcome Back</h1>
          <p className="text-sm text-slate-500 font-medium">Log in to your MarketMate account to continue.</p>
        </header>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg font-semibold flex items-center gap-1.5 border border-red-100">
            <span className="material-symbols-outlined text-sm">error</span>
            {feedbackMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email/Phone Field */}
          <div className="relative">
            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003d9b] focus-within:border-[#003d9b] px-3.5 transition-all">
              <span className="material-symbols-outlined text-slate-400 mr-2.5">mail</span>
              <input 
                className="w-full py-3.5 bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm focus:ring-0 focus:outline-none" 
                id="identifier" 
                name="identifier" 
                type="text"
                placeholder="Email or Phone Number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#003d9b] focus-within:border-[#003d9b] px-3.5 transition-all">
              <span className="material-symbols-outlined text-slate-400 mr-2.5">lock</span>
              <input 
                className="w-full py-3.5 bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm focus:ring-0 focus:outline-none" 
                id="password" 
                name="password" 
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                className="ml-2 text-slate-400 hover:text-[#003d9b] transition-colors focus:outline-none cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} 
                type="button"
              >
                <span className="material-symbols-outlined text-sm">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mt-1 text-xs">
            <label className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-[#003d9b] focus:ring-[#003d9b]/20" 
              />
              <span className="ml-2.5 font-semibold text-slate-600 group-hover:text-[#003d9b] transition-colors">
                Remember Me
              </span>
            </label>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setFeedbackMsg("Password recovery link sent to your phone/email."); }}
              className="font-bold text-[#003d9b] hover:underline transition-all"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button 
            className="w-full bg-[#003d9b] text-white py-4 rounded-xl font-bold hover:bg-[#0051cc] hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer" 
            type="submit"
          >
            <span>Log In</span>
            <span className="material-symbols-outlined text-base">login</span>
          </button>

          {/* Horizontal Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 font-bold text-[10px] uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onLoginSuccess('john@example.com')}
              className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-95 cursor-pointer text-xs font-semibold text-slate-600" 
              type="button"
            >
              <img 
                alt="Google" 
                className="w-4 h-4 mr-2" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwrIgRNdeQFsDbAhG29MX-mQ8XhDifkll7zBl32sPNJSUO57ckxsTl6FApAgSJoQ8EoWrWHsinF4y2mgN7Qer9IWsBXHF15swavMSObzIKw0ihRZ-axWs1yt6IT2wF0Bf6qP5M956ydZ9p7IowoYaSPJ0e6m0uQoaCeb1ya-fLNV-_UlDi6dyUR9y7ok4XSiiPqTipjm2iADPWuARCGTsK9hKgEklS72RV1DwQ9opZVg9v_Moh2MFngdJLSjD1WPx2B8WHR5K_oNZa" 
              />
              <span>Google</span>
            </button>
            <button 
              onClick={() => onLoginSuccess('alex@example.com')}
              className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-95 cursor-pointer text-xs font-semibold text-slate-[#1877F2]" 
              type="button"
            >
              <span className="material-symbols-outlined text-[#1877F2] mr-2 text-sm">face_nod</span>
              <span>Facebook</span>
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <footer className="mt-8 text-center">
          <p className="text-sm font-medium text-slate-500">
            Don't have an account?{' '}
            <a 
              className="text-[#003d9b] font-bold hover:underline transition-all cursor-pointer"
              onClick={(e) => { e.preventDefault(); onNavigate('Register'); }}
            >
              Sign Up
            </a>
          </p>
        </footer>
      </div>

      {/* Atmospheric layout text */}
      <div className="hidden lg:fixed lg:bottom-12 lg:right-12 lg:flex flex-col items-end opacity-10 pointer-events-none">
        <div className="text-6xl font-extrabold text-[#003d9b] leading-none tracking-tight">MARKET</div>
        <div className="text-6xl font-extrabold text-[#006c47] leading-none tracking-tight">MATE</div>
      </div>
    </div>
  );
};
