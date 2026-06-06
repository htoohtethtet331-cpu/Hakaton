import React from 'react';
import { AppScreen } from '../types';

interface WelcomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="bg-gradient-to-tr from-[#faf9ff] via-[#faf9ff] to-[#e1e8ff] min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-x-hidden relative py-12 px-4 md:px-8">
      {/* Background Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-blue-300/20 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 my-auto">
        {/* Logo & Branding Section */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <div className="animate-float">
            <img 
              alt="MarketMate Logo" 
              className="h-28 md:h-36 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE18dq15x3yvuVrIjsJ5-i_oJlSzLdhSWSm1vM9G4XiZn-9l_T8CBrnlPe6VHa1bXBDFRJBPvEoXDXIXkigLgiebtm0iq7kvVslZhJM0qRlhUpsSu1f5AemFrnWQ6Z7v20Oh7Bahls2BI06uRzPfBtco3p8KXgHV3VCM_mvHRaDdBu_HPsa-tHWdNQR6KWoRP1vCUJRkaFyP-CKWRKv0tCBiFY9F5XHun-s9F7aBNGEGCTAmY98iaWyB3Y3KP6l-jUgQeK4s0FqNu2" 
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#003d9b] tracking-tight leading-tight">
              Connect. Trade. <br className="hidden md:block"/>
              <span className="text-[#006c47]">Prosper.</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-600 max-w-md mx-auto md:mx-0">
              The most seamless marketplace for modern commerce. Experience trade without the friction, designed for speed and reliability.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => onNavigate('Register')}
              className="px-8 py-4 bg-[#003d9b] text-white hover:bg-[#0052cc] rounded-xl font-bold font-sans shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              Get Started
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button 
              onClick={() => onNavigate('Login')}
              className="px-8 py-4 bg-white text-[#003d9b] border-2 border-[#003d9b] hover:bg-slate-50 active:scale-95 rounded-xl font-bold transition-all flex items-center justify-center cursor-pointer"
            >
              Login to Account
            </button>
          </div>
        </div>

        {/* Visual Bento Feature Highlight */}
        <div className="flex-1 w-full grid grid-cols-2 grid-rows-2 gap-4 h-[380px] md:h-[480px]">
          {/* Feature 1: High Velocity */}
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl p-6 flex flex-col justify-end space-y-2 col-span-1 row-span-1 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-[#006c47] text-4xl">bolt</span>
            </div>
            <p className="text-xs font-semibold text-[#006c47] uppercase tracking-wider">Speed</p>
            <h3 className="text-xl font-bold text-[#051a3e] leading-tight">Instant Listings</h3>
            <img 
              className="absolute -right-4 -bottom-4 w-28 h-28 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuPbZmQBKjuyuwVfu_0tMm1X__kwkkbX0PE8YzoGvtJNyPhG-_gAJ2HhsN42JvELN0IrF8ivRfX14hGfYgzvyCTsB9ynNsyWb1ILoVE3PORWGL3-gGNBgUqP3uNIcHgLHT5vDSwppqnn1A-jBnA_1ZWy46dZEr3D98Gd72R9cggLZml11Iml5QlVeIBoDt3MDfEAbwlDB9Q7RcJ6wcZWawIjbUhzYDE0Nhq2WFANILNJusRsPzr-YCToQIaUf3_c8PejOK6GVbvpjz"
              alt="Listing analytics dashboard wireframe"
            />
          </div>

          {/* Feature 2: Visual Trust */}
          <div className="bg-[#003d9b] text-white rounded-3xl p-6 flex flex-col justify-between col-span-1 row-span-2 shadow-lg relative overflow-hidden group">
            <h3 className="text-xl md:text-2xl font-bold text-white z-10">Secure <br/>Payments</h3>
            <div className="flex flex-col gap-2.5 z-10 max-w-full">
              <div className="h-12 w-full bg-white/10 rounded-lg flex items-center px-4 border border-white/5">
                <div className="w-8 h-8 rounded-full bg-white/20 mr-3 shrink-0"></div>
                <div className="h-2 w-20 bg-white/20 rounded"></div>
              </div>
              <div className="h-12 w-full bg-white/10 rounded-lg flex items-center px-4 border border-white/5">
                <div className="w-8 h-8 rounded-full bg-white/20 mr-3 shrink-0"></div>
                <div className="h-2 w-16 bg-white/20 rounded"></div>
              </div>
            </div>
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-500 pointer-events-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6lDW16Z5fy_Bd--lNYb5_IhuQgPJ9e_mrRbIFIr1qHjy3Vo9DLUa7ec5DdBtgZBdGH7RZXr3UT1jVvUDB8HKkQ1z4XfuBW-Vc3YSGNTVwyaVP2h8ji_jac9c-B_zXyWi-w2IislOCETikiNU37MyRhqPl1juMoBqmPMOLaJILo-XSTrym-zss5FoSUTPj0pSKEyIKAqjVkZmU95dmlfaCKe99FI_fJZDUHGgV4dYyfvCWiiNnvIcMfAgf_QFnynZ9OHxQ-in2TSTk"
              alt="Payment secure layout"
            />
          </div>

          {/* Feature 3: Support */}
          <div className="bg-[#e9edff] rounded-3xl p-6 flex flex-col justify-end col-span-1 row-span-1 shadow-sm relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-[#003d9b]">
              <span className="material-symbols-outlined text-4xl font-bold">support_agent</span>
            </div>
            <span className="material-symbols-outlined text-[#003d9b] mb-2 text-3xl">groups</span>
            <h3 className="text-lg font-bold text-[#051a3e] leading-tight">Expert Support</h3>
            <p className="text-xs text-slate-500 font-medium">Available 24/7 for you</p>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#dae2ff] rounded-full group-hover:scale-110 transition-all pointer-events-none opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Corporate Modern Footer */}
      <footer className="w-full pt-8 mt-12 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-500 font-medium">
          &copy; 2026 MarketMate Inc. All rights reserved. 
          <span className="mx-2">|</span>
          <a href="#" className="hover:text-[#003d9b] transition-colors">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:text-[#003d9b] transition-colors">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};
