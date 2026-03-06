import { useState } from 'react';
import { ArrowLeft, MoreVertical, Copy, Check, Truck, Star, Phone, MessageCircle, Package, ChevronDown, ChevronUp, Camera, Signature } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  status: 'delivering' | 'delivered';
  items: number;
  subtotal: number;
  deliveryFee: number;
  logo: string;
}

interface TimelineStep {
  id: string;
  title: string;
  timestamp: string;
  details: string;
  status: 'completed' | 'current' | 'pending';
  proofImage?: string;
}

export function OrderTrackingMultiVendorScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [activeTab, setActiveTab] = useState('1');
  const [showMenu, setShowMenu] = useState(false);
  const [expandedItems, setExpandedItems] = useState(false);
  const [rating, setRating] = useState(0);
  const [copied, setCopied] = useState(false);

  const orderData = {
    orderNumber: 'TIS-20260305-142',
    orderDate: '5 mars 2026, 14:23',
    overallStatus: 'Partiellement livrée'
  };

  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Mode AfroStyle',
      status: 'delivering',
      items: 2,
      subtotal: 45000,
      deliveryFee: 2500,
      logo: 'https://picsum.photos/seed/mode-afrostyle/40/40.jpg'
    },
    {
      id: '2',
      name: 'Stock Tissenza',
      status: 'delivered',
      items: 1,
      subtotal: 12000,
      deliveryFee: 0,
      logo: 'https://picsum.photos/seed/stock-tissenza/40/40.jpg'
    }
  ];

  const vendor1Timeline: TimelineStep[] = [
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
      status: 'completed'
    },
    {
      id: '5',
      title: 'En livraison',
      timestamp: '5 mars, 16:45',
      details: 'Livreur en route vers votre adresse',
      status: 'current'
    },
    {
      id: '6',
      title: 'Livrée',
      timestamp: 'Aujourd\'hui, 17:30',
      details: 'Livraison à votre adresse',
      status: 'pending'
    }
  ];

  const vendor2Timeline: TimelineStep[] = [
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
      timestamp: '5 mars, 14:30',
      details: 'Stock Tissenza a accepté votre commande',
      status: 'completed'
    },
    {
      id: '3',
      title: 'En préparation',
      timestamp: '5 mars, 14:35',
      details: 'Articles en cours d\'emballage',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Expédié',
      timestamp: '5 mars, 14:40',
      details: 'Colis remis au livreur',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Livrée',
      timestamp: '5 mars, 14:30',
      details: 'Colis livré avec succès',
      status: 'completed',
      proofImage: 'https://picsum.photos/seed/delivery-proof/200/150.jpg'
    }
  ];

  const vendor1Items = [
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

  const vendor2Items = [
    {
      id: '3',
      name: 'Sandales Africaines',
      image: 'https://picsum.photos/seed/sandales-africaines/60/60.jpg',
      variants: ['Taille 42', 'Noir'],
      quantity: 1,
      price: 12000
    }
  ];

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const renderTimelineConnector = (index: number, totalSteps: number, step: TimelineStep) => {
    if (index >= totalSteps - 1) return null;
    
    if (step.status === 'completed') {
      return <div className="w-0.5 h-16 bg-[#0F7B6C] ml-6" />;
    } else if (step.status === 'current') {
      return <div className="w-0.5 h-16 border-l-2 border-dashed border-[#1E3A8A] ml-6" />;
    } else {
      return <div className="w-0.5 h-16 border-l-2 border-dashed border-gray-300 ml-6" />;
    }
  };

  const activeVendor = vendors.find(v => v.id === activeTab);
  const activeTimeline = activeTab === '1' ? vendor1Timeline : vendor2Timeline;
  const activeItems = activeTab === '1' ? vendor1Items : vendor2Items;

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
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Overview Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#1F2937]">#{orderData.orderNumber}</span>
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
              <p className="text-sm text-gray-700 mt-1">Commande de {vendors.length} vendeurs</p>
            </div>
            <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
              <span className="text-sm font-medium">{orderData.overallStatus}</span>
            </div>
          </div>
        </div>

        {/* Vendor Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm">
          <div className="flex gap-2">
            {vendors.map(vendor => (
              <button
                key={vendor.id}
                onClick={() => setActiveTab(vendor.id)}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === vendor.id
                    ? 'bg-[#0F7B6C] text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {vendor.status === 'delivered' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Truck className="w-4 h-4" />
                  )}
                  <span className="text-sm">{vendor.name}</span>
                </div>
                <div className="text-xs mt-1 opacity-80">
                  {vendor.status === 'delivered' ? 'Livrée' : 'En livraison'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {activeTab === '1' && (
          <>
            {/* Vendor Summary Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={vendors[0].logo}
                  alt={vendors[0].name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#1F2937]">{vendors[0].name}</h3>
                  <p className="text-sm text-gray-600">{vendors[0].items} articles</p>
                </div>
                <button className="p-2 bg-[#0F7B6C]/10 rounded-lg hover:bg-[#0F7B6C]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#0F7B6C]" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total:</span>
                  <span>{vendors[0].subtotal.toLocaleString()} CFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Livraison:</span>
                  <span>{vendors[0].deliveryFee.toLocaleString()} CFA</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-[#0F7B6C]">
                    {(vendors[0].subtotal + vendors[0].deliveryFee).toLocaleString()} CFA
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline for Vendor 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-[#1F2937] mb-4">Statut de la livraison</h3>
              <div className="space-y-4">
                {vendor1Timeline.map((step, index) => (
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
                        
                        {step.status === 'current' && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800 font-medium">
                              Livreur en route - Distance: 2.3 km
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {renderTimelineConnector(index, vendor1Timeline.length, step)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === '2' && (
          <>
            {/* Delivery Completed Banner */}
            <div className="bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] text-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Livraison réussie !</h3>
                  <p className="text-white/80">5 mars, 14:30</p>
                </div>
              </div>
            </div>

            {/* Completed Timeline */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-[#1F2937] mb-4">Historique de la livraison</h3>
              <div className="space-y-4">
                {vendor2Timeline.map((step, index) => (
                  <div key={step.id}>
                    <div className="flex gap-4">
                      {renderTimelineIcon(step)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1F2937]">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.timestamp}</p>
                        <p className="text-sm text-gray-700 mt-1">{step.details}</p>
                        
                        {step.id === '5' && step.proofImage && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Preuve de livraison:</p>
                            <div className="bg-gray-50 rounded-lg p-2">
                              <img 
                                src={step.proofImage}
                                alt="Preuve de livraison"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <div className="flex items-center gap-2 mt-2">
                                <Signature className="w-4 h-4 text-gray-600" />
                                <span className="text-xs text-gray-600">Signé par: Abdoulaye Diouf</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {renderTimelineConnector(index, vendor2Timeline.length, step)}
                  </div>
                ))}
              </div>
            </div>

            {/* Rate Your Experience */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-[#1F2937] mb-3">Comment s'est passée la livraison ?</h3>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Star 
                      className={`w-8 h-8 ${
                        star <= rating 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <button className="w-full bg-[#FFC300] text-[#1F2937] py-3 rounded-xl font-medium hover:bg-[#FFD700] transition-colors">
                Laisser un avis
              </button>
            </div>
          </>
        )}

        {/* Items Preview */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedItems(!expandedItems)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-[#1F2937]">
              {activeVendor?.items} articles commandés
            </span>
            {expandedItems ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          
          {expandedItems && (
            <div className="px-4 pb-4 border-t space-y-3">
              {activeItems.map(item => (
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

        {/* Support Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-3">Besoin d'aide ?</h3>
          <div className="space-y-2">
            <button className="w-full p-3 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-4 h-4 text-[#0F7B6C]" />
              <span className="text-sm font-medium">Contacter {activeVendor?.name}</span>
            </button>
            <button className="w-full p-3 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-sm font-medium">Contacter le support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
