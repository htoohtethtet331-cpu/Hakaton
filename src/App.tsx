import { useState } from 'react';
import { AppScreen, UserProfile, MarketplaceProduct, BuyerOrder } from './types';
import { 
  INITIAL_USER, 
  INITIAL_PRODUCTS, 
  INITIAL_BUYER_ORDERS 
} from './data';

// Import All Screen Components 
import { ViewSelector } from './components/ViewSelector';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { MarketplaceHubScreen } from './components/MarketplaceHubScreen';
import { FeedScreen } from './components/FeedScreen';
import { BuyerDashboardScreen } from './components/BuyerDashboardScreen';
import { SellerDashboardScreen } from './components/SellerDashboardScreen';
import { SuperAdminScreen } from './components/SuperAdminScreen';

export default function App() {
  // Global Shared States 
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('Welcome');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [productsList, setProductsList] = useState<MarketplaceProduct[]>(INITIAL_PRODUCTS);
  const [buyerOrders, setBuyerOrders] = useState<BuyerOrder[]>(INITIAL_BUYER_ORDERS);
  const [savedProductIds, setSavedProductIds] = useState<string[]>(['prod-2', 'prod-4']);

  // Shipment shipment tracker modal
  const [trackingOrder, setTrackingOrder] = useState<BuyerOrder | null>(null);

  // Core callback actions 
  const handleUpdateUserProfile = (updatedFields: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const handleAddNewProductListing = (newProduct: MarketplaceProduct) => {
    setProductsList((prev) => [newProduct, ...prev]);
  };

  const handleToggleSavedStatus = (productId: string) => {
    setSavedProductIds((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleBuyProductCheckout = (product: MarketplaceProduct) => {
    // Subtract from wallet balance
    if (userProfile.walletBalance < product.price) {
      alert(`Warning: Insufficient Wallet Balance. Added $${product.price} to your simulation account automatically to proceed with authorized purchase!`);
      setUserProfile((prev) => ({
        ...prev,
        walletBalance: prev.walletBalance + product.price,
      }));
    }

    setUserProfile((prev) => ({
      ...prev,
      walletBalance: Math.max(0, prev.walletBalance - product.price),
      matePoints: prev.matePoints + 120, // Buy award
    }));

    const newOrderRecord: BuyerOrder = {
      id: `bo-${Date.now()}`,
      productTitle: product.title,
      orderNumber: `#MM-${Math.floor(10000 + Math.random() * 90000)}`,
      arrivesString: 'Estimated Friday Delivery',
      status: 'Processing',
      price: product.price,
      image: product.image,
    };

    setBuyerOrders((prev) => [newOrderRecord, ...prev]);
  };

  const handleTriggerAddFunds = () => {
    setUserProfile((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + 500,
    }));
    alert("Simulation Mode: Added $500.00 to your wallet successfully!");
  };

  // Simulate logging into various account templates
  const handleLoginWithEmail = (email: string) => {
    let chosenName = 'John Doe';
    let chosenRole: 'buyer' | 'seller' = 'buyer';

    if (email.toLowerCase().includes('alex')) {
      chosenName = 'Alex Rivera';
      chosenRole = 'buyer';
    } else if (email.toLowerCase().includes('felix')) {
      chosenName = 'Felix Vance';
      chosenRole = 'buyer';
    } else if (email.toLowerCase().includes('seller')) {
      chosenName = 'Marcus Thorne';
      chosenRole = 'seller';
    }

    setUserProfile((prev) => ({
      ...prev,
      name: chosenName,
      email: email,
      role: chosenRole,
    }));

    setCurrentScreen('MarketplaceHub');
  };

  const handleRegisterWithRole = (accountData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    role: 'buyer' | 'seller';
  }) => {
    setUserProfile((prev) => ({
      ...prev,
      name: accountData.name,
      email: accountData.email,
      phone: accountData.phone,
      location: accountData.location,
      role: accountData.role,
    }));

    setCurrentScreen('Onboarding');
  };

  // Filtered saved products list objects
  const favoritedProductsList = productsList.filter((p) => savedProductIds.includes(p.id));

  return (
    <div className="bg-[#faf9ff] min-h-screen selection:bg-[#003d9b]/10 font-sans">
      
      {/* Simulation ViewSelector navbar */}
      <ViewSelector currentScreen={currentScreen} setScreen={setCurrentScreen} />

      {/* Screen view router with standard smooth entrances */}
      <div className="transition-all duration-300">
        {currentScreen === 'Welcome' && (
          <WelcomeScreen onNavigate={setCurrentScreen} />
        )}
        
        {currentScreen === 'Login' && (
          <LoginScreen onNavigate={setCurrentScreen} onLoginSuccess={handleLoginWithEmail} />
        )}
        
        {currentScreen === 'Register' && (
          <RegisterScreen onNavigate={setCurrentScreen} onRegisterSuccess={handleRegisterWithRole} />
        )}
        
        {currentScreen === 'Onboarding' && (
          <OnboardingScreen 
            user={userProfile} 
            onUpdateUser={handleUpdateUserProfile} 
            onNavigate={setCurrentScreen} 
          />
        )}
        
        {currentScreen === 'MarketplaceHub' && (
          <MarketplaceHubScreen 
            user={userProfile} 
            products={productsList} 
            savedIds={savedProductIds} 
            onToggleSaved={handleToggleSavedStatus} 
            onNavigate={setCurrentScreen}
            onAddProduct={handleAddNewProductListing}
          />
        )}
        
        {currentScreen === 'Feed' && (
          <FeedScreen 
            user={userProfile} 
            products={productsList} 
            savedIds={savedProductIds} 
            onToggleSaved={handleToggleSavedStatus} 
            onNavigate={setCurrentScreen}
            onBuyProduct={handleBuyProductCheckout}
            onAddProduct={handleAddNewProductListing}
          />
        )}
        
        {currentScreen === 'BuyerDashboard' && (
          <BuyerDashboardScreen 
            user={userProfile} 
            orders={buyerOrders} 
            savedProducts={favoritedProductsList} 
            savedIds={savedProductIds} 
            onToggleSaved={handleToggleSavedStatus} 
            onNavigate={setCurrentScreen}
            onTrackOrder={setTrackingOrder}
            onAddFunds={handleTriggerAddFunds}
          />
        )}
        
        {currentScreen === 'SellerDashboard' && (
          <SellerDashboardScreen user={userProfile} onNavigate={setCurrentScreen} />
        )}
        
        {currentScreen === 'SuperAdmin' && (
          <SuperAdminScreen onNavigate={setCurrentScreen} />
        )}
      </div>

      {/* Shared Tracking Status Overlay Dialog */}
      {trackingOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Real-Time Package Dispatch</h3>
              <button onClick={() => setTrackingOrder(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="py-4 flex gap-4 items-center">
              <img src={trackingOrder.image} alt={trackingOrder.productTitle} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="text-xs font-bold text-slate-800 truncate max-w-xs">{trackingOrder.productTitle}</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Order Number: {trackingOrder.orderNumber} &bull; ${trackingOrder.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Shipment Track checkpoints */}
            <div className="space-y-4 pl-3.5 py-2.5 relative border-l-2 border-slate-100 ml-4">
              <div className="relative">
                <div className="absolute left-[-23px] top-0 bg-[#006c47] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[8px]">✓</div>
                <p className="text-xs font-bold text-slate-800">Escrow Authorized &amp; Verified</p>
                <p className="text-[10px] text-slate-450 font-medium">Funds deposited into holding reserve.</p>
              </div>
              <div className="relative">
                <div className="absolute left-[-23px] top-0 bg-[#006c47] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[8px]">✓</div>
                <p className="text-xs font-bold text-slate-800">Seller Accepted &amp; Procured Package</p>
                <p className="text-[10px] text-slate-450 font-medium">TechHub Global prepared package for shipping.</p>
              </div>
              <div className="relative">
                <div className="absolute left-[-23px] top-0 bg-[#003d9b] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[8px] animate-pulse">✓</div>
                <p className="text-xs font-bold text-[#003d9b]">In Transit • Outbound Logistics</p>
                <p className="text-[10px] text-[#003d9b] font-medium">En route to Delivery Hub in {userProfile.location.split(',')[0]}.</p>
              </div>
              <div className="opacity-45 relative">
                <div className="absolute left-[-23px] top-0 bg-slate-200 text-slate-600 rounded-full w-4 h-4 flex items-center justify-center font-bold text-[8px]">4</div>
                <p className="text-xs font-bold text-slate-800">Delivered</p>
                <p className="text-[10px] text-slate-450 font-medium">Receive authorization and release escrow.</p>
              </div>
            </div>

            <button 
              onClick={() => setTrackingOrder(null)}
              className="mt-6 w-full py-3 bg-[#003d9b] hover:bg-[#0052cc] text-white rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
            >
              Close Tracker
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
