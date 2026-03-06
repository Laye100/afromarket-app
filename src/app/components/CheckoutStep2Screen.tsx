import { useState } from 'react';
import { ArrowLeft, Truck, Package, Info, Check } from 'lucide-react';

interface DeliveryOption {
  id: string;
  vendorId: string;
  vendorName: string;
  type: string;
  description: string;
  estimatedTime: string;
  price: number;
  info?: string;
}

export function CheckoutStep2Screen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    '1': 'standard',
    '2': 'free'
  });

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      vendorId: '1',
      vendorName: 'Mode AfroStyle',
      type: 'standard',
      description: 'Livraison coordonnée par l\'admin',
      estimatedTime: 'Délai: 2-4 jours ouvrables',
      price: 2500,
      info: 'Livrée par coursier agréé Tissenza'
    },
    {
      id: 'express',
      vendorId: '1',
      vendorName: 'Mode AfroStyle',
      type: 'express',
      description: 'Livraison express',
      estimatedTime: 'Délai: 24-48 heures',
      price: 5000,
      info: 'Livraison prioritaire par coursier spécialisé'
    },
    {
      id: 'free',
      vendorId: '2',
      vendorName: 'Stock Tissenza',
      type: 'free',
      description: 'Livraison standard',
      estimatedTime: 'Délai: 3-5 jours ouvrables',
      price: 0,
      info: 'Livraison gratuite dès 50,000 CFA'
    },
    {
      id: 'pickup',
      vendorId: '2',
      vendorName: 'Stock Tissenza',
      type: 'pickup',
      description: 'Retrait en magasin',
      estimatedTime: 'Disponible immédiatement',
      price: 0,
      info: 'Venez retirer votre commande à notre point de vente'
    }
  ];

  const vendors = [
    {
      id: '1',
      name: 'Mode AfroStyle',
      options: deliveryOptions.filter(opt => opt.vendorId === '1')
    },
    {
      id: '2',
      name: 'Stock Tissenza',
      options: deliveryOptions.filter(opt => opt.vendorId === '2')
    }
  ];

  const handleSelectOption = (vendorId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [vendorId]: optionId
    }));
  };

  const calculateTotalShipping = () => {
    return vendors.reduce((total, vendor) => {
      const selectedOption = deliveryOptions.find(
        opt => opt.vendorId === vendor.id && opt.id === selectedOptions[vendor.id]
      );
      return total + (selectedOption?.price || 0);
    }, 0);
  };

  const getMaxDeliveryTime = () => {
    const times = vendors.map(vendor => {
      const selectedOption = deliveryOptions.find(
        opt => opt.vendorId === vendor.id && opt.id === selectedOptions[vendor.id]
      );
      return selectedOption?.estimatedTime || '';
    });
    
    // Extract maximum days from estimated time strings
    const days = times.map(time => {
      const match = time.match(/(\d+)\s*(?:jour|jours)/i);
      return match ? parseInt(match[1]) : 0;
    });
    
    return Math.max(...days);
  };

  const totalShipping = calculateTotalShipping();
  const maxDays = getMaxDeliveryTime();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-[#0F7B6C] text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => onNavigate('checkout-step1')}
          />
          <h1 className="text-lg font-semibold">Mode de livraison</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-3/4 rounded-full" />
          </div>
          <span className="text-xs">3/4</span>
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-0 rounded-full" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Combined Shipping Notice */}
        <div className="bg-[#1E3A8A]/10 border border-[#1E3A8A]/20 rounded-xl p-4 flex items-center gap-3">
          <Package className="w-5 h-5 text-[#1E3A8A]" />
          <div>
            <p className="text-[#1E3A8A] font-medium">Envoi groupé possible !</p>
            <p className="text-sm text-[#1E3A8A]/80">Économisez 1,000 CFA</p>
          </div>
        </div>

        {/* Delivery Options by Vendor */}
        {vendors.map(vendor => (
          <div key={vendor.id}>
            <h2 className="text-lg font-semibold text-[#1F2937] mb-4">
              {vendor.name}
            </h2>
            <div className="space-y-3">
              {vendor.options.map(option => (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(vendor.id, option.id)}
                  className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${
                    selectedOptions[vendor.id] === option.id
                      ? 'border-[#0F7B6C] shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {/* Radio Button */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                        selectedOptions[vendor.id] === option.id
                          ? 'border-[#0F7B6C]'
                          : 'border-gray-300'
                      }`}>
                        {selectedOptions[vendor.id] === option.id && (
                          <div className="w-2.5 h-2.5 bg-[#0F7B6C] rounded-full" />
                        )}
                      </div>
                      
                      {/* Option Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className="w-5 h-5 text-[#0F7B6C]" />
                          <h3 className="font-semibold text-[#1F2937]">{option.description}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{option.estimatedTime}</p>
                        {option.info && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Info className="w-3 h-3" />
                            <span>{option.info}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      {option.price === 0 ? (
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                          Gratuit
                        </span>
                      ) : (
                        <span className="font-bold text-[#1F2937]">
                          {option.price.toLocaleString()} CFA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Total Shipping Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-3">Récapitulatif de la livraison</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Frais de livraison totaux:</span>
              <span className="font-semibold">
                {totalShipping === 0 ? 'Gratuit' : totalShipping.toLocaleString() + ' CFA'}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Délai maximum:</span>
              <span>{maxDays} jours</span>
            </div>
          </div>
          
          {/* Vendor Breakdown */}
          <div className="border-t mt-3 pt-3 space-y-2">
            {vendors.map(vendor => {
              const selectedOption = deliveryOptions.find(
                opt => opt.vendorId === vendor.id && opt.id === selectedOptions[vendor.id]
              );
              return (
                <div key={vendor.id} className="flex justify-between text-xs text-gray-600">
                  <span>{vendor.name}:</span>
                  <span>
                    {selectedOption?.price === 0 ? 'Gratuit' : selectedOption?.price.toLocaleString() + ' CFA'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Info Cards */}
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-blue-600" />
              <h4 className="font-medium text-blue-900">Livraison sécurisée</h4>
            </div>
            <p className="text-sm text-blue-800">
              Tous vos colis sont assurés et suivis en temps réel
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-green-600" />
              <h4 className="font-medium text-green-900">Livraison par partenaires locaux</h4>
            </div>
            <p className="text-sm text-green-800">
              Nous travaillons avec les meilleurs coursiers de votre région
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-[430px] mx-auto">
        <div className="mb-3 text-center">
          <p className="text-sm text-gray-600">
            Frais de livraison: <span className="font-semibold">
              {totalShipping === 0 ? 'Gratuit' : totalShipping.toLocaleString() + ' CFA'}
            </span>
          </p>
        </div>
        <button 
          onClick={() => onNavigate('checkout-step3')}
          className="w-full bg-[#FFC300] text-[#1F2937] py-4 rounded-xl font-semibold hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-2"
        >
          Continuer vers le paiement
          <ArrowLeft className="w-5 h-5 rotate-180" />
        </button>
      </div>
    </div>
  );
}
