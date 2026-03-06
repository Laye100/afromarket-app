import { ArrowLeft, Share2, Heart, Star, ChevronRight, Plus, Minus, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProductCard } from './ProductCard';
import { toast } from 'sonner';
import { KentePattern } from './KentePattern';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailScreenProps {
  productId?: string;
  onNavigate: (screen: string) => void;
}

// Mock data for the product
const productData = {
  id: '1',
  name: 'Tissu Wax Premium Motif Floral Africain',
  price: 8500,
  originalPrice: 12000,
  discount: 25,
  images: [
    'https://images.unsplash.com/photo-1768212565424-efa3a3852b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1745122552632-404174b2ed6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1710559056465-6a71e5089342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1598122666068-59b41e0a3193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ],
  rating: 4.6,
  reviewCount: 127,
  seller: {
    name: 'Mode AfroStyle',
    avatar: 'https://images.unsplash.com/photo-1737759123065-823f8882c244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    rating: 4.8,
    isStockTissenza: false,
    isVerified: true
  },
  stock: {
    status: 'available', // 'available', 'limited', 'outofstock'
    quantity: 12
  },
  category: 'Tissus Africains',
  details: {
    type: 'Wax Premium',
    colors: ['Rouge', 'Jaune', 'Vert'],
    composition: '100% Coton',
    width: '120cm',
    occasions: ['Mariage', 'Cérémonies']
  },
  description: 'Magnifique tissu Wax Premium aux motifs floraux africains authentiques. Parfait pour la confection de robes, chemises et accessoires traditionnels. Ce tissu de haute qualité est reconnu pour sa durabilité et ses couleurs éclatantes qui résistent au temps.',
};

const reviews = [
  {
    id: '1',
    userName: 'Aminata Diop',
    avatar: 'https://images.unsplash.com/photo-1710115529093-1188449565f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    rating: 5,
    date: '2 mars 2026',
    text: 'Tissu de très belle qualité ! Les couleurs sont vives et le tissu est doux au toucher. Parfait pour ma robe de cérémonie.',
    helpful: 12,
    notHelpful: 1,
    images: []
  },
  {
    id: '2',
    userName: 'Mamadou Sow',
    avatar: 'https://images.unsplash.com/photo-1737759123065-823f8882c244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    rating: 4,
    date: '28 février 2026',
    text: 'Bon rapport qualité-prix. Livraison rapide et emballage soigné.',
    helpful: 8,
    notHelpful: 0,
    images: []
  },
  {
    id: '3',
    userName: 'Fatoumata Traoré',
    avatar: 'https://images.unsplash.com/photo-1723922970319-6f92727e13cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    rating: 5,
    date: '25 février 2026',
    text: 'Absolument magnifique ! J\'ai commandé 5 mètres et je suis ravie du résultat. Je recommande vivement.',
    helpful: 15,
    notHelpful: 0,
    images: []
  }
];

const similarProducts = [
  {
    id: '2',
    name: 'Tissu Pagne Traditionnel',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1745122552632-404174b2ed6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Tissenza',
    isStockTissenza: true,
    rating: 4.5,
    reviewCount: 78,
    inStock: true
  },
  {
    id: '3',
    name: 'Dentelle Guipure Premium',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1710559056465-6a71e5089342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    seller: 'Tissenza',
    isStockTissenza: true,
    rating: 4.7,
    reviewCount: 145,
    inStock: true
  }
];

export function ProductDetailScreen({ onNavigate }: ProductDetailScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(3);
  const [selectedWidth, setSelectedWidth] = useState('120cm');
  const [expandedDescription, setExpandedDescription] = useState(false);

  const handleShare = () => {
    toast.success('Lien copié dans le presse-papiers');
  };

  const handleAddToCart = () => {
    toast.success('Produit ajouté au panier', {
      description: `${quantity} mètres de ${productData.name}`,
      duration: 3000,
    });
  };

  const ratingBreakdown = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Image Gallery */}
      <div className="relative bg-white">
        <div className="relative aspect-square overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={productData.images[currentImageIndex]}
              alt={productData.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentImageIndex + 1}/{productData.images.length}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => onNavigate('search')}
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#C1121F] text-[#C1121F]' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {productData.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Info Card */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-4 pt-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {productData.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(productData.rating)
                    ? 'fill-[#FFC300] text-[#FFC300]'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold">{productData.rating}</span>
          <span className="text-sm text-gray-500">({productData.reviewCount} avis)</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-bold text-[#0F7B6C]">
            {productData.price.toLocaleString()} CFA
          </span>
          {productData.originalPrice && (
            <>
              <span className="text-lg text-gray-400 line-through">
                {productData.originalPrice.toLocaleString()} CFA
              </span>
              <Badge className="bg-[#C1121F] text-white">
                -{productData.discount}%
              </Badge>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-6">/mètre</p>

        <KentePattern height={8} />

        {/* Seller Card */}
        <div className="my-6 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={productData.seller.avatar}
                alt={productData.seller.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{productData.seller.name}</h3>
                  {productData.seller.isVerified && (
                    <Badge className="bg-[#0F7B6C] text-white text-xs">
                      Vérifié ✓
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(productData.seller.rating)
                          ? 'fill-[#FFC300] text-[#FFC300]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">{productData.seller.rating}</span>
                </div>
              </div>
            </div>
            <button className="text-[#0F7B6C] text-sm font-medium flex items-center gap-1">
              Voir la boutique
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stock Indicator */}
        <div className="mb-6">
          {productData.stock.status === 'available' && (
            <div className="flex items-center gap-2 text-[#0F7B6C]">
              <div className="w-2 h-2 bg-[#0F7B6C] rounded-full"></div>
              <span className="text-sm font-medium">
                En stock ({productData.stock.quantity} unités)
              </span>
            </div>
          )}
          {productData.stock.status === 'limited' && (
            <div className="flex items-center gap-2 text-orange-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                Stock limité ({productData.stock.quantity} restants)
              </span>
            </div>
          )}
        </div>

        {/* Category-Specific: Tissus Africains */}
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Type</p>
            <Badge variant="outline" className="text-base">
              {productData.details.type}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Couleurs</p>
            <div className="flex gap-2">
              {productData.details.colors.map((color, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Composition</p>
            <span className="text-sm font-medium">{productData.details.composition}</span>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Largeur</p>
            <div className="flex gap-2">
              {['90cm', '120cm', '150cm'].map((width) => (
                <button
                  key={width}
                  onClick={() => setSelectedWidth(width)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedWidth === width
                      ? 'border-[#0F7B6C] bg-[#0F7B6C] text-white'
                      : 'border-gray-300 hover:border-[#0F7B6C]'
                  }`}
                >
                  {width}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Occasions</p>
            <div className="flex gap-2">
              {productData.details.occasions.map((occasion, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#FFC300]/20 text-gray-900 rounded-full text-sm">
                  {occasion}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Métrage</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-16 text-center font-semibold text-lg">
                  {quantity}m
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                {[2, 5, 10].map((m) => (
                  <button
                    key={m}
                    onClick={() => setQuantity(m)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-[#0F7B6C] hover:text-[#0F7B6C]"
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <KentePattern height={8} />

        {/* Description */}
        <div className="my-6">
          <h3 className="text-lg font-bold mb-3">Description</h3>
          <p className={`text-gray-700 leading-relaxed ${!expandedDescription && 'line-clamp-4'}`}>
            {productData.description}
          </p>
          <button
            onClick={() => setExpandedDescription(!expandedDescription)}
            className="text-[#0F7B6C] font-medium text-sm mt-2"
          >
            {expandedDescription ? 'Lire moins' : 'Lire plus'}
          </button>
        </div>

        {/* Reviews Section */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Avis clients ({productData.reviewCount})</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Plus récents</option>
              <option>Plus utiles</option>
              <option>Meilleurs notes</option>
            </select>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2 mb-6">
            {ratingBreakdown.map(({ stars, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm w-8">{stars}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFC300]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
              </div>
            ))}
          </div>

          {/* Review Cards */}
          <div className="space-y-4">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{review.userName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? 'fill-[#FFC300] text-[#FFC300]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {review.text}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-[#0F7B6C]">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-[#C1121F]">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{review.notHelpful}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 border border-[#0F7B6C] text-[#0F7B6C] rounded-lg font-semibold hover:bg-[#0F7B6C] hover:text-white transition-colors">
            Voir tous les avis
          </button>
        </div>

        <KentePattern height={8} />

        {/* Similar Products */}
        <div className="my-6">
          <h3 className="text-lg font-bold mb-4">Vous aimerez aussi</h3>
          <div className="grid grid-cols-2 gap-4">
            {similarProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => toast.success('Ajouté au panier')}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        {/* Report Button */}
        <button className="text-gray-400 text-sm text-center w-full py-4 hover:text-gray-600">
          Signaler ce produit
        </button>

        <div className="h-24"></div>
      </div>

      {/* Sticky Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-[430px] mx-auto flex gap-3">
        <Button
          onClick={handleAddToCart}
          className="flex-[3] bg-[#FFC300] hover:bg-[#FFC300]/90 text-gray-900 font-semibold h-12 text-base"
        >
          Ajouter au panier
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsFavorite(!isFavorite)}
          className="flex-1 h-12"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#C1121F] text-[#C1121F]' : ''}`} />
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          className="flex-1 h-12"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
