import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: string;
  isStockTissenza: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  onAddToCart?: () => void;
  onClick?: () => void;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  seller,
  isStockTissenza,
  rating,
  reviewCount,
  inStock,
  onAddToCart,
  onClick
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium">
              Rupture
            </span>
          </div>
        )}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-[#C1121F] text-[#C1121F]' : 'text-gray-400'}`}
          />
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-2 min-h-[40px]">
          {name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isStockTissenza 
              ? 'bg-[#0F7B6C] text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {isStockTissenza ? 'Stock Tissenza' : seller}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(rating)
                  ? 'fill-[#FFC300] text-[#FFC300]'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-[#0F7B6C]">
            {price.toLocaleString()} CFA
          </span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {originalPrice.toLocaleString()} CFA
            </span>
          )}
        </div>

        {inStock && (
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#FFC300] hover:bg-[#FFC300]/90 text-gray-900 font-semibold h-9"
          >
            Ajouter au panier
          </Button>
        )}
      </div>
    </div>
  );
}
