import { useState } from 'react';
import { ArrowLeft, MoreVertical, Trash2, Plus, Minus, Ticket, AlertTriangle, X, MapPin, Clock, Check, Copy, Download, Package } from 'lucide-react';
import { KentePattern } from './KentePattern';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variants: string[];
  stock: number;
  vendorId: string;
}

interface Vendor {
  id: string;
  name: string;
  rating: number;
  items: CartItem[];
  deliveryFee: number;
}

export function CartScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Boutique Mode AfroStyle',
      rating: 4.8,
      deliveryFee: 2500,
      items: [
        {
          id: '1',
          name: 'Robe Wax Traditionnelle',
          price: 15000,
          quantity: 2,
          image: 'https://picsum.photos/seed/robe-wax/80/80.jpg',
          variants: ['Taille M', 'Rouge'],
          stock: 3,
          vendorId: '1'
        },
        {
          id: '2',
          name: 'Boubou Homme Élégant',
          price: 25000,
          quantity: 1,
          image: 'https://picsum.photos/seed/boubou-homme/80/80.jpg',
          variants: ['Taille L', 'Bleu'],
          stock: 5,
          vendorId: '1'
        }
      ]
    },
    {
      id: '2',
      name: 'Stock Tissenza',
      rating: 4.6,
      deliveryFee: 0,
      items: [
        {
          id: '3',
          name: 'Sandales Africaines',
          price: 12000,
          quantity: 1,
          image: 'https://picsum.photos/seed/sandales-africaines/80/80.jpg',
          variants: ['Taille 42', 'Noir'],
          stock: 2,
          vendorId: '2'
        }
      ]
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const calculateVendorSubtotal = (vendor: Vendor) => {
    return vendor.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateVendorTotal = (vendor: Vendor) => {
    return calculateVendorSubtotal(vendor) + vendor.deliveryFee;
  };

  const calculateCartTotal = () => {
    return vendors.reduce((sum, vendor) => sum + calculateVendorTotal(vendor), 0);
  };

  const calculateTotalItems = () => {
    return vendors.reduce((sum, vendor) => sum + vendor.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
  };

  const updateQuantity = (vendorId: string, itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setVendors(prevVendors => 
      prevVendors.map(vendor => 
        vendor.id === vendorId 
          ? {
              ...vendor,
              items: vendor.items.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
              )
            }
          : vendor
      )
    );
  };

  const removeItem = (vendorId: string, itemId: string) => {
    setVendors(prevVendors => 
      prevVendors.map(vendor => 
        vendor.id === vendorId 
          ? {
              ...vendor,
              items: vendor.items.filter(item => item.id !== itemId)
            }
          : vendor
      ).filter(vendor => vendor.items.length > 0)
    );
  };

  const applyPromoCode = () => {
    if (promoCode === 'PROMO20') {
      setPromoApplied(true);
    }
  };

  const totalItems = calculateTotalItems();
  const cartTotal = calculateCartTotal();
  const discount = promoApplied ? 5000 : 0;
  const finalTotal = cartTotal - discount;

  if (vendors.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-[#0F7B6C] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft 
              className="w-6 h-6 cursor-pointer" 
              onClick={() => onNavigate('search')}
            />
            <h1 className="text-lg font-semibold">Mon Panier</h1>
          </div>
          <MoreVertical className="w-6 h-6" />
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 px-8">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Votre panier est vide</h2>
          <p className="text-gray-600 mb-8">Explorez nos catégories !</p>
          <button 
            onClick={() => onNavigate('search')}
            className="bg-[#FFC300] text-[#1F2937] px-8 py-3 rounded-xl font-semibold hover:bg-[#FFD700] transition-colors"
          >
            Découvrir les produits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('search')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Mon Panier</h1>
              <p className="text-xs opacity-90">{totalItems} articles</p>
            </div>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl py-2 w-56 z-50 border border-gray-100">
                <button className="w-full text-left px-4 py-3 text-[#1F2937] hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span>Vider le panier</span>
                </button>
                <button className="w-full text-left px-4 py-3 text-[#1F2937] hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Package className="w-4 h-4 text-[#0F7B6C]" />
                  <span>Sauvegarder</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Saved Cart Notice */}
      <div className="mx-4 mt-4">
        <div className="bg-gradient-to-r from-[#1E3A8A]/10 to-[#1E3A8A]/5 border border-[#1E3A8A]/20 p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1E3A8A]/20 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-[#1E3A8A]" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#1E3A8A] font-medium">Panier sauvegardé automatiquement</p>
            <p className="text-xs text-[#1E3A8A]/80">Valable 30 jours</p>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="p-4 space-y-4">
        {vendors.map((vendor, vendorIndex) => (
          <div key={vendor.id}>
            {/* Vendor Section */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              {/* Vendor Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0F7B6C]/10 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#0F7B6C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F2937]">{vendor.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="text-sm text-gray-600">{vendor.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="text-[#0F7B6C] text-sm font-medium">
                  Voir la boutique →
                </button>
              </div>

              {/* Products */}
              <div className="space-y-4">
                {vendor.items.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://picsum.photos/seed/product-${item.id}/80/80.jpg`;
                          }}
                        />
                        {item.stock <= 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{item.stock}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1F2937] line-clamp-2 text-sm">{item.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.variants.map(variant => (
                            <span key={variant} className="bg-white px-2 py-1 rounded-lg text-xs border border-gray-200">
                              {variant}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-[#0F7B6C] font-bold">{item.price.toLocaleString()} CFA</p>
                          <p className={`text-xs ${item.stock <= 3 ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
                            {item.stock <= 3 ? `Plus que ${item.stock}!` : `${item.stock} en stock`}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <button 
                          onClick={() => removeItem(vendor.id, item.id)}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                          title="Retirer du panier"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200">
                            <button 
                              onClick={() => updateQuantity(vendor.id, item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-l-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(vendor.id, item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-r-lg bg-[#0F7B6C] text-white flex items-center justify-center hover:bg-[#0E6A5D] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <p className="font-bold text-[#0F7B6C] text-sm">
                            {(item.price * item.quantity).toLocaleString()} CFA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vendor Subtotal */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total produits:</span>
                  <span className="font-medium">{calculateVendorSubtotal(vendor).toLocaleString()} CFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frais de livraison:</span>
                  <span className={`font-medium ${vendor.deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {vendor.deliveryFee === 0 ? 'Gratuit ✓' : vendor.deliveryFee.toLocaleString() + ' CFA'}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-[#1F2937]">Total vendeur:</span>
                  <span className="font-bold text-[#0F7B6C] text-lg">{calculateVendorTotal(vendor).toLocaleString()} CFA</span>
                </div>
              </div>
            </div>

            {/* Kente Pattern Divider */}
            {vendorIndex < vendors.length - 1 && <KentePattern className="my-4" />}
          </div>
        ))}

        {/* Promo Code Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
              <Ticket className="w-5 h-5 text-[#FFC300]" />
            </div>
            <input
              type="text"
              placeholder="Code promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0F7B6C] focus:ring-1 focus:ring-[#0F7B6C]/20 transition-all"
            />
            <button 
              onClick={applyPromoCode}
              className="px-6 py-3 bg-[#0F7B6C] text-white rounded-xl hover:bg-[#0E6A5D] transition-colors font-medium"
            >
              Appliquer
            </button>
          </div>
          {promoApplied && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800 font-medium">Code PROMO20 appliqué (-5,000 CFA)</span>
            </div>
          )}
        </div>

        {/* Stock Alert Banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-orange-800 font-medium">
                Le prix de 'Robe Wax' a changé: 18,000 → 20,000 CFA
              </p>
              <p className="text-xs text-orange-600 mt-1">
                Le nouveau prix sera appliqué lors de la validation
              </p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1 bg-white border border-orange-200 text-orange-600 rounded-lg text-sm hover:bg-orange-50 transition-colors">
                  Retirer
                </button>
                <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition-colors">
                  Garder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 max-w-[430px] mx-auto border-t border-gray-100">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Récapitulatif de la commande</span>
            <span className="text-xs text-gray-500">{totalItems} articles</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sous-total produits:</span>
              <span className="font-medium">{cartTotal.toLocaleString()} CFA</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Frais de livraison:</span>
              <span className="font-medium">{vendors.reduce((sum, v) => sum + v.deliveryFee, 0).toLocaleString()} CFA</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Réduction PROMO20:</span>
                <span className="font-medium">-{discount.toLocaleString()} CFA</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">TOTAL À PAYER:</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#0F7B6C]">{finalTotal.toLocaleString()}</span>
                <span className="text-sm text-[#0F7B6C] ml-1">CFA</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('checkout-step1')}
          className="w-full bg-gradient-to-r from-[#FFC300] to-[#FFD700] text-[#1F2937] py-4 rounded-xl font-bold hover:from-[#FFD700] hover:to-[#FFC300] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
        >
          <span>Commander ({totalItems} articles)</span>
          <ArrowLeft className="w-5 h-5 rotate-180" />
        </button>
      </div>
    </div>
  );
}
