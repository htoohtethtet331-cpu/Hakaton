import React, { useState } from 'react';
import { AppScreen } from '../types';
import { 
  INITIAL_MODERATION_CASES, 
  INITIAL_USER_ACTIVITIES, 
  AdminModerationCase, 
  AdminUserActivity 
} from '../data';

interface SuperAdminScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const SuperAdminScreen: React.FC<SuperAdminScreenProps> = ({ onNavigate }) => {
  const [cases, setCases] = useState<AdminModerationCase[]>(INITIAL_MODERATION_CASES);
  const [users, setUsers] = useState<AdminUserActivity[]>(INITIAL_USER_ACTIVITIES);
  const [sysLog, setSysLog] = useState<string[]>([
    'System audit check completed: 0 threat signatures flagged.',
    'Escrow balance synced with vault balance: OK',
  ]);

  const handleResolveCase = (id: string, decision: string) => {
    setCases(cases.filter(c => c.id !== id));
    setSysLog([`Moderation case ${id} resolved with action: ${decision}.`, ...sysLog]);
    alert(`Case ${id} successfully resolved: ${decision}`);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Suspended' ? 'Active' : 'Suspended';
        const nextTime = nextStatus === 'Active' ? 'Activated now' : 'Admin Restricted';
        return { ...u, status: nextStatus, timeAgo: nextTime };
      }
      return u;
    }));
    setSysLog([`User credential status mutated for profile ID ${id}.`, ...sysLog]);
  };

  return (
    <div className="bg-[#0b132b] text-slate-100 min-h-[calc(100vh-64px)] pb-24 font-mono select-none">
      
      {/* Admin header rail */}
      <header className="bg-[#1c2541] border-b border-slate-850 h-16 flex items-center justify-between px-6 sticky top-14 z-40">
        <div className="flex items-center gap-3">
          <span onClick={() => onNavigate('MarketplaceHub')} className="material-symbols-outlined text-rose-500 font-bold text-2xl cursor-pointer">arrow_back</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-500">terminal</span>
            <span className="font-extrabold text-[#8af5be] text-sm md:text-base tracking-wider uppercase">MarketMate ROOT_ADMIN //</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>CLUSTER_ONLINE</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* Dynamic Warning Alert */}
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-center gap-3 text-rose-400 text-xs">
          <span className="material-symbols-outlined">warning</span>
          <div>
            <span className="font-bold">ADMIN WARNING:</span> You are currently logged in with ROOT permissions. Actions executed in this environment directly affect system escrow deposits and client listings.
          </div>
        </div>

        {/* Audit summary metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#1c2541] p-5 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold">REPORTS PENDING</p>
            <p className="text-2xl font-bold mt-1 text-rose-400">{cases.length} cases</p>
          </div>
          <div className="bg-[#1c2541] p-5 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold">TOTAL ACCOUNTS</p>
            <p className="text-2xl font-bold mt-1 text-slate-100">83,219 accounts</p>
          </div>
          <div className="bg-[#1c2541] p-5 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold">ESCROW RESERVE</p>
            <p className="text-2xl font-bold mt-1 text-emerald-400">$340,512.19</p>
          </div>
          <div className="bg-[#1c2541] p-5 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold">PLATFORM FEE RATE</p>
            <p className="text-2xl font-bold mt-1 text-[#e1e8ff]">2.5% fixed</p>
          </div>
        </div>

        {/* Root Panel Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Block: Reported items queue - Page 8 */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-extrabold text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-400 text-sm">gavel</span>
              Moderation Audit Queue
            </h3>

            {cases.length === 0 ? (
              <div className="p-8 text-center bg-[#1c2541] rounded-2xl border border-dashed border-slate-800 text-slate-400 text-sm">
                Clean Queue. All reporting issues resolved!
              </div>
            ) : (
              <div className="space-y-4">
                {cases.map((c) => (
                  <div key={c.id} className="bg-[#1c2541] rounded-2xl p-5 border border-slate-800 flex gap-4">
                    {c.image && (
                      <img src={c.image} alt={c.title} className="w-16 h-16 rounded-xl object-cover shrink-0 select-none bg-slate-900 border border-slate-800" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-white truncate">{c.title}</h4>
                          <span className="text-[9px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">{c.reason}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">{c.type} &bull; Filed by {c.reporter}</p>
                      </div>

                      <div className="flex gap-2.5 mt-4">
                        <button 
                          onClick={() => handleResolveCase(c.id, 'Dismissed / Kept')}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold cursor-pointer border border-slate-700"
                        >
                          Dismiss Case
                        </button>
                        <button 
                          onClick={() => handleResolveCase(c.id, 'Banned / Censored')}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold cursor-pointer"
                        >
                          Enforce Ban
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Block: Database Users Audit Table - Page 8 */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-extrabold text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-sm">database</span>
              User Account Database
            </h3>

            <div className="bg-[#1c2541] rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800 bg-slate-900/40 text-[10px] text-slate-400 font-bold flex justify-between">
                <span>PROFILE DETECTED</span>
                <span>STATUS / INTERACTIVE</span>
              </div>
              <div className="divide-y divide-slate-800">
                {users.map((u) => (
                  <div key={u.id} className="p-4 flex justify-between items-center bg-transparent hover:bg-slate-900/20 transition-colors">
                    <div className="flex gap-3 items-center min-w-0">
                      <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover bg-slate-900 shrink-0 border border-slate-800 select-none" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{u.name}</h4>
                        <p className="text-[9px] text-slate-400 leading-none mt-1">{u.joined} &bull; {u.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[8px] tracking-wide font-black uppercase px-2 py-0.5 rounded border ${
                        u.status === 'Active' 
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                          : u.status === 'Offline'
                          ? 'text-slate-400 bg-slate-500/10 border-slate-800'
                          : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                      }`}>
                        {u.status}
                      </span>
                      <button 
                        onClick={() => handleToggleUserStatus(u.id)}
                        className="text-[9px] font-bold text-[#8af5be] hover:underline cursor-pointer"
                      >
                        {u.status === 'Suspended' ? 'Unban' : 'Suspend'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Console activity logs */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">REAL-TIME DAEMON LOGS</span>
              <div className="bg-black/40 rounded-xl p-4 border border-slate-800 text-[9px] text-[#8af5be] space-y-1 max-h-[140px] overflow-y-auto">
                {sysLog.map((log, index) => (
                  <p key={index} className="leading-relaxed">&gt; {log}</p>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};
