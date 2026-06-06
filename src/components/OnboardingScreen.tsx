import React, { useState } from 'react';
import { UserProfile, AppScreen } from '../types';

interface OnboardingScreenProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ user, onUpdateUser, onNavigate }) => {
  const [preferredCats, setPreferredCats] = useState<string[]>(['Tech', 'Fashion', 'Home']);
  const [preference, setPreference] = useState<'new' | 'used' | 'both'>('both');
  const [location, setLocation] = useState('San Francisco, CA');
  const [avatar, setAvatar] = useState(user.profilePhoto);

  const toggleCategory = (cat: string) => {
    if (preferredCats.includes(cat)) {
      setPreferredCats(preferredCats.filter(c => c !== cat));
    } else {
      setPreferredCats([...preferredCats, cat]);
    }
  };

  const handleStartExploring = () => {
    onUpdateUser({
      preferredCategories: preferredCats,
      preference,
      location,
      profilePhoto: avatar,
    });
    // Dynamically direct based on their role
    if (user.role === 'seller') {
      onNavigate('SellerDashboard');
    } else {
      onNavigate('MarketplaceHub');
    }
  };

  // Mock avatar options to pick from list
  const avatars = [
    { name: 'Default Business', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDjHulJsRLAzBb-SDZ3dHg8VbsmscHBe8u3ac1gOk7YA9pw0UbKjA3awMyJFhk00nH5nq19Nb6VEWUXrmc6DtwG-2vAMBKIT_Zd3Yt5ajSb-baflnGErwml_eZLl8edj_BvREUyF50vp5TbHtCaCGPm8-P710NYs6YqMdzc6Lx9S5al1VefMYziIAIRNzGCY8tYGX_sSgWZau1OlJaLxyq774cZQ75IdcLKVK22hMDk_Lj058d2fYUZDOJKwtpT80H5BsntEDQL4nl' },
    { name: 'Verifed Buyer', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMqsLaqMYjMfEs-9kO0fIZL1wx_tXsVbQoSH-61I5cin7p5gyDJ4LkeCmHRL2GQptCQMzPzGgNoIsYiMajSdDyHKpGjbm8P52wHsYtr-RqPY2_TfQWFhmp44e1EyqpVmtfrp7bUlaa0T70n6-0uauXNeGOksp5v96MfSBO7MO4_FPQ4DD-9LtJ7iVZ32g1wZ2GBhhGgUiWB5-D2r69QPW47yxZRplZUnOdvyXfpEMKDFnEkDM0Nhi6slnI82uD91S9ETFqCw3SPVMi' },
    { name: 'Felix', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmU983WubCOXTIyLg2kAbWuoyGP6jxeE6ChTwi22ERRgk3EzW5XJEIW77ycej36YmWTlzx8B1xqB2KNs9G8cTHQY__ac3jaPEV_WBHb2evF0YqpaElnHltXFBGw_4SccR1qoZGSf-Oz9OrEBa377ENwPKlQkfbfWlblKjjgi7yWmnaE37GRUrbLhRdqMMmqh0rKqUkiah8obLillQAZbacH2pKnbz6_CHxRDf2iGVn3N9qsvOvXEzdHujjaSFCjBMXZ2YppfBQsNWC' },
  ];

  return (
    <div className="bg-[#faf9ff] text-[#051a3e] min-h-[calc(100vh-64px)] flex flex-col">
      {/* Top Header bar */}
      <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-slate-100 z-50">
        <div className="flex items-center gap-2">
          <img 
            alt="MarketMate Logo" 
            className="h-8 w-8 object-contain" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLuO-LfUod0oscQrSaj9u_D9Uhm3Y-aIIRZ-qWfpWPqFiIgh3spK60RIwlxcmJUV4IP_JTwe52fLxhLwiz5on2IuxcQCDDbiWs4yS_LXI4_gWAOfyHvNOMezl9gERs1pLWyXo_1PoZ3LRNc4GRB-PWGlrNDMiSknvFIELHDrK5CydEdwMFuneQh-LxXQpl3qac9HwbXo6ytDoHKsn6oBqg3d5-it-DhyN2Fv7cLGo742o5YuwSps4TFTlNc" 
          />
          <span className="font-extrabold text-[#003d9b] tracking-tight">MarketMate</span>
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); alert("Help widget triggered."); }} className="text-xs font-bold text-slate-500 hover:text-[#003d9b] transition-colors">Help</a>
      </header>

      {/* Main interactive form card */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          
          {/* Asymmetric Sidebar graphic */}
          <div className="hidden md:block md:w-5/12 bg-[#0052cc] text-white p-8 relative overflow-hidden flex flex-col justify-end">
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundImageSize: '24px 24px' }}></div>
            <div className="relative z-10 space-y-3">
              <h3 className="font-extrabold text-2xl mb-1 leading-tight">Almost there!</h3>
              <p className="text-sm opacity-90 leading-relaxed">Personalize your feed to find exactly what you love, faster.</p>
            </div>
            <div className="absolute top-12 -right-8 w-32 h-32 bg-[#8af5be] rounded-full blur-3xl opacity-35 pointer-events-none"></div>
          </div>

          {/* Profile Setup Form content */}
          <div className="flex-1 p-6 md:p-10 space-y-6">
            <div>
              <h1 className="text-2xl font-black text-[#051a3e] mb-1">Complete Your Profile</h1>
              <p className="text-xs text-slate-500 font-medium">Tell us a bit about yourself to help us personalize your feed.</p>
            </div>

            {/* Profile Photo upload picker */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#003d9b]">
                  <img src={avatar} alt="Profile preview" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#003d9b] text-white p-1.5 rounded-full shadow-md">
                  <span className="material-symbols-outlined text-xs">edit</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#003d9b]">Select profile picture template:</span>
              <div className="flex gap-2">
                {avatars.map((av, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(av.url)}
                    className={`text-slate-600 text-[10px] font-bold py-1 px-2.5 rounded-full border cursor-pointer transition-all ${
                      avatar === av.url ? 'bg-[#003d9b] text-white border-[#003d9b]' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    Option {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Categories chips */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 block">Preferred Categories</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'Tech', icon: 'laptop_mac' },
                  { value: 'Fashion', icon: 'checkroom' },
                  { value: 'Home', icon: 'home' },
                  { value: 'Photography', icon: 'photo_camera' },
                  { value: 'Footwear', icon: 'footprint' },
                ].map((item) => {
                  const isSelected = preferredCats.includes(item.value);
                  return (
                    <button
                      key={item.value}
                      onClick={() => toggleCategory(item.value)}
                      type="button"
                      className={`px-4 py-2 border rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#003d9b] text-white border-[#003d9b] shadow-sm' 
                          : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{item.icon}</span>
                      {item.value}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shopping preferences radio grid */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 block">Interested in:</label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200/50">
                {(['new', 'used', 'both'] as const).map((pref) => {
                  const label = pref === 'new' ? 'Brand New' : pref === 'used' ? 'Second-Hand' : 'Both';
                  const isChecked = preference === pref;
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setPreference(pref)}
                      className={`text-center py-2 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-white text-[#003d9b] shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery address & mini map preview */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-700 block" htmlFor="location">Default Delivery Area</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#003d9b] transition-colors text-lg">location_on</span>
                <input 
                  id="location"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-[#003d9b]/25 focus:border-[#003d9b] rounded-lg text-xs font-medium text-[#051a3e] focus:outline-none" 
                  placeholder="e.g. San Francisco, CA" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text" 
                />
              </div>

              {/* Map Preview Decor */}
              <div className="w-full h-28 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shadow-inner">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-700 hover:scale-105" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3567TJTC4FGT4TmWQAQpv4HDUR1i90ZZATSe4NQ99TPHoRmfQ_NOw-9I8yvUMkUHSWwYjCR5AKcQ3HVv1eoI3GHgibxlU3AUd2mkBA-Rn4QkTkXtArZTZ9jD4AtQgB1SwH9VPseHRkNqlPNEKhfvK3YZkikWp76XxUyn6OTsjQmYhl0YcfLckOZJkQG-WN6vrmsG2ijhMn6K46te5Tix_CuyyMzsivUftufErpbq38qhj2hg23HDzk7E8UAiSv6TcVQpIpNd27i-t')" }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-3.5 h-3.5 bg-[#003d9b] rounded-full shadow-lg border border-white"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 space-y-3 text-center">
              <button 
                onClick={handleStartExploring}
                className="w-full bg-[#003d9b] text-white hover:bg-[#0051cc] font-bold text-xs py-4 rounded-xl shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                Start Exploring
              </button>
              <button 
                onClick={handleStartExploring}
                type="button" 
                className="inline-block text-xs font-bold text-slate-500 hover:text-[#003d9b] transition-colors cursor-pointer"
              >
                Skip for Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
