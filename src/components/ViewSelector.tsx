import React from 'react';
import { AppScreen } from '../types';

interface ViewSelectorProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentScreen, setScreen }) => {
  const screens: { value: AppScreen; label: string; icon: string; color: string }[] = [
    { value: 'Welcome', label: 'Welcome Portal', icon: 'waving_hand', color: 'bg-primary' },
    { value: 'Login', label: 'Login Client', icon: 'login', color: 'bg-primary' },
    { value: 'Register', label: 'Register Account', icon: 'person_add', color: 'bg-primary' },
    { value: 'Onboarding', label: 'Profile Setup', icon: 'badge', color: 'bg-primary' },
    { value: 'MarketplaceHub', label: 'Marketplace Hub', icon: 'hub', color: 'bg-indigo-600' },
    { value: 'Feed', label: 'Product Feed', icon: 'shopping_bag', color: 'bg-indigo-600' },
    { value: 'BuyerDashboard', label: 'Buyer Dashboard', icon: 'local_mall', color: 'bg-indigo-600' },
    { value: 'SellerDashboard', label: 'Seller Panel', icon: 'storefront', color: 'bg-emerald-700' },
    { value: 'SuperAdmin', label: 'Super Admin', icon: 'admin_panel_settings', color: 'bg-slate-800' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-3 px-4 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl font-bold">view_cozy</span>
          <div>
            <h4 className="font-bold text-slate-900 tracking-tight text-sm">MarketMate Simulation Sandbox</h4>
            <p className="text-xs text-slate-500 font-medium">Click any viewport profile to preview each exact layout design</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 items-center">
          {screens.map((sc) => {
            const isActive = currentScreen === sc.value;
            return (
              <button
                key={sc.value}
                onClick={() => setScreen(sc.value)}
                className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  isActive
                    ? `${sc.color} text-white shadow-md scale-105`
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-sm !font-semibold">{sc.icon}</span>
                {sc.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
