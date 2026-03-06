import { useState } from 'react';
import { ArrowLeft, MoreVertical, Copy, Clock, Truck, Phone, Star, MapPin, Package, ChevronDown, ChevronUp, MessageCircle, HelpCircle, AlertTriangle, X, Check } from 'lucide-react';
import { KentePattern } from './KentePattern';

interface TimelineStep {
  id: string;
  title: string;
  timestamp: string;
  details: string;
  status: 'completed' | 'current' | 'pending';
  icon?: string;
  trackingCode?: string;
  courierInfo?: {
    name: string;
    phone: string;
    rating: number;
    avatar: string;
  };
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  variants: string[];
  quantity: number;
  price: number;
}

export function OrderTrackingScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  const [expandedItems, setExpandedItems] = useState(false);
  const [expandedPayment, setExpandedPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  const orderData = {
    orderNumber: 'TIS-20260305-142',
    orderDate: '5 mars 2026, 14:23',
    status: 'En livraison',
    estimatedDelivery: 'Aujourd\'hui, 16:00 - 18:00',
    vendor: 'Mode AfroStyle',
    totalItems: 3,
    totalAmount: 47500,
    deliveryFee: 2500,
    discount: 0,
    paymentMethod: 'Orange Money'
  };

  const timeline: TimelineStep[] = [
    {
      id: '1',
      title: 'Commande validée',
      timestamp: '5 mars, 14:25',
      details: 'Paiement confirmé via Orange Money',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Acceptée par le vendeur',
      timestamp: '5 mars, 14:45',
      details: 'Mode AfroStyle a accepté votre commande',
      status: 'completed'
    },
    {
      id: '3',
      title: 'En préparation',
      timestamp: '5 mars, 15:30',
      details: 'Articles en cours d\'emballage',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Expédié',
      timestamp: '5 mars, 16:10',
      details: 'Colis remis au livreur',
      status: 'completed',
      trackingCode: 'TRK-2026-ABCD123'
    },
    {
      id: '5',
      title: 'En livraison',
      timestamp: '5 mars, 16:45',
      details: 'Livreur en route vers votre adresse',
      status: 'current',
      courierInfo: {
        name: 'Mamadou Diallo',
        phone: '+221 77 123 45 67',
        rating: 4.9,
        avatar: 'https://picsum.photos/seed/courier-mamadou/60/60.jpg'
      }
    },
    {
      id: '6',
      title: 'Livrée',
      timestamp: 'Aujourd\'hui, 17:30',
      details: 'Livraison à votre adresse',
      status: 'pending'
    }
  ];

  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Robe Wax Traditionnelle',
      image: 'https://picsum.photos/seed/robe-wax/60/60.jpg',
      variants: ['Taille M', 'Rouge'],
      quantity: 2,
      price: 15000
    },
    {
      id: '2',
      name: 'Boubou Homme Élégant',
      image: 'https://picsum.photos/seed/boubou-homme/60/60.jpg',
      variants: ['Taille L', 'Bleu'],
      quantity: 1,
      price: 25000
    }
  ];

  const deliveryAddress = {
    label: 'Maison',
    fullAddress: 'Cité Keur Gorgui, Villa 234, près pharmacie, Dakar'
  };

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTrackingCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const renderTimelineIcon = (step: TimelineStep) => {
    if (step.status === 'completed') {
      return (
        <div className="w-12 h-12 bg-[#0F7B6C] rounded-full flex items-center justify-center">
          <Check className="w-6 h-6 text-white" />
        </div>
      );
    } else if (step.status === 'current') {
      return (
        <div className="w-12 h-12 bg-[#1E3A8A] rounded-full flex items-center justify-center animate-pulse">
          <Truck className="w-6 h-6 text-white" />
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 border-2 border-gray-300 rounded-full" />
      );
    }
  };

  const renderTimelineConnector = (index: number, totalSteps: number) => {
    if (index >= totalSteps - 1) return null;
    
    const step = timeline[index];
    if (step.status === 'completed') {
      return <div className="w-0.5 h-16 bg-[#0F7B6C] ml-6" />;
    } else if (step.status === 'current') {
      return <div className="w-0.5 h-16 border-l-2 border-dashed border-[#1E3A8A] ml-6" />;
    } else {
      return <div className="w-0.5 h-16 border-l-2 border-dashed border-gray-300 ml-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('checkout-confirmation')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Suivi de commande</h1>
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
                  <MessageCircle className="w-4 h-4 text-[#0F7B6C]" />
                  <span>Contacter le vendeur</span>
                </button>
                <button className="w-full text-left px-4 py-3 text-[#1F2937] hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Package className="w-4 h-4 text-[#0F7B6C]" />
                  <span>Télécharger facture</span>
                </button>
                <button 
                  onClick={() => onNavigate('order-cancellation')}
                  className="w-full text-left px-4 py-3 text-[#C1121F] hover:bg-red-50 transition-colors flex items-center gap-3"
                >
                  <X className="w-4 h-4" />
                  <span>Annuler la commande</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order ID Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#1F2937]">#{orderData.orderNumber}</span>
                <button 
                  onClick={handleCopyOrderNumber}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600">{orderData.orderDate}</p>
            </div>
            <div className="bg-[#0F7B6C] text-white px-3 py-1 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">{orderData.status}</span>
              <Truck className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Estimated Delivery Banner */}
        <div className="bg-gradient-to-r from-[#FFC300] to-[#FFD700] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Livraison estimée:</p>
              <p className="text-white text-xl font-bold">{orderData.estimatedDelivery}</p>
              <p className="text-white/80 text-sm">Mise à jour en temps réel</p>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-[#0F7B6C]">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-[#1E3A8A] rounded-full flex items-center justify-center animate-pulse">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1F2937] text-lg">En livraison</h3>
              <p className="text-gray-600 mb-3">Votre colis est en route</p>
              
              {timeline[4].courierInfo && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <img 
                      src={timeline[4].courierInfo!.avatar}
                      alt="Livreur"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#1F2937]">{timeline[4].courierInfo!.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-gray-600">{timeline[4].courierInfo!.rating}</span>
                        </div>
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                          <Phone className="w-3 h-3 text-[#0F7B6C]" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('order-map')}
                    className="w-full bg-[#0F7B6C] text-white py-2 rounded-lg font-medium hover:bg-[#0E6A5D] transition-colors"
                  >
                    Suivre en temps réel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline Progression */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-4">Historique de la commande</h3>
          <div className="space-y-4">
            {timeline.map((step, index) => (
              <div key={step.id}>
                <div className="flex gap-4">
                  {renderTimelineIcon(step)}
                  <div className="flex-1">
                    <h4 className={`font-semibold text-[#1F2937] ${
                      step.status === 'current' ? 'text-lg' : ''
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600">{step.timestamp}</p>
                    <p className="text-sm text-gray-700 mt-1">{step.details}</p>
                    
                    {step.trackingCode && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                          {step.trackingCode}
                        </span>
                        <button 
                          onClick={() => handleCopyTrackingCode(step.trackingCode!)}
                          className="text-xs text-[#0F7B6C] hover:underline"
                        >
                          Copier
                        </button>
                      </div>
                    )}
                    
                    {step.status === 'current' && (
                      <p className="text-sm text-[#1E3A8A] font-medium mt-2">
                        Distance: 2.3 km
                      </p>
                    )}
                  </div>
                </div>
                {renderTimelineConnector(index, timeline.length)}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#0F7B6C]/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#0F7B6C]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#1F2937] mb-1">Adresse de livraison</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="bg-[#0F7B6C]/10 px-2 py-1 rounded text-xs font-medium text-[#0F7B6C]">
                      {deliveryAddress.label}
                    </span>
                    <p className="text-sm text-gray-700 mt-1">{deliveryAddress.fullAddress}</p>
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <button className="text-sm text-[#0F7B6C] hover:underline mt-2">
                Voir sur la carte
              </button>
            </div>
          </div>
        </div>

        {/* Items Preview */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedItems(!expandedItems)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-[#1F2937]">
              {orderData.totalItems} articles commandés
            </span>
            {expandedItems ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          
          {expandedItems && (
            <div className="px-4 pb-4 border-t space-y-3">
              {orderItems.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#1F2937] text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.variants.join(' • ')} • x{item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-[#0F7B6C] text-sm">
                    {(item.price * item.quantity).toLocaleString()} CFA
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedPayment(!expandedPayment)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-[#1F2937]">
              Récapitulatif paiement
            </span>
            {expandedPayment ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          
          {expandedPayment && (
            <div className="px-4 pb-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total:</span>
                <span>{orderData.totalAmount.toLocaleString()} CFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Livraison:</span>
                <span>{orderData.deliveryFee.toLocaleString()} CFA</span>
              </div>
              {orderData.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Réduction:</span>
                  <span>-{orderData.discount.toLocaleString()} CFA</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-[#0F7B6C]">
                  {(orderData.totalAmount + orderData.deliveryFee - orderData.discount).toLocaleString()} CFA
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-orange-500">🟠</span>
                <span className="text-sm text-gray-600">{orderData.paymentMethod}</span>
              </div>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-3">Besoin d'aide ?</h3>
          <div className="space-y-2">
            <button className="w-full p-3 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-4 h-4 text-[#0F7B6C]" />
              <span className="text-sm font-medium">Contacter le vendeur</span>
            </button>
            <button className="w-full p-3 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-sm font-medium">Contacter le support</span>
            </button>
            <button className="w-full p-3 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors">
              <HelpCircle className="w-4 h-4 text-[#FFC300]" />
              <span className="text-sm font-medium">FAQ livraison</span>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('order-cancellation')}
            className="w-full border border-[#C1121F] text-[#C1121F] py-3 rounded-xl font-medium hover:bg-red-50 transition-colors"
          >
            Annuler la commande
          </button>
          <button className="w-full text-[#0F7B6C] py-2 font-medium hover:underline">
            Signaler un problème
          </button>
        </div>
      </div>
    </div>
  );
}
