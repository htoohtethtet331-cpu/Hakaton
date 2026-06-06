import React, { useState } from 'react';
import { UserProfile, AppScreen } from '../types';
import { INITIAL_SELLER_ORDERS, SellerOrder } from '../data';

interface SellerDashboardScreenProps {
  user: UserProfile;
  onNavigate: (screen: AppScreen) => void;
}

export const SellerDashboardScreen: React.FC<SellerDashboardScreenProps> = ({ user, onNavigate }) => {
  const [orders, setOrders] = useState<SellerOrder[]>(INITIAL_SELLER_ORDERS);
  const [totalEarnings, setTotalEarnings] = useState(2430.50);
  const [salesCount, setSalesCount] = useState(48);

  const handleMarkShipped = (id: string, price: number) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'Paid', timeString: 'Just now' } : o));
    setTotalEarnings(totalEarnings + price);
    setSalesCount(salesCount + 1);
    alert("Order marked paid and processed successfully! Current Month earnings increased.");
  };

  return (
    <div className="bg-[#faf9ff] text-[#051a3e] min-h-[calc(100vh-64px)] pb-24 font-sans">
      
      {/* AppBar navigation */}
      <header className="fixed top-14 left-0 w-full z-45 bg-white border-b border-slate-100 px-4 md:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span onClick={() => onNavigate('MarketplaceHub')} className="material-symbols-outlined text-[#006c47] font-bold text-2xl cursor-pointer">arrow_back</span>
          <span className="text-xl md:text-2xl font-black text-[#006c47] tracking-tight">MarketMate <span className="bg-emerald-500/10 text-[#006c47] text-[10px] px-2.5 py-1 rounded-full font-bold ml-1.5 align-middle select-none uppercase tracking-wide">Seller Console</span></span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('Feed')} className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer text-slate-500">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button onClick={() => alert("Help center")} className="p-2 hover:bg-slate-50 rounded-full cursor-pointer text-slate-500">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
      </header>

      <main className="pt-24 max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Dynamic metrics bar */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* Earnings card */}
          <div className="bg-[#006c47] text-white rounded-3xl p-6 shadow-md relative overflow-hidden group">
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <span className="material-symbols-outlined text-emerald-250 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                <p className="text-xs opacity-85 mt-2.5 font-bold uppercase tracking-wider">Total Earnings</p>
                <h2 className="text-3xl font-black mt-1">${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-xs bg-emerald-800/40 w-fit px-3 py-1 rounded-full border border-white/10">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                <span className="font-bold">+12.4% this month</span>
              </div>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
              <span className="material-symbols-outlined text-[180px]">payments</span>
            </div>
          </div>

          {/* Sales count card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <span className="material-symbols-outlined text-indigo-600 text-4xl">local_mall</span>
                <p className="text-xs text-slate-400 mt-2.5 font-bold uppercase tracking-wider">Sales Count</p>
                <h2 className="text-3xl font-black text-slate-900 mt-1">{salesCount} Orders</h2>
              </div>
              <span className="text-[10px] text-[#006c47] bg-[#8af5be]/20 px-2.5 py-1 rounded-full font-bold w-fit mt-3">Target: 50 Orders</span>
            </div>
          </div>

          {/* Average Order Value (AOV) card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <span className="material-symbols-outlined text-amber-500 text-4xl">reward</span>
                <p className="text-xs text-slate-400 mt-2.5 font-bold uppercase tracking-wider">Avg Order Value</p>
                <h2 className="text-3xl font-black text-slate-900 mt-1">$50.60</h2>
              </div>
              <span className="text-[10px] text-[#003d9b] bg-[#e9edff] px-2.5 py-1 rounded-full font-bold w-fit mt-3">Top 5% Seller rating</span>
            </div>
          </div>

        </section>

        {/* Dashboard split section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Sales lists: Page 6 */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-black text-slate-900">Recent Transactions</h3>
            <div className="space-y-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-200/50">
              {orders.map((or) => (
                <div key={or.id} className="flex gap-4 items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex gap-4 items-center min-w-0">
                    <img src={or.image} alt={or.title} className="w-14 h-14 bg-slate-50 rounded-xl object-cover shrink-0 select-none" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{or.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">Order {or.orderNumber} &bull; {or.timeString}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">${or.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1 justify-end mt-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${or.status === 'Paid' ? 'bg-[#00714b]' : 'bg-amber-500'}`}></span>
                        <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase">{or.status}</span>
                      </div>
                    </div>

                    {or.status === 'Pending' && (
                      <button 
                        onClick={() => handleMarkShipped(or.id, or.price)}
                        className="bg-[#8af5be] text-[#00714b] hover:bg-[#00714b] hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-sm"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Earnings Chart: Dynamic visual styling */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-black text-slate-900">Earnings Growth</h3>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 flex flex-col justify-between min-h-[300px]">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Monthly Breakdown (2026)</p>
                <h4 className="text-2xl font-black text-[#006c47]">$12,450.00 <span className="text-xs text-slate-400 font-semibold align-middle">&bull; YTD Total</span></h4>
              </div>

              {/* Visually stunning HTML elements styled as modern chart bars */}
              <div className="flex items-end justify-between gap-2.5 h-36 pt-6 px-1 border-b border-slate-100">
                {[
                  { month: 'Jan', val: '40%' },
                  { month: 'Feb', val: '35%' },
                  { month: 'Mar', val: '55%' },
                  { month: 'Apr', val: '80%' },
                  { month: 'May', val: '65%' },
                  { month: 'Jun', val: '95%' },
                ].map((bar) => (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group/bar">
                    <div className="w-full bg-slate-100 hover:bg-[#8af5be]/50 rounded-t-lg transition-all relative" style={{ height: bar.val }}>
                      <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 text-white rounded text-[8px] font-bold py-0.5 px-1 whitespace-nowrap z-10 pointer-events-none">
                        {bar.val}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#006c47] to-[#8af5be] opacity-90 rounded-t-lg"></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bar.month}</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed mt-4 font-semibold">
                * Based on actual processed transactions in your MarketMate seller profile. Payout schedule executes automatic direct deposit every Thursday.
              </p>
            </div>
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
        <button onClick={() => onNavigate('BuyerDashboard')} className="flex flex-col items-center justify-center text-slate-400 hover:text-[#003d9b] cursor-pointer">
          <span className="material-symbols-outlined">local_mall</span>
          <span className="text-[10px] sm:text-xs">Dashboard</span>
        </button>
        <button onClick={() => onNavigate('SellerDashboard')} className="flex flex-col items-center justify-center text-[#006c47] font-bold cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <span className="text-[10px] sm:text-xs">Seller</span>
        </button>
      </nav>

    </div>
  );
};
