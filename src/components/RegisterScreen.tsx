import React, { useState } from 'react';
import { AppScreen } from '../types';

interface RegisterScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onRegisterSuccess: (accountData: { name: string; email: string; phone: string; location: string; role: 'buyer' | 'seller' }) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate, onRegisterSuccess }) => {
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [fullName, setFullName] = useState('Alex Kyaw');
  const [email, setEmail] = useState('alex@example.com');
  const [phone, setPhone] = useState('+1 (555) 321-9876');
  const [address, setAddress] = useState('456 Market St, San Francisco, CA');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [agree, setAgree] = useState(true);
  const [feedback, setFeedback] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !password) {
      setFeedback('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setFeedback('Passwords do not match.');
      return;
    }
    if (!agree) {
      setFeedback('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setFeedback('');
    onRegisterSuccess({
      name: fullName,
      email,
      phone,
      location: address,
      role,
    });
  };

  return (
    <div className="bg-[#faf9ff] text-[#051a3e] min-h-[calc(100vh-64px)] flex flex-col lg:flex-row">
      {/* Visual/Context Banner Side - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0052cc]/90 items-center justify-center p-16 overflow-hidden">
        <div className="z-10 text-white max-w-lg">
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Empowering your local commerce journey.
          </h1>
          <p className="text-lg opacity-90 mb-10">
            Whether you&apos;re looking to find unique treasures or grow your small business, MarketMate provides the tools you need to succeed in the modern economy.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <span className="material-symbols-outlined mb-2 text-[#8df7c1]">verified_user</span>
              <h3 className="text-sm font-bold">Trusted Security</h3>
              <p className="text-xs opacity-80 mt-1">Every transaction is protected by our advanced escrow system.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <span className="material-symbols-outlined mb-2 text-[#8df7c1]">speed</span>
              <h3 className="text-sm font-bold">Fast Fulfillment</h3>
              <p className="text-xs opacity-80 mt-1">Quick processing and reliable logistics for every order.</p>
            </div>
          </div>
        </div>
        <img 
          alt="Artisan marketplace aerial backdrop" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none transition-transform duration-1000" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFVLlWlk6EiyvZVM5a0AzBRI_Mndu8Or8YbYt2wDR6GPtFvMSrRcayqHHXOzAy2vpmZKIG3_TYdS5EZXXdLq8UtKRBJ9okjunBWTAKzYcX6Nm8qKncPnT_bVM1GgeiHwYwU3QoiQTi6VDJyEgsNZATTUee--Xn2yU7yAOfDje96c394VVJwWI0CY35PZw4D_sGC_Z-tJzhPQ2qRVs8MQbhg-IZUkiVwhEMXOMhtsCJzuXQ8ICn97AA26CVLLFhg7z_OQkIscHAT0N7" 
        />
      </div>

      {/* Form Content Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-white shrink-0">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#051a3e] tracking-tight mb-2">Create an account</h2>
            <p className="text-sm text-slate-500 font-medium">Join the community and start your journey today.</p>
          </div>

          {feedback && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg font-semibold flex items-center gap-1 border border-red-100">
              <span className="material-symbols-outlined text-sm">error</span>
              {feedback}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* User Role Selection tab (matching prompt layout) */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 items-center">
              <button 
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  role === 'buyer' 
                    ? 'bg-white text-[#003d9b] shadow-sm border border-slate-200/50' 
                    : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                Register as Buyer
              </button>
              <button 
                type="button"
                onClick={() => setRole('seller')}
                className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  role === 'seller' 
                    ? 'bg-[#8af5be] text-[#00714b] shadow-sm border border-[#00714b]/10' 
                    : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                Register as Seller
              </button>
            </div>

            {/* Fields grid */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 focus-within:text-[#003d9b]">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#003d9b]/20 focus:outline-none focus:border-[#003d9b] rounded-lg text-sm text-[#051a3e]" 
                    placeholder="John Doe" 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#003d9b]/20 focus:outline-none focus:border-[#003d9b] rounded-lg text-sm text-[#051a3e]" 
                    placeholder="john@example.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">call</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#003d9b]/20 focus:outline-none focus:border-[#003d9b] rounded-lg text-sm text-[#051a3e]" 
                    placeholder="+1 (555) 000-0000" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Residential Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">location_on</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#003d9b]/20 focus:outline-none focus:border-[#003d9b] rounded-lg text-sm text-[#051a3e]" 
                    placeholder="123 Market St, Suite 456" 
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#003d9b]/20 focus:outline-none focus:border-[#003d9b] rounded-lg text-sm text-[#051a3e]" 
                      placeholder="••••••••" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Confirm</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock_reset</span>
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#003d9b]/20 focus:outline-none focus:border-[#003d9b] rounded-lg text-sm text-[#051a3e]" 
                      placeholder="••••••••" 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms check */}
            <div className="flex items-start gap-2.5 py-1">
              <input 
                id="terms" 
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-slate-300 text-[#003d9b] focus:ring-[#003d9b]/20 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 font-medium leading-relaxed select-none cursor-pointer">
                I agree to the <a href="#" className="font-bold text-[#003d9b] hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-[#003d9b] hover:underline">Privacy Policy</a>. I understand my data will be handled securely.
              </label>
            </div>

            {/* Dynamic themed CTA button */}
            {role === 'buyer' ? (
              <button 
                type="submit"
                className="w-full bg-[#0052cc] hover:bg-[#003d9b] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Buyer Account</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            ) : (
              <button 
                type="submit"
                className="w-full bg-[#006c47] hover:bg-[#005235] text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-700/10 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Seller Account</span>
                <span className="material-symbols-outlined text-base">storefront</span>
              </button>
            )}

            {/* Bottom inline redirect for mobile */}
            <p className="text-center text-sm font-medium text-slate-500 mt-6 md:pb-0">
              Already have an account?{' '}
              <a 
                onClick={() => onNavigate('Login')}
                className="text-[#003d9b] font-bold hover:underline cursor-pointer transition-colors"
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
