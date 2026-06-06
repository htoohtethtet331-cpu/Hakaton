import React, { useState } from 'react';
import { UserProfile, BuyerOrder, MarketplaceProduct, AppScreen } from '../types';

interface BuyerDashboardScreenProps {
  user: UserProfile;
  orders: BuyerOrder[];
  savedProducts: MarketplaceProduct[];
  savedIds: string[];
  onToggleSaved: (id: string) => void;
  onNavigate: (screen: AppScreen) => void;
  onTrackOrder: (order: BuyerOrder) => void;
  onAddFunds: () => void;
}

export const BuyerDashboardScreen: React.FC<BuyerDashboardScreenProps> = ({
  user,
  orders,
  savedProducts,
  savedIds,
  onToggleSaved,
  onNavigate,
  onTrackOrder,
  onAddFunds,
}) => {
  const [activeCouponsCount, setActiveCouponsCount] = useState(user.activeCoupons);
  const [activePoints, setActivePoints] = useState(user.matePoints);
  const [history, setHistory] = useState([
    { id: '#MM-71204', date: 'Oct 24, 2023', status: 'Delivered', total: 42.50 },
    { id: '#MM-69812', date: 'Sep 15, 2023', status: 'Delivered', total: 315.00 },
    { id: '#MM-65230', date: 'Aug 02, 2023', status: 'Returned', total: 12.99 },
  ]);

  const handleClaimCoupon = () => {
    if (activeCouponsCount > 0) {
      setActiveCouponsCount(activeCouponsCount - 1);
      setActivePoints(activePoints + 150);
      alert("Coupon claimed! You earned 150 MatePoints! Balance increased.");
    } else {
      alert("No active coupons left to claim.");
    }
  };

  return (
    <div className="bg-[#faf9ff] text-[#051a3e] min-h-[calc(100vh-64px)] pb-24 font-sans">
      
      {/* Top AppBar */}
      <header className="fixed top-14 left-0 w-full z-40 bg-white shadow-sm px-4 md:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span onClick={() => onNavigate('MarketplaceHub')} className="material-symbols-outlined text-[#003d9b] font-bold text-2xl cursor-pointer">arrow_back</span>
          <span className="text-xl md:text-2xl font-black text-[#003d9b] tracking-tight">MarketMate</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('Feed')} className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer text-slate-500">
            <span className="material-symbols-outlined">search</span>
          </button>
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#0052cc] flex items-center justify-center text-white text-xs font-bold leading-none select-none">
              {user.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <span className="text-xs font-bold text-slate-800">{user.name}</span>
          </div>
        </div>
      </header>

      <main className="pt-24 max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Bento Grid: Profile & Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
          
          {/* Profile Card */}
          <div className="md:col-span-4 bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center border border-slate-100">
            <div className="relative w-24 h-24 mb-4 select-none">
              <img 
                alt="User Profile avatar" 
                className="w-full h-full rounded-full object-cover border-4 border-slate-100" 
                src={user.profilePhoto} 
              />
              <button onClick={() => onNavigate('Onboarding')} className="absolute bottom-0 right-0 bg-[#003d9b] text-white rounded-full p-1.5 shadow-md hover:scale-105 cursor-pointer">
                <span className="material-symbols-outlined text-xs">edit</span>
              </button>
            </div>
            <h1 className="text-lg font-black">{user.name}</h1>
            <p className="text-xs text-slate-400 font-semibold mb-4">Verified Buyer since 2022</p>
            <div className="w-full flex gap-2">
              <button onClick={() => onNavigate('Onboarding')} className="flex-1 bg-[#003d9b] text-white py-2.5 rounded-lg text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer">Edit Profile</button>
              <button onClick={() => onNavigate('SuperAdmin')} className="flex-1 border border-slate-200 text-slate-500 hover:bg-slate-50 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer">Settings</button>
            </div>
          </div>

          {/* Stats & Quick Actions */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
            
            <div className="col-span-2 bg-[#0052cc] text-white rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="relative z-10 max-w-md">
                <h2 className="text-xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="text-xs opacity-90 mt-2 leading-relaxed">
                  You have {orders.length} shipments arriving this week. Your last purchase saved you $42 with MatePoints.
                </p>
              </div>
              <button 
                onClick={() => {
                  if (orders.length > 0) onTrackOrder(orders[0]);
                  else alert("No shipments currently active.");
                }}
                className="mt-4 bg-white text-[#003d9b] px-5 py-2.5 rounded-full w-fit text-xs font-bold hover:scale-[1.03] transition-transform cursor-pointer"
              >
                Track All
              </button>
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_mall</span>
              </div>
            </div>

            {/* Wallet Balance widget */}
            <div 
              onClick={onAddFunds}
              className="bg-slate-100/50 hover:bg-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-sm transition-all cursor-pointer border border-slate-100"
            >
              <span className="material-symbols-outlined text-[#003d9b] text-3xl mb-2">wallet</span>
              <span className="text-xl font-black">${user.walletBalance.toFixed(2)}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold mt-1">Wallet Balance</span>
            </div>

            {/* MatePoints widget */}
            <div 
              onClick={() => alert(`Earn more MatePoints by completing tasks or buying more!`)}
              className="bg-slate-100/50 hover:bg-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-sm transition-all cursor-pointer border border-slate-100"
            >
              <span className="material-symbols-outlined text-[#006c47] text-3xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              <span className="text-xl font-black">{activePoints}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold mt-1">MatePoints</span>
            </div>

            {/* Coupons claim action */}
            <div 
              onClick={handleClaimCoupon}
              className="col-span-2 md:col-span-1 bg-slate-100/50 hover:bg-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-sm transition-all cursor-pointer border border-slate-100"
            >
              <span className="material-symbols-outlined text-amber-500 text-3xl mb-2">confirmation_number</span>
              <span className="text-xl font-black">{activeCouponsCount}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold mt-1">Active Coupons</span>
            </div>

          </div>
        </section>

        {/* Active Orders Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-lg font-black text-[#051a3e]">Active Orders</h2>
              <p className="text-xs text-slate-400 font-semibold">Shipments currently in progress</p>
            </div>
            <button onClick={() => alert("Tracking listings update.")} className="text-xs font-bold text-[#003d9b] hover:underline cursor-pointer">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-semibold col-span-2">
                No orders present. Purchase a product in the catalog!
              </div>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm border border-slate-100 border-l-4 border-l-[#003d9b]">
                  <img alt={o.productTitle} className="w-20 h-20 rounded-lg object-cover shrink-0 select-none bg-slate-50" src={o.image} />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-extrabold text-slate-800 truncate">{o.productTitle}</h3>
                        <span className="bg-[#e9edff] text-[#0052cc] text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                          {o.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">Order {o.orderNumber} &bull; {o.arrivesString}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-black text-[#003d9b]">${o.price.toFixed(2)}</span>
                      <button 
                        onClick={() => onTrackOrder(o)}
                        className="bg-slate-100 hover:bg-slate-200 text-[#003d9b] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Saved Products (Horizontal List with Horizontal Scrollbar-hide) */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-lg font-black text-[#051a3e]">Saved Products</h2>
              <p className="text-xs text-slate-400 font-semibold">Items you&apos;ve been eyeing</p>
            </div>
            <button onClick={() => onNavigate('Feed')} className="text-xs font-bold text-[#003d9b] hover:underline cursor-pointer">Manage List</button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {savedProducts.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-semibold w-full">
                No items saved to favorites. Toggle heart icons on items in the feed!
              </div>
            ) : (
              savedProducts.map((p) => {
                const isFavorite = savedIds.includes(p.id);
                return (
                  <div key={p.id} className="min-w-[200px] max-w-[200px] bg-white rounded-2xl shadow-sm p-3 group border border-slate-100 flex flex-col justify-between">
                    <div className="relative overflow-hidden rounded-lg bg-slate-50 select-none">
                      <img src={p.image} alt={p.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none" />
                      <button 
                        onClick={() => onToggleSaved(p.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-[#ba1a1a] shadow cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs font-bold">
                          {isFavorite ? 'favorite' : 'favorite_outline'}
                        </span>
                      </button>
                    </div>
                    <div className="mt-2.5 flex-grow">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{p.title}</h4>
                      <p className="text-sm font-black text-[#003d9b] mt-1">${p.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => {
                        onToggleSaved(p.id);
                        alert(`Item "${p.title}" added to active purchase stream!`);
                      }}
                      className="w-full mt-2.5 border border-[#003d9b] text-[#003d9b] hover:bg-[#003d9b] hover:text-white py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center"
                    >
                      Instant Buy
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Purchase History Table */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-lg font-black text-[#051a3e]">Purchase History</h2>
              <p className="text-xs text-slate-400 font-semibold">Review your past transactions</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/50">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#faf9ff] border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <td className="px-6 py-3.5 text-xs font-bold text-[#003d9b]">{row.id}</td>
                    <td className="px-6 py-3.5 text-xs font-semibold text-slate-500">{row.date}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        row.status === 'Delivered' 
                          ? 'bg-[#8af5be]/30 text-[#00714b]' 
                          : 'bg-[#ffdad6]/60 text-[#ba1a1a]'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-xs font-extrabold text-slate-800 text-right">${row.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Persistent Bottom Bar for mobile */}
      <nav className="fixed bottom-0 left-0 w-full z-[80] flex justify-around items-center py-2.5 bg-white border-t border-slate-100 shadow-lg md:hidden">
        <button onClick={() => onNavigate('MarketplaceHub')} className="flex flex-col items-center justify-center text-slate-400 hover:text-[#003d9b] cursor-pointer">
          <span className="material-symbols-outlined text-base">home</span>
          <span className="text-[10px] sm:text-xs">Home</span>
        </button>
        <button onClick={() => onNavigate('Feed')} className="flex flex-col items-center justify-center text-slate-400 hover:text-[#003d9b] cursor-pointer">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] sm:text-xs">Filter</span>
        </button>
        <button onClick={() => onNavigate('Feed')} className="flex flex-col items-center justify-center text-[#006c47] font-bold cursor-pointer relative -mt-6 bg-white p-1 rounded-full border border-slate-100">
          <div className="p-2.5 bg-[#8af5be] text-[#00714b] rounded-full">
            <span className="material-symbols-outlined text-xl">add_circle</span>
          </div>
          <span className="text-[10px] sm:text-xs mt-1">Sell</span>
        </button>
        <button onClick={() => onNavigate('BuyerDashboard')} className="flex flex-col items-center justify-center text-[#003d9b] font-bold cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_mall</span>
          <span className="text-[10px] sm:text-xs">Dashboard</span>
        </button>
        <button onClick={() => onNavigate('SellerDashboard')} className="flex flex-col items-center justify-center text-slate-400 hover:text-[#006c47] cursor-pointer">
          <span className="material-symbols-outlined">storefront</span>
          <span className="text-[10px] sm:text-xs">Seller</span>
        </button>
      </nav>

    </div>
  );
};
