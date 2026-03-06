import { ArrowLeft, Search, Mic, ShoppingCart, SlidersHorizontal, Grid2X2, List } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { FilterModal } from './FilterModal';
import { BottomNav } from './BottomNav';
import { toast } from 'sonner';
import { KentePattern } from './KentePattern';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Tissu Wax Premium Motif Floral Africain',
    price: 8500,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1768212565424-efa3a3852b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Tissenza',
    isStockTissenza: true,
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    category: 'Tissus Africains'
  },
  {
    id: '2',
    name: 'Robe Traditionnelle Kente Élégante',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1710559056465-6a71e5089342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Mode AfroStyle',
    isStockTissenza: false,
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    category: 'Vêtements'
  },
  {
    id: '3',
    name: 'Ensemble Complet Bazin Richement Brodé',
    price: 45000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1598122666068-59b41e0a3193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Tissenza',
    isStockTissenza: true,
    rating: 4.9,
    reviewCount: 234,
    inStock: true,
    category: 'Vêtements'
  },
  {
    id: '4',
    name: 'Sandales Cuir Artisanales Africaines',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1628375385879-1af64230c2e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Chaussures Afrique',
    isStockTissenza: false,
    rating: 4.3,
    reviewCount: 56,
    inStock: true,
    category: 'Chaussures'
  },
  {
    id: '5',
    name: 'Smartphone Samsung Galaxy A54 256GB',
    price: 185000,
    originalPrice: 210000,
    image: 'https://images.unsplash.com/photo-1605188378873-3ddf764e6fff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Tech Store',
    isStockTissenza: false,
    rating: 4.7,
    reviewCount: 342,
    inStock: false,
    category: 'Électronique'
  },
  {
    id: '6',
    name: 'Tissu Pagne Traditionnel Multicolore',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1745122552632-404174b2ed6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Tissenza',
    isStockTissenza: true,
    rating: 4.5,
    reviewCount: 78,
    inStock: true,
    category: 'Tissus Africains'
  },
  {
    id: '7',
    name: 'Boubou Homme en Bazin Richelieu',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1768212565424-efa3a3852b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Mode Masculine',
    isStockTissenza: false,
    rating: 4.4,
    reviewCount: 92,
    inStock: true,
    category: 'Vêtements'
  },
  {
    id: '8',
    name: 'Dentelle Guipure Premium Qualité',
    price: 12000,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1710559056465-6a71e5089342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Tissenza',
    isStockTissenza: true,
    rating: 4.7,
    reviewCount: 145,
    inStock: true,
    category: 'Tissus Africains'
  }
];

const recentSearches = ['Wax Ankara', 'Robe de soirée', 'Chaussures homme'];
const popularSearches = ['Tissus Africains', 'Bazin richement', 'Pagne traditionnel', 'Smartphones'];
const categories = ['Tissus Africains', 'Vêtements', 'Chaussures', 'Électronique', 'Accessoires', 'Beauté'];

interface ProductSearchScreenProps {
  onNavigate: (screen: string, productId?: string) => void;
}

export function ProductSearchScreen({ onNavigate }: ProductSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Pertinence');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cartCount, setCartCount] = useState(3);
  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    toast.success(`${productName} ajouté au panier`, {
      duration: 2000,
    });
  };

  const handleProductClick = (productId: string) => {
    onNavigate('productDetail', productId);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-[#0F7B6C] px-4 py-3 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1 relative">
            <div className="bg-white rounded-full flex items-center px-4 py-2.5">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Rechercher wax, chaussures, téléphone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
              />
              <button className="ml-2">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <button className="text-white relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C1121F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="bg-white shadow-lg absolute top-[60px] left-0 right-0 z-30 max-w-[430px] mx-auto">
          <div className="p-4">
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">RECHERCHES RÉCENTES</p>
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(search);
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-2 py-2 hover:bg-gray-50 w-full text-left"
                >
                  <span className="text-gray-400">🕐</span>
                  <span className="text-sm">{search}</span>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">RECHERCHES POPULAIRES</p>
              {popularSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(search);
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-2 py-2 hover:bg-gray-50 w-full text-left"
                >
                  <span>🔥</span>
                  <span className="text-sm">{search}</span>
                </button>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">CATÉGORIES</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(cat);
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-2 bg-[#F8F9FA] rounded-full text-sm whitespace-nowrap hover:bg-[#0F7B6C] hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white border-b sticky top-[60px] z-30 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-[#0F7B6C] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">Filtres</span>
          <span className="bg-[#C1121F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium outline-none cursor-pointer"
        >
          <option>Pertinence</option>
          <option>Prix ↓</option>
          <option>Prix ↑</option>
          <option>Nouveautés</option>
        </select>

        <div className="flex gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#0F7B6C] text-white' : 'text-gray-400'}`}
          >
            <Grid2X2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#0F7B6C] text-white' : 'text-gray-400'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Kente Divider */}
      <div className="my-4">
        <KentePattern height={8} />
      </div>

      {/* Results Section */}
      <div className="px-4">
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold text-gray-900">{products.length} produits</span> trouvés
        </p>

        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => handleAddToCart(product.name)}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>

        {/* Load More */}
        <button className="w-full mt-6 mb-8 py-3 border border-[#0F7B6C] text-[#0F7B6C] rounded-lg font-semibold hover:bg-[#0F7B6C] hover:text-white transition-colors">
          Charger plus de produits
        </button>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        resultCount={products.length}
      />

      {/* Bottom Navigation */}
      <BottomNav activeTab="search" />
    </div>
  );
}
