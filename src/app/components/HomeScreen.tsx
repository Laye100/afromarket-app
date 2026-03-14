import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Bell, User, Star, Heart, Plus, Filter, TrendingUp, Clock, MapPin, Package, Sparkles, Zap, Store, Menu, X, ChevronRight, ArrowUp, ArrowRight } from 'lucide-react';

export function HomeScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [activeCategory, setActiveCategory] = useState('tendances');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [cartCount, setCartCount] = useState(2);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const categories = [
    { id: 'tendances', name: '🔥 Tendances', icon: '🔥', active: true },
    { id: 'vetements', name: '👗 Vêtements', icon: '👗', active: false },
    { id: 'chaussures', name: '👞 Chaussures', icon: '👞', active: false },
    { id: 'electronique', name: '📱 Électronique', icon: '📱', active: false },
    { id: 'artisanat', name: '🛍️ Artisanat', icon: '🛍️', active: false },
    { id: 'maison', name: '🏠 Maison', icon: '🏠', active: false },
    { id: 'cosmetiques', name: '💄 Cosmétiques', icon: '💄', active: false },
    { id: 'alimentation', name: '🍲 Alimentation', icon: '🍲', active: false },
    { id: 'voir-tout', name: 'Voir tout +', icon: '+', active: false }
  ];

  const banners = [
    {
      id: 1,
      background: 'linear-gradient(135deg, #FFC300 0%, #ff9500 100%)',
      title: 'Big Promo!',
      subtitle: 'jusqu\'à -50%',
      description: 'sur les vêtements!',
      cta: 'Voir les offres',
      image: 'https://picsum.photos/seed/african-woman-shopping/400/200.jpg'
    },
    {
      id: 2,
      background: 'linear-gradient(135deg, #0F7B6C 0%, #12927F 100%)',
      title: 'Nouveautés Artisanat',
      subtitle: 'Découvrez nos',
      description: 'créations uniques',
      cta: 'Explorer',
      image: 'https://picsum.photos/seed/african-crafts/400/200.jpg'
    },
    {
      id: 3,
      background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
      title: 'Livraison Gratuite',
      subtitle: 'dès 50,000 CFA',
      description: 'sur tous les articles',
      cta: 'En profiter',
      image: 'https://picsum.photos/seed/delivery-box/400/200.jpg'
    }
  ];

  const featuredShops = [
    {
      id: 1,
      name: 'Mode AfroStyle',
      avatar: 'https://picsum.photos/seed/shop-afrostyle/80/80.jpg',
      rating: 4.8,
      reviews: 234,
      products: 156,
      delivery: '48h',
      verified: true,
      top: true,
      categories: ['Vêtements', 'Accessoires'],
      background: 'https://picsum.photos/seed/fashion-shop/280/160.jpg'
    },
    {
      id: 2,
      name: 'Boutique Nia',
      avatar: 'https://picsum.photos/seed/shop-nia/80/80.jpg',
      rating: 4.9,
      reviews: 189,
      products: 234,
      delivery: '24h',
      verified: true,
      top: false,
      categories: ['Vêtements', 'Accessoires'],
      background: 'https://picsum.photos/seed/african-fabric/280/160.jpg'
    },
    {
      id: 3,
      name: 'Stock Tissenza',
      avatar: 'https://picsum.photos/seed/shop-tissenza/80/80.jpg',
      rating: 4.7,
      reviews: 1200,
      products: 890,
      delivery: '72h',
      verified: true,
      top: true,
      categories: ['Tissus', 'Artisanat'],
      background: 'https://picsum.photos/seed/fabric-shop/280/160.jpg'
    }
  ];

  const trendingProducts = [
    {
      id: 1,
      name: 'Sandales Africaines',
      price: 7500,
      originalPrice: 10000,
      rating: 4.8,
      reviews: 156,
      vendor: 'Stock Tissenza',
      image: 'https://picsum.photos/seed/african-sandals/200/250.jpg',
      discount: 25,
      badge: 'Per meter',
      stock: 12,
      featured: false
    },
    {
      id: 2,
      name: 'Tissu Wax Premium',
      price: 12000,
      rating: 4.9,
      reviews: 89,
      vendor: 'Boutique Nia',
      image: 'https://picsum.photos/seed/wax-fabric/200/250.jpg',
      badge: 'Qualité',
      stock: 45,
      featured: false
    },
    {
      id: 3,
      name: 'Sac Artisanal',
      price: 25000,
      rating: 4.7,
      reviews: 67,
      vendor: 'Artisan Dakar',
      image: 'https://picsum.photos/seed/handmade-bag/200/250.jpg',
      badge: 'Nouveau',
      new: true,
      stock: 8,
      featured: false
    },
    {
      id: 4,
      name: 'Robe Wax Élégante',
      price: 18000,
      originalPrice: 25000,
      rating: 4.9,
      reviews: 234,
      vendor: 'Mode AfroStyle',
      image: 'https://picsum.photos/seed/wax-dress/400/200.jpg',
      discount: 28,
      badge: 'Coup de Cœur 💛',
      stock: 15,
      featured: true
    },
    {
      id: 5,
      name: 'Écouteurs Bluetooth',
      price: 18000,
      originalPrice: 21000,
      rating: 4.6,
      reviews: 145,
      vendor: 'ElectroSénégal',
      image: 'https://picsum.photos/seed/bluetooth-headphones/200/250.jpg',
      discount: 15,
      badge: 'Top Vente',
      stock: 23,
      featured: false
    },
    {
      id: 6,
      name: 'Parfum Africain',
      price: 15000,
      rating: 4.8,
      reviews: 78,
      vendor: 'Beauté Afrique',
      image: 'https://picsum.photos/seed/african-perfume/200/250.jpg',
      badge: 'Exclusif',
      stock: 5,
      featured: false,
      lowStock: true
    },
    {
      id: 7,
      name: 'Collier Traditionnel',
      price: 8000,
      rating: 4.7,
      reviews: 92,
      vendor: 'Artisan Dakar',
      image: 'https://picsum.photos/seed/traditional-necklace/200/250.jpg',
      badge: 'Artisanal',
      stock: 18,
      featured: false
    },
    {
      id: 8,
      name: 'Tableau Africain',
      price: 35000,
      rating: 4.9,
      reviews: 56,
      vendor: 'Galerie Dakar',
      image: 'https://picsum.photos/seed/african-painting/200/250.jpg',
      badge: 'Art',
      stock: 3,
      featured: false,
      lowStock: true
    }
  ];

  const exploreCategories = [
    {
      id: 'tissus',
      name: 'Tissus Africains',
      icon: '🧵',
      count: 856,
      gradient: 'linear-gradient(135deg, #0F7B6C 0%, #14B8A6 100%)'
    },
    {
      id: 'vetements',
      name: 'Vêtements',
      icon: '👗',
      count: 1234,
      gradient: 'linear-gradient(135deg, #14B8A6 0%, #10B981 100%)'
    },
    {
      id: 'chaussures',
      name: 'Chaussures',
      icon: '👟',
      count: 567,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)'
    },
    {
      id: 'electronique',
      name: 'Électronique',
      icon: '📱',
      count: 423,
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)'
    },
    {
      id: 'artisanat',
      name: 'Artisanat',
      icon: '🛍️',
      count: 789,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)'
    },
    {
      id: 'cosmetiques',
      name: 'Cosmétiques',
      icon: '💄',
      count: 345,
      gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)'
    },
    {
      id: 'maison',
      name: 'Maison & Déco',
      icon: '🏠',
      count: 612,
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)'
    },
    {
      id: 'alimentation',
      name: 'Alimentation',
      icon: '🍲',
      count: 234,
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      onNavigate('search');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Status Bar */}
      <div className="bg-white px-4 py-1 flex justify-between items-center text-xs">
        <span className="font-medium">9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 bg-green-500 rounded-sm" />
          <div className="w-4 h-3 bg-blue-500 rounded-sm" />
          <div className="w-6 h-3 bg-gray-800 rounded-sm" />
        </div>
      </div>

      {/* App Header */}
      <div className="relative">
        <div className="h-44 bg-gradient-to-br from-[#0F7B6C] via-[#0F7B6C] to-[#12927F] relative overflow-hidden">
          {/* African Geometric Patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/20 transform rotate-45" />
            <div className="absolute top-8 right-8 w-12 h-12 border-2 border-white/20 transform -rotate-12" />
            <div className="absolute bottom-4 left-1/2 w-20 h-20 border-2 border-white/20 transform rotate-12" />
          </div>
          
          {/* Kente Pattern Stripe */}
          <div className="absolute bottom-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-red-600" />
            <div className="flex-1 bg-yellow-400" />
            <div className="flex-1 bg-green-600" />
            <div className="flex-1 bg-blue-600" />
            <div className="flex-1 bg-white" />
          </div>

          {/* Header Content */}
          <div className="relative z-10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSideMenu(true)}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div className="relative">
                <div className="w-11 h-11 bg-white rounded-full border-2 border-white flex items-center justify-center">
                  <User className="w-6 h-6 text-[#0F7B6C]" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-white font-bold text-xl">AfroMarket</h1>
              <p className="text-white/80 text-xs">Votre marketplace africaine</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-6 h-6 text-white" />
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {notificationCount}
                  </div>
                )}
              </div>
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFC300] rounded-full flex items-center justify-center text-[#1F2937] text-xs font-bold">
                    {cartCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 sm:px-6 md:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg h-14 flex items-center px-4 max-w-xl mx-auto sm:max-w-none">
          <Search className="w-5 h-5 text-[#0F7B6C] animate-pulse" />
          <input
            type="text"
            placeholder="Rechercher produits, boutiques..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 ml-3 text-[#9CA3AF] placeholder:text-[#9CA3AF] focus:outline-none text-sm"
          />
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Category Pills */}
      <div className="px-4 sm:px-6 md:px-8 mt-3">
        <div className="flex gap-2 overflow-x-auto pb-2 -mt-5 max-w-2xl mx-auto sm:max-w-none">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                category.active
                  ? 'bg-gradient-to-r from-[#FFC300] to-[#ffaa00] text-white shadow-lg transform scale-105'
                  : 'bg-white text-[#0F7B6C] border border-[#0F7B6C]/20 hover:bg-[#0F7B6C]/5'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="px-4 sm:px-6 md:px-8 mt-4">
        <div className="relative h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden max-w-2xl mx-auto sm:max-w-none">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentBanner ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
              style={{ background: banner.background }}
            >
              <div className="h-full flex">
                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center text-white">
                  <h2 className="font-bold text-xl sm:text-2xl mb-1">{banner.title}</h2>
                  <div className="text-3xl sm:text-4xl font-bold mb-1">{banner.subtitle}</div>
                  <p className="text-xs sm:text-sm mb-4">{banner.description}</p>
                  <button className="bg-white text-[#0F7B6C] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-lg">
                    {banner.cta}
                  </button>
                </div>
                <div className="w-2/5 relative hidden sm:block">
                  <img 
                    src={banner.image} 
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Star className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBanner ? 'bg-[#FFC300] w-3' : 'bg-white/50 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Shops Section */}
      <div className="px-4 sm:px-6 md:px-8 mt-6">
        <div className="flex items-center justify-between mb-4 max-w-2xl mx-auto sm:max-w-none">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl text-[#1F2937]">Boutiques Populaires</h2>
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <button className="text-[#0F7B6C] text-sm font-medium flex items-center gap-1">
            Voir tout
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 max-w-2xl mx-auto sm:max-w-none">
          {featuredShops.map((shop) => (
            <div key={shop.id} className="flex-shrink-0 w-72 sm:w-80">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40">
                  <img 
                    src={shop.background} 
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Shop Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {shop.verified && (
                      <div className="bg-white/90 px-2 py-1 rounded text-[#0F7B6C] text-xs font-bold">
                        Certifié ✓
                      </div>
                    )}
                    {shop.top && (
                      <div className="bg-white/90 px-2 py-1 rounded text-yellow-600 text-xs font-bold">
                        Top Vendeur 🏆
                      </div>
                    )}
                  </div>
                  
                  {/* Kente Pattern Accent */}
                  <div className="absolute top-0 left-0 w-1 h-6 bg-gradient-to-b from-red-600 via-yellow-400 to-green-600" />
                </div>
                
                <div className="p-3 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={shop.avatar} 
                      alt={shop.name}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#1F2937]">{shop.name}</h3>
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(shop.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 ml-1">{shop.rating}</span>
                          <span className="text-xs text-gray-500">({shop.reviews} avis)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Package className="w-3 h-3" />
                          <span>{shop.products} produits</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>Livraison {shop.delivery}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {shop.categories.map((cat, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          index === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="px-4 sm:px-6 md:px-8 mt-6">
        <div className="flex items-center justify-between mb-4 max-w-2xl mx-auto sm:max-w-none">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl text-[#1F2937]">Tendances du Moment</h2>
            <div className="text-2xl animate-pulse">🔥</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[#0F7B6C] text-sm font-medium flex items-center gap-1">
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto sm:max-w-none">Les produits les plus populaires du moment</p>

        {/* Featured Product (Full Width) */}
        {trendingProducts.filter(p => p.featured).map((product) => (
          <div key={product.id} className="mb-6 max-w-2xl mx-auto sm:max-w-none">
            <div className="bg-gradient-to-r from-[#FFC300]/10 to-[#FFC300]/5 border border-[#FFC300]/20 rounded-2xl p-4 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-2 left-2 w-16 h-16 border-2 border-yellow-400 transform rotate-45" />
                <div className="absolute bottom-2 right-2 w-12 h-12 border-2 border-yellow-400 transform -rotate-12" />
              </div>
              
              <div className="relative flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 sm:h-32 object-cover rounded-xl"
                    />
                    <div className="absolute top-2 left-2 bg-yellow-400 text-[#1F2937] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <span>💛</span>
                      <span>Coup de Cœur</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      {product.vendor}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-[#1F2937] mb-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-baseline gap-2">
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} CFA
                        </div>
                      )}
                      <div className="font-bold text-xl text-green-600">
                        {product.price.toLocaleString()} CFA
                      </div>
                    </div>
                    {product.discount && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`text-xs ${product.stock <= 5 ? 'text-orange-500' : 'text-green-600'}`}>
                        {product.stock <= 5 ? `Plus que ${product.stock} en stock!` : `${product.stock} disponibles`}
                      </div>
                    </div>
                    <button className="bg-[#FFC300] text-[#1F2937] px-4 py-2 rounded-xl font-medium hover:bg-yellow-400 transition-colors shadow-lg flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Regular Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-2xl mx-auto sm:max-w-none">
          {trendingProducts.filter(p => !p.featured).map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all group">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Product Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {product.discount && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                      -{product.discount}%
                    </div>
                  )}
                  {product.new && (
                    <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Nouveau ✨
                    </div>
                  )}
                </div>
                
                {product.badge && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {product.badge}
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Favorite Button */}
                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform group-hover:bg-red-50">
                  <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
                
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Search className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    {product.vendor}
                  </span>
                </div>
                
                <h3 className="font-semibold text-sm text-[#1F2937] mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()} CFA
                      </div>
                    )}
                    <div className="font-bold text-lg text-green-600">
                      {product.price.toLocaleString()} CFA
                    </div>
                  </div>
                  
                  <button className="w-9 h-9 bg-[#FFC300] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg group-hover:bg-green-600 group-hover:shadow-green-600/30">
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                {/* Stock Indicator */}
                {product.lowStock && (
                  <div className="flex items-center gap-1 text-orange-500 text-xs bg-orange-50 px-2 py-1 rounded">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span>Plus que {product.stock} en stock!</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-6 max-w-2xl mx-auto sm:max-w-none">
          <button className="bg-white border border-[#0F7B6C] text-[#0F7B6C] px-6 py-3 rounded-xl font-medium hover:bg-[#0F7B6C] hover:text-white transition-colors shadow-sm flex items-center gap-2 mx-auto">
            <span>Charger plus de produits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories Explorer Section */}
      <div className="px-4 sm:px-6 md:px-8 mt-6 mb-32">
        <div className="flex items-center gap-2 mb-4 max-w-2xl mx-auto sm:max-w-none">
          <h2 className="font-bold text-xl text-[#1F2937]">Explorer par Catégorie</h2>
          <div className="text-2xl">🗂️</div>
        </div>
        <p className="text-sm text-gray-600 mb-4">Trouvez exactement ce que vous cherchez</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl mx-auto sm:max-w-none">
          {exploreCategories.map((category) => (
            <div key={category.id} className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer">
              <div className="h-32 relative" style={{ background: category.gradient }}>
                {/* Geometric Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 left-2 w-8 h-8 border-2 border-white/30 transform rotate-45" />
                  <div className="absolute bottom-4 right-3 w-6 h-6 border-2 border-white/30 transform -rotate-12" />
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl sm:text-4xl mb-2">{category.icon}</div>
                  <div className="text-white font-bold text-xs sm:text-sm text-center px-2">{category.name}</div>
                  <div className="text-white/80 text-xs text-center">{category.count} produits</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl rounded-t-3xl z-50">
        <div className="max-w-[430px] mx-auto">
          <div className="flex items-center justify-around py-2 px-4">
            <button 
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center gap-1 p-2 text-green-600"
            >
              <div className="w-5 h-5 bg-green-600 rounded" />
              <span className="text-xs font-medium">Accueil</span>
            </button>
            
            <button 
              onClick={() => onNavigate('search')}
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs">Rechercher</span>
            </button>
            
            <button className="relative flex flex-col items-center gap-1">
              <div className="w-14 h-14 bg-gradient-to-r from-[#FFC300] to-orange-500 rounded-full flex items-center justify-center shadow-lg -translate-y-5 hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium mt-1">Vendre</span>
            </button>
            
            <button 
              onClick={() => onNavigate('cart')}
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs">Favoris</span>
            </button>
            
            <button 
              onClick={() => onNavigate('login')}
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Profil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 bg-[#0F7B6C] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-[#12927F] transition-all duration-300 z-40 transform hover:scale-110"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
