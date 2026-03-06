import { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, Navigation, Clock, Star, Package } from 'lucide-react';

export function OrderMapScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [eta, setEta] = useState(12);
  const [distance, setDistance] = useState('2.3 km');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => Math.max(1, prev - 1));
      setDistance(prev => {
        const currentDistance = parseFloat(prev);
        const newDistance = Math.max(0.1, currentDistance - 0.1);
        return newDistance.toFixed(1) + ' km';
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const courierInfo = {
    name: 'Mamadou Diallo',
    rating: 4.9,
    deliveries: 234,
    vehicle: 'Moto - Plaque: DK-1234-AB',
    avatar: 'https://picsum.photos/seed/courier-mamadou/80/80.jpg',
    phone: '+221 77 123 45 67'
  };

  const orderInfo = {
    items: 3,
    totalAmount: 47500
  };

  const handleCallCourier = () => {
    window.open(`tel:${courierInfo.phone}`);
  };

  const handleMessageCourier = () => {
    // Open messaging app or in-app chat
    console.log('Open chat with courier');
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Map Container */}
      <div className="absolute inset-0">
        {/* Map Placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 relative">
          {/* Simulated Map Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-300" />
              ))}
            </div>
          </div>
          
          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600">
            <path
              d="M 100 500 Q 200 400 250 200"
              stroke="#0F7B6C"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
          
          {/* Delivery Address Pin */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-red-500" />
            </div>
          </div>
          
          {/* Courier Location (Moving) */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ETA Badge */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 z-10">
        <Clock className="w-4 h-4 text-[#0F7B6C]" />
        <span className="font-semibold text-[#1F2937]">Arrivée dans {eta} min</span>
      </div>

      {/* Close Map Button */}
      <button
        onClick={() => onNavigate('order-tracking')}
        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-gray-50 transition-colors"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-20">
        {/* Swipe Indicator */}
        <div className="flex justify-center pt-2 pb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-4 pb-6 space-y-4">
          {/* Courier Info Card */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <img 
                src={courierInfo.avatar}
                alt={courierInfo.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-bold text-[#1F2937] text-lg">{courierInfo.name}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{courierInfo.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({courierInfo.deliveries} livraisons)</span>
                </div>
                <p className="text-sm text-gray-600">{courierInfo.vehicle}</p>
              </div>
            </div>
          </div>

          {/* Live Status */}
          <div className="bg-[#0F7B6C]/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#0F7B6C] font-semibold">À {distance} de vous</span>
              <span className="text-[#0F7B6C] font-bold">Temps estimé: {eta} minutes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] rounded-full transition-all duration-500"
                style={{ width: `${Math.max(10, 100 - (eta * 5))}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCallCourier}
              className="flex-1 bg-[#0F7B6C] text-white py-3 rounded-xl font-semibold hover:bg-[#0E6A5D] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Appeler le livreur
            </button>
            <button
              onClick={handleMessageCourier}
              className="flex-1 border border-[#0F7B6C] text-[#0F7B6C] py-3 rounded-xl font-semibold hover:bg-[#0F7B6C]/5 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Envoyer un message
            </button>
          </div>

          {/* Order Items Preview */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-[#FFC300]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1F2937]">{orderInfo.items} articles</p>
                <p className="text-sm text-gray-600">{orderInfo.totalAmount.toLocaleString()} CFA</p>
              </div>
              <Navigation className="w-5 h-5 text-[#0F7B6C]" />
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-blue-50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Conseils de sécurité</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Vérifiez l'identité du livreur</li>
                  <li>• Restez dans un lieu bien éclairé</li>
                  <li>• Confirmez les articles avant de signer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
