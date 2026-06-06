import React, { useState } from 'react';
import { UserProfile, MarketplaceProduct, AppScreen } from '../types';

interface MarketplaceHubScreenProps {
  user: UserProfile;
  products: MarketplaceProduct[];
  savedIds: string[];
  onToggleSaved: (id: string) => void;
  onNavigate: (screen: AppScreen) => void;
  onAddProduct: (newProd: MarketplaceProduct) => void;
}

export const MarketplaceHubScreen: React.FC<MarketplaceHubScreenProps> = ({
  user,
  products,
  savedIds,
  onToggleSaved,
  onNavigate,
  onAddProduct,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('120.00');
  const [newCat, setNewCat] = useState<'Tech' | 'Fashion' | 'Home' | 'Photography' | 'Footwear'>('Tech');
  const [newCondition, setNewCondition] = useState<'Brand New' | 'Second-Hand'>('Brand New');

  const handleListProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddProduct({
      id: `prod-${Date.now()}`,
      title: newTitle.trim(),
      sellerName: user.name,
      price: parseFloat(newPrice) || 99,
      isNew: newCondition === 'Brand New',
      image: newCat === 'Tech' 
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6dGHOcFeCgmG5iXXm9rVCSCtqaciWZXZdtsQSe_16mdXnLaIck8o_LmhU2UVh8e-OfmSAdH5xx8laEJ2VtU3DJNcbKMs0Czl2vU6SeqILrJKxVnRhTTKFOysdPvYgb1-1tO-l66x0j5AplL3F_bX4z1KkVTGuzH0jdG3cKGb34fcY5XrOJ8ZpnOkwS5cQJR14N1L1fotL_MZr_TYEqp5LlCI8peXmV9nI2ZZC8ff8bjYUk-nmoNzX4vq4SXFoQ3p596oiHWbW2gC' 
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Mw-KxAp93FzmFCiVayPNiaDOYvLEKaGnRQKi57RTnC7yjP-x8KgJzcB-eJwbMwUrBHyTV-q2YhR6uS9j0gZvUNmqkLhYDz5pRd_pqnTetWgh-5IBfASwIHeSUjPK29apfQJA1d3TozGV-fNU1kUZZWIFJP4cQFS8BqrcbzMmBEh9xd2rQUGPXpdwaDO9CpLo0WOSfCbw_PcjgmGMe8qfHW_NTCcdL0SuibiTxcv7HfHMVwWOUSMDyhBCORpnwgD-99_4L4AVB1eZ',
      category: newCat,
      condition: newCondition,
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-[#faf9ff] text-[#051a3e] min-h-[calc(100vh-64px)] pb-16 font-sans">
      
      {/* Dynamic Header */}
      <header className="fixed top-14 left-0 w-full z-40 bg-white border-b border-slate-100 h-16 flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <img 
            alt="Logo" 
            className="w-8 h-8 rounded-lg" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvK3xuDv3a63s4KQA8AtDK1mrz0UlqoJqRWVd7kqhcUFkTQCI57ZX31S_MibAYUxl_hphbOnI1c5S60VmRXClTcgUEPKU_GTe4y7uXPjqlK_psYGpYKoeM_hhvFs5nG8zIluEJnMlwfEKa4yW5jBUedRDJL7WA0DkFT2DaUZnh2VU4--7ryiu1w6M3AU1Dl0BRtLhjs3WbeheCKve77bmm04fP7b7r7fU-3626aQZAkzs8Os6yaTe51nUDgXW36LWLk6eeDOJATmPk" 
          />
          <span className="font-extrabold text-[#003d9b] tracking-tight">MarketMate</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('Feed')} className="p-2 text-slate-500 hover:text-[#003d9b] rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-lg">search</span>
          </button>
          <button onClick={() => alert("Notification center active.")} className="p-2 text-slate-500 hover:text-[#003d9b] rounded-full transition-colors relative cursor-pointer">
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
          <button onClick={() => onNavigate('BuyerDashboard')} className="p-0.5 rounded-full border-2 border-indigo-200 shrink-0 cursor-pointer transition-transform hover:scale-105">
            <img alt="User avatar" className="w-8 h-8 rounded-full object-cover" src={user.profilePhoto} />
          </button>
        </div>
      </header>

      <main className="pt-24 max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Welcome Section */}
        <section className="mt-4">
          <div className="relative overflow-hidden rounded-3xl bg-[#0052cc] p-6 md:p-10 text-white h-[200px] md:h-[240px] flex flex-col justify-end shadow-md transition-all hover:shadow-lg">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3.5xl font-black mb-1">Welcome back, {user.name.split(' ')[0]}</h2>
              <p className="text-sm md:text-base font-medium opacity-90 max-w-sm md:max-w-md">Find the best deals or turn your items into cash today.</p>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-15 pointer-events-none">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeZZ6OxLUeR1rsZWTdg2848yj0N_yMvgj7qxae0M0ZDahJMb8BG9VFBcErBsq5gcR0U0lPp_mSqksdSnmakPQkcPJHYkJUlE8B9w0BNfqKcP5ro4fHxxVSo8oyKKpqG9m3KSOpjey-Y31-gfSJ2zKGjQg5uXn0dGbZjyiXs9T9Fu7Mf70WOQv_St1Kgi0SVSj6GjEzkJ3pzW5BeGzM8rTzHWRMXg4Q27h8_Mq89fJZaP1Ktu5Yf__5qrxsuYq_3dDzG2ZfQWtf0aCU" 
                alt="Market collage banner backdrop" 
              />
            </div>
          </div>
        </section>

        {/* Purchase vs Sell grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* BUY PANEL */}
          <section className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[420px]">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="bg-[#003d9b]/10 p-3 rounded-2xl text-[#003d9b]">
                    <span className="material-symbols-outlined text-2xl font-bold">shopping_cart</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-extrabold text-[#051a3e]">Purchase Panel</h3>
                    <p className="text-xs text-slate-500 font-semibold">Explore curated listings for you</p>
                  </div>
                </div>

                {/* Sub grid of categories */}
                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    { label: 'Tech', icon: 'devices' },
                    { label: 'Fashion', icon: 'checkroom' },
                    { label: 'Home', icon: 'home_repair_service' },
                    { label: 'Browse All', icon: 'more_horiz' },
                  ].map((card) => (
                    <button
                      key={card.label}
                      onClick={() => onNavigate('Feed')}
                      className="aspect-square bg-slate-50 hover:bg-[#0052cc] hover:text-white rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border border-slate-100 group/btn"
                    >
                      <span className="material-symbols-outlined text-3xl font-regular">{card.icon}</span>
                      <span className="text-xs font-bold">{card.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onNavigate('Feed')}
                className="mt-6 w-full py-4 bg-[#003d9b] text-white hover:bg-[#0052cc] rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#003d9b]/5 rounded-full blur-3xl group-hover:bg-[#003d9b]/10 transition-colors pointer-events-none"></div>
          </section>

          {/* SELL PANEL */}
          <section className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 border-l-4 border-l-[#006c47] shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[420px]">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="bg-[#8af5be]/30 p-3 rounded-2xl text-[#006c47]">
                    <span className="material-symbols-outlined text-2xl font-bold">storefront</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-extrabold text-[#051a3e]">Sell Panel</h3>
                    <p className="text-xs text-slate-500 font-semibold">Turn your clutter into credit</p>
                  </div>
                </div>

                <div className="bg-[#8af5be]/10 border border-[#8af5be]/30 rounded-2xl p-5 mb-5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#00714b]">Your Seller Stats</span>
                    <span className="text-[10px] font-extrabold bg-[#8af5be] text-[#00714b] px-2 py-0.5 rounded-full">Top Seller</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Active Listings</p>
                      <p className="text-lg font-black text-[#006c47]">12 items</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Earnings this month</p>
                      <p className="text-lg font-black text-[#006c47]">$842.00</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div 
                    onClick={() => setShowAddModal(true)} 
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 hover:border-[#006c47]/30 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-[#8af5be]/20 text-[#006c47] rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#051a3e]">Post New Listing</p>
                      <p className="text-[10px] text-slate-500">Takes less than 2 minutes</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                  </div>

                  <div 
                    onClick={() => onNavigate('SellerDashboard')} 
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 hover:border-[#006c47]/30 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-[#8af5be]/20 text-[#006c47] rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">analytics</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#051a3e]">Seller Insights</p>
                      <p className="text-[10px] text-slate-500">Manage and scale your sales</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowAddModal(true)}
                className="mt-6 w-full py-4 bg-[#006c47] text-white hover:bg-[#005235] text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                List an Item
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#006c47]/5 rounded-full blur-3xl group-hover:bg-[#006c47]/10 transition-colors pointer-events-none"></div>
          </section>

        </div>

        {/* Trending Near You layout */}
        <section className="pt-4">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#051a3e]">Trending Near You</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">Handpicked items based on your search history in {user.location.split(',')[0]}</p>
            </div>
            <button onClick={() => onNavigate('Feed')} className="text-xs font-bold text-[#003d9b] hover:underline cursor-pointer">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((p) => {
              const isSaved = savedIds.includes(p.id);
              return (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 group hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="aspect-square relative overflow-hidden bg-slate-50">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <button 
                      onClick={() => onToggleSaved(p.id)}
                      className="absolute top-2.5 right-2/5 md:right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-rose-600 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer z-10"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">
                        {isSaved ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 capitalize mb-1">{p.category}</p>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{p.title}</h4>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-50">
                      <span className="text-sm font-extrabold text-[#003d9b]">${p.price.toFixed(2)}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.condition === 'Brand New' 
                          ? 'bg-[#8af5be]/30 text-[#00714b]' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {p.condition}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Persistent Bottom Bar for mobile */}
      <nav className="fixed bottom-0 left-0 w-full z-[80] flex justify-around items-center py-2.5 bg-white border-t border-slate-100 shadow-lg md:hidden">
        <button onClick={() => onNavigate('MarketplaceHub')} className="flex flex-col items-center justify-center text-[#003d9b] font-bold cursor-pointer">
          <span className="material-symbols-outlined text-base">home</span>
          <span className="text-[10px] sm:text-xs">Home</span>
        </button>
        <button onClick={() => onNavigate('Feed')} className="flex flex-col items-center justify-center text-slate-400 hover:text-[#003d9b] cursor-pointer">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] sm:text-xs">Filter</span>
        </button>
        <button onClick={() => setShowAddModal(true)} className="flex flex-col items-center justify-center text-[#006c47] font-bold cursor-pointer relative -mt-6 bg-white p-1 rounded-full border border-slate-100">
          <div className="p-2.5 bg-[#8af5be] text-[#00714b] rounded-full">
            <span className="material-symbols-outlined text-xl">add_circle</span>
          </div>
          <span className="text-[10px] sm:text-xs mt-1">Sell</span>
        </button>
        <button onClick={() => onNavigate('BuyerDashboard')} className="flex flex-col items-center justify-center text-slate-400 hover:text-[#003d9b] cursor-pointer">
          <span className="material-symbols-outlined">local_mall</span>
          <span className="text-[10px] sm:text-xs">Dashboard</span>
        </button>
        <button onClick={() => onNavigate('SellerDashboard')} className="flex flex-col items-center justify-center text-slate-400 hover:text-[#006c47] cursor-pointer">
          <span className="material-symbols-outlined">storefront</span>
          <span className="text-[10px] sm:text-xs">Seller</span>
        </button>
      </nav>

      {/* Add Product Modal (Sell dialog) */}
      {showAddModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-fade-in border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#003d9b]">add_circle</span>
              List an Item for Sale
            </h3>
            <form onSubmit={handleListProductSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Product Title</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d9b]/20 focus:border-[#003d9b]" 
                  placeholder="e.g. Classic Premium Sneakers"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d9b]/20 focus:border-[#003d9b]" 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Category</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d9b]/20 focus:border-[#003d9b]"
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                  >
                    <option value="Tech">Tech</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Photography">Photography</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Condition</label>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setNewCondition('Brand New')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                      newCondition === 'Brand New' 
                        ? 'bg-[#8af5be]/30 text-[#00714b] border-[#00714b]' 
                        : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    Brand New
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewCondition('Second-Hand')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                      newCondition === 'Second-Hand' 
                        ? 'bg-amber-50 text-amber-800 border-amber-500' 
                        : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    Second-Hand
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-[#006c47] hover:bg-[#005235] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
