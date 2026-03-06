import { useState } from 'react';
import { ArrowLeft, Calendar, Info, Check, X, AlertTriangle, Package } from 'lucide-react';

interface ReturnableProduct {
  id: string;
  name: string;
  image: string;
  variants: string;
  price: number;
  quantity: number;
  eligible: boolean;
  ineligibleReason?: string;
}

export function ReturnRequestStep1Screen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showIneligibleModal, setShowIneligibleModal] = useState(false);
  const [ineligibleProduct, setIneligibleProduct] = useState<ReturnableProduct | null>(null);

  const orderData = {
    orderNumber: 'TIS-20260305-142',
    orderDate: '5 mars 2026',
    deliveryDate: '7 mars 2026',
    returnDeadline: '14 mars 2026',
    daysRemaining: 6
  };

  const products: ReturnableProduct[] = [
    {
      id: '1',
      name: 'Robe Wax élégante',
      image: 'https://picsum.photos/seed/robe-wax-elegant/80/80.jpg',
      variants: 'Taille M · Rouge',
      price: 18000,
      quantity: 2,
      eligible: true
    },
    {
      id: '2',
      name: 'Boubou Homme Traditionnel',
      image: 'https://picsum.photos/seed/boubou-traditionnel/80/80.jpg',
      variants: 'Taille L · Bleu',
      price: 25000,
      quantity: 1,
      eligible: true
    },
    {
      id: '3',
      name: 'Accessoires Traditionnels',
      image: 'https://picsum.photos/seed/accessoires-traditionnels/80/80.jpg',
      variants: 'Lot de 3 pièces',
      price: 8000,
      quantity: 1,
      eligible: false,
      ineligibleReason: 'Délai de 7 jours dépassé (reçu il y a 12 jours)'
    }
  ];

  const handleProductToggle = (productId: string) => {
    const product = products.find(p => p.id === productId);
    
    if (!product?.eligible) {
      setIneligibleProduct(product || null);
      setShowIneligibleModal(true);
      return;
    }

    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateSelectedTotal = () => {
    return products
      .filter(p => selectedProducts.includes(p.id))
      .reduce((sum, p) => sum + (p.price * p.quantity), 0);
  };

  const selectedTotal = calculateSelectedTotal();
  const hasSelection = selectedProducts.length > 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('order-tracking')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Demander un retour</h1>
              <p className="text-xs opacity-90">Étape 1/3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Commande #{orderData.orderNumber}</p>
              <p className="text-xs text-gray-500">
                Commandé: {orderData.orderDate} • Livré: {orderData.deliveryDate}
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">Retour possible jusqu'au {orderData.returnDeadline}</p>
                <p className="text-sm text-green-800">{orderData.daysRemaining} jours restants</p>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Check Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Conditions de retour:</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-800">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Délai: 7 jours après livraison</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Produit non utilisé/non découpé/non porté</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Emballage d'origine conservé</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Photos obligatoires pour validation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Selection Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-2">Sélectionnez le(s) produit(s) à retourner</h3>
          <p className="text-sm text-gray-600 mb-4">{products.length} articles dans cette commande</p>
          
          <div className="space-y-3">
            {products.map(product => (
              <div
                key={product.id}
                onClick={() => handleProductToggle(product.id)}
                className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                  selectedProducts.includes(product.id)
                    ? 'border-[#0F7B6C] bg-[#0F7B6C]/5'
                    : product.eligible
                    ? 'border-gray-200 hover:border-gray-300'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedProducts.includes(product.id)
                      ? 'border-[#0F7B6C] bg-[#0F7B6C]'
                      : product.eligible
                      ? 'border-gray-300'
                      : 'border-gray-300 bg-gray-200'
                  }`}>
                    {selectedProducts.includes(product.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  
                  {/* Product Image */}
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  
                  {/* Product Info */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#1F2937]">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.variants}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold text-[#0F7B6C]">{product.price.toLocaleString()} CFA</span>
                      <span className="text-sm text-gray-600">x{product.quantity}</span>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      product.eligible
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {product.eligible ? 'Éligible' : 'Non éligible'}
                    </span>
                    {!product.eligible && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIneligibleProduct(product);
                          setShowIneligibleModal(true);
                        }}
                        className="text-xs text-blue-600 hover:underline mt-1"
                      >
                        Pourquoi ?
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Summary (Sticky) */}
      {hasSelection && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 max-w-[430px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">
              {selectedProducts.length} article{selectedProducts.length > 1 ? 's' : ''} sélectionné{selectedProducts.length > 1 ? 's' : ''}
            </span>
            <span className="font-bold text-[#0F7B6C]">
              {selectedTotal.toLocaleString()} CFA
            </span>
          </div>
          <button 
            onClick={() => onNavigate('return-step2')}
            className="w-full bg-[#FFC300] text-[#1F2937] py-3 rounded-xl font-semibold hover:bg-[#FFD700] transition-colors"
          >
            Continuer
          </button>
        </div>
      )}

      {/* Ineligible Product Modal */}
      {showIneligibleModal && ineligibleProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-[#1F2937]">Produit non retournable</h3>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 mb-2">
                {ineligibleProduct.name}
              </p>
              <p className="text-sm text-orange-800 font-medium">
                {ineligibleProduct.ineligibleReason}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Les produits non retournables incluent:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Délai de 7 jours dépassé</li>
                <li>• Catégorie non retournable (produits alimentaires)</li>
                <li>• Produits déjà retournés</li>
              </ul>
            </div>
            
            <button 
              onClick={() => setShowIneligibleModal(false)}
              className="w-full mt-6 bg-[#0F7B6C] text-white py-3 rounded-xl font-medium hover:bg-[#0E6A5D] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
