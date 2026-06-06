import React, { useState } from 'react';
import { UserProfile, MarketplaceProduct, AppScreen, BuyerOrder } from '../types';

interface FeedScreenProps {
  user: UserProfile;
  products: MarketplaceProduct[];
  savedIds: string[];
  onToggleSaved: (id: string) => void;
  onNavigate: (screen: AppScreen) => void;
  onBuyProduct: (product: MarketplaceProduct) => void;
  onAddProduct: (newProd: MarketplaceProduct) => void;
}

export const FeedScreen: React.FC<FeedScreenProps> = ({
  user,
  products,
  savedIds,
  onToggleSaved,
  onNavigate,
  onBuyProduct,
  onAddProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Brand New' | 'Second-Hand' | 'Flash Sales'>('All');
  const [requirementText, setRequirementText] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  
  // Sell item modal fast control
  const [showFastSell, setShowFastSell] = useState(false);
  const [sellTitle, setSellTitle] = useState('');
  const [sellPrice, setSellPrice] = useState('150');
  const [sellCondition, setSellCondition] = useState<'Brand New' | 'Second-Hand'>('Brand New');
  const [sellCat, setSellCat] = useState<'Tech' | 'Fashion' | 'Home' | 'Photography' | 'Footwear'>('Tech');

  // Interactive instant checkout confirmation dialog
  const [confirmCheckoutProduct, setConfirmCheckoutProduct] = useState<MarketplaceProduct | null>(null);

  const handlePostRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirementText.trim()) return;
    setToastMessage(`Your buy requirement "${requirementText.trim()}" has been posted successfully to MarketMate system!`);
    setRequirementText('');
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  const handleFastSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellTitle.trim()) return;

    onAddProduct({
      id: `prod-${Date.now()}`,
      title: sellTitle.trim(),
      sellerName: user.name,
      price: parseFloat(sellPrice) || 89,
      isNew: sellCondition === 'Brand New',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6dGHOcFeCgmG5iXXm9rVCSCtqaciWZXZdtsQSe_16mdXnLaIck8o_LmhU2UVh8e-OfmSAdH5xx8laEJ2VtU3DJNcbKMs0Czl2vU6SeqILrJKxVnRhTTKFOysdPvYgb1-1tO-l66x0j5AplL3F_bX4z1KkVTGuzH0jdG3cKGb34fcY5XrOJ8ZpnOkwS5cQJR14N1L1fotL_MZr_TYEqp5LlCI8peXmV9nI2ZZC8ff8bjYUk-nmoNzX4vq4SXFoQ3p596oiHWbW2gC',
      category: sellCat,
      condition: sellCondition,
    });

    setSellTitle('');
    setShowFastSell(false);
    setToastMessage("Product listing created successfully!");
    setTimeout(() => setToastMessage(''), 3000);
  };

  const confirmPurchase = () => {
    if (!confirmCheckoutProduct) return;
    onBuyProduct(confirmCheckoutProduct);
    const title = confirmCheckoutProduct.title;
    setConfirmCheckoutProduct(null);
    setToastMessage(`Success! Purchased ${title}. Order is now tracked in your Buyer Dashboard.`);
    setTimeout(() => {
      setToastMessage('');
    }, 5000);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'Brand New') return p.condition === 'Brand New' && matchesSearch;
    if (activeTab === 'Second-Hand') return p.condition === 'Second-Hand' && matchesSearch;
    if (activeTab === 'Flash Sales') return p.price < 100 && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="bg-[#faf9ff] text-[#051a3e] min-h-[calc(100vh-64px)] pb-24 relative font-sans">
      
      {/* Top sticky app header bar */}
      <header className="fixed top-14 left-0 w-full z-40 bg-white shadow-sm h-16 flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <span onClick={() => onNavigate('MarketplaceHub')} className="material-symbols-outlined text-[#003d9b] font-bold text-2xl cursor-pointer">arrow_back</span>
          <h1 className="text-xl md:text-2xl font-black text-[#003d9b] tracking-tight">MarketMate</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search feed catalog..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 text-slate-800 text-xs px-3.5 py-2 pl-9 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003d9b]/25 border border-slate-200" 
            />
            <span className="material-symbols-outlined text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-xs">search</span>
          </div>
          <button onClick={() => alert("Help topics")} className="p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer">
            <span className="material-symbols-outlined text-base">support</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-24 max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        
        {/* Toast / Actions Alerts */}
        {toastMessage && (
          <div className="p-4 bg-[#8af5be]/20 text-[#00714b] text-xs font-bold rounded-2xl flex items-center gap-2 border border-[#8af5be]/30 shadow-md animate-fade-in">
            <span className="material-symbols-outlined">task_alt</span>
            {toastMessage}
          </div>
        )}

        {/* Post Requirement Box */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 transition-shadow hover:shadow-md">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="flex-1 w-full">
              <h2 className="text-lg font-bold text-[#051a3e] mb-1">What are you looking for today?</h2>
              <p className="text-xs text-slate-500 font-semibold mb-4">Post a custom buyer request or checkout pre-approved products instantly.</p>
              
              <form onSubmit={handlePostRequirement} className="relative group flex items-center">
                <input 
                  type="text" 
                  value={requirementText}
                  onChange={(e) => setRequirementText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm text-[#051a3e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003d9b]/25" 
                  placeholder="I want to buy a Nikon D850..." 
                  required
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1.5 bottom-1.5 bg-[#006c47] text-white px-4 rounded-lg font-bold text-xs hover:bg-[#005235] transition-all cursor-pointer flex items-center"
                >
                  Post
                </button>
              </form>
            </div>

            <div className="flex gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={() => setShowFastSell(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#003d9b] text-white px-5 py-3.5 rounded-xl font-bold text-xs shadow-md shadow-[#003d9b]/10 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                Sell Item
              </button>
              <button 
                onClick={() => { setRequirementText("Acoustic headphones or smart watch"); }}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#003d9b]/70 hover:bg-[#003d9b]/5 text-[#003d9b] px-5 py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">list_alt</span>
                Requests
              </button>
            </div>
          </div>
        </section>

        {/* Categories Tab selector bar */}
        <div className="flex items-center gap-6 border-b border-slate-200 mb-2 overflow-x-auto scrollbar-hide py-1">
          {(['All', 'Brand New', 'Second-Hand', 'Flash Sales'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  isActive 
                    ? 'text-[#003d9b] border-b-2 border-[#003d9b]' 
                    : 'text-slate-400 hover:text-[#003d9b]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Live Filter results display */}
        <div className="text-xs font-bold text-slate-500">
          Showing {filteredProducts.length} matched marketplace items
        </div>

        {/* Product Catalog Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((p) => {
            const isSaved = savedIds.includes(p.id);
            return (
              <div 
                key={p.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 hover:border-[#003d9b]/15 transition-all flex flex-col justify-between"
              >
                {/* Product cover photo with relative badges */}
                <div className="relative aspect-square overflow-hidden bg-slate-50 select-none">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none" 
                    src={p.image} 
                    alt={p.title} 
                  />
                  <div className={`absolute top-2 left-2 text-[8px] sm:text-[10px] font-black px-2 py-0.5 rounded shadow ${
                    p.condition === 'Brand New' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#8af5be] text-[#00714b]'
                  }`}>
                    {p.condition === 'Brand New' ? 'NEW' : '2ND HAND'}
                  </div>
                  <button 
                    onClick={() => onToggleSaved(p.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-rose-600 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer z-10"
                  >
                    <span className="material-symbols-outlined text-sm font-semibold">
                      {isSaved ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                </div>

                {/* Listing metadata and buy action */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{p.title}</h3>
                    <p className="text-[10px] text-slate-500 font-semibold mb-2">{p.sellerName}</p>
                    
                    {/* Unique layout labels based on indicators */}
                    <div className="flex items-center gap-1 mb-1">
                      {p.rating && (
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <span className="material-symbols-outlined text-xs !font-bold">star</span>
                          <span className="text-[10px] font-bold">{p.rating}</span>
                        </div>
                      )}
                      {p.hasShipping && (
                        <span className="material-symbols-outlined text-slate-400 text-sm">local_shipping</span>
                      )}
                      {p.isBestseller && (
                        <span className="material-symbols-outlined text-[#006c47] text-sm">bolt</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-50">
                    <span className="text-sm font-black text-slate-900">${p.price.toFixed(2)}</span>
                    <button 
                      onClick={() => setConfirmCheckoutProduct(p)}
                      className="bg-[#003d9b]/10 text-[#003d9b] hover:bg-[#003d9b] hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                    >
                      Instant Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      </main>

      {/* Persistent Bottom Bar for mobile */}
      <nav className="fixed bottom-0 left-0 w-full z-[80] flex justify-around items-center py-2.5 bg-white border-t border-slate-100 shadow-lg md:hidden">
        <button onClick={() => onNavigate('MarketplaceHub')} className="flex flex-col items-center justify-center text-slate-400 hover:text-[#003d9b] cursor-pointer">
          <span className="material-symbols-outlined text-base">home</span>
          <span className="text-[10px] sm:text-xs">Home</span>
        </button>
        <button onClick={() => onNavigate('Feed')} className="flex flex-col items-center justify-center text-[#003d9b] font-bold cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
          <span className="text-[10px] sm:text-xs">Filter</span>
        </button>
        <button onClick={() => setShowFastSell(true)} className="flex flex-col items-center justify-center text-[#006c47] font-bold cursor-pointer relative -mt-6 bg-white p-1 rounded-full border border-slate-100">
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

      {/* Instant Checkout Confirmation Modal */}
      {confirmCheckoutProduct && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative border border-slate-100 text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-[#0052cc] bg-blue-50 p-4 rounded-full">payment</span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Secure Checkout Order</h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">Authorized Escrow Payment for Premium Listing</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 text-left">
              <img src={confirmCheckoutProduct.image} alt="Checkout item" className="w-12 h-12 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate">{confirmCheckoutProduct.title}</p>
                <p className="text-[10px] text-slate-400 font-medium">Verified by: {confirmCheckoutProduct.sellerName}</p>
              </div>
              <span className="text-sm font-black text-[#003d9b] shrink-0">${confirmCheckoutProduct.price.toFixed(2)}</span>
            </div>

            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              Escrow terms apply. Your funds will remain securely deposited on MarketMate until the seller ships the item and you verify receipt.
            </p>

            <div className="flex gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setConfirmCheckoutProduct(null)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-xs text-slate-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={confirmPurchase}
                className="flex-1 py-3 bg-[#0052cc] hover:bg-[#003d9b] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-md"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fast Sell Modal */}
      {showFastSell && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c47]">add_circle</span>
              Fast Sale Listing
            </h3>
            <form onSubmit={handleFastSellSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">Product Title</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d9b]/25" 
                  placeholder="e.g. Classic Waterproof Watch"
                  value={sellTitle}
                  onChange={(e) => setSellTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d9b]/25" 
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Category</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none"
                    value={sellCat}
                    onChange={(e) => setSellCat(e.target.value as any)}
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
                <label className="text-xs font-bold text-slate-500 block mb-1">Condition</label>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setSellCondition('Brand New')}
                    className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-all ${
                      sellCondition === 'Brand New' ? 'bg-[#8af5be]/30 text-[#00714b] border-[#00714b]' : 'border-slate-200'
                    }`}
                  >
                    Brand New
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSellCondition('Second-Hand')}
                    className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-all ${
                      sellCondition === 'Second-Hand' ? 'bg-amber-50 text-amber-800 border-amber-500' : 'border-slate-200'
                    }`}
                  >
                    Second-Hand
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowFastSell(false)}
                  className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-xs text-slate-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-[#006c47] text-white rounded-xl font-bold text-xs"
                >
                  Publish Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
