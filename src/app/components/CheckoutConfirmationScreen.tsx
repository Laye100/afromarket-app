import { useState } from 'react';
import { Check, Copy, Download, Package, Mail, Smartphone, FileText, ArrowRight, Home, MapPin, Clock } from 'lucide-react';
import { KentePattern } from './KentePattern';

export function CheckoutConfirmationScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [copied, setCopied] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const orderData = {
    orderNumber: 'TIS-20260305-142',
    date: '5 mars 2026, 14:23',
    paymentMethod: 'Orange Money',
    status: 'Paiement confirmé',
    total: 122500,
    items: 7,
    estimatedDelivery: '2-4 jours ouvrables',
    vendors: [
      { name: 'Mode AfroStyle', notified: true },
      { name: 'Stock Tissenza', notified: true }
    ],
    address: {
      label: 'Maison',
      name: 'Abdoulaye Diouf',
      phone: '+221 77 123 45 67',
      fullAddress: 'Cité Keur Gorgui, Villa 234, près pharmacie'
    },
    products: [
      { name: 'Robe Wax Traditionnelle', quantity: 2, price: 15000 },
      { name: 'Boubou Homme Élégant', quantity: 1, price: 25000 },
      { name: 'Sandales Africaines', quantity: 1, price: 12000 },
      { name: 'Accessoires Traditionnels', quantity: 3, price: 8000 }
    ],
    notifications: {
      email: 'abdu***@gmail.com',
      phone: '+221 77 *** ** 67',
      invoiceGenerated: true
    }
  };

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadInvoice = () => {
    // Simulate PDF download
    console.log('Downloading invoice...');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Success Animation Area */}
      <div className="bg-gradient-to-b from-[#0F7B6C] to-[#0E6A5D] text-white p-8 text-center relative overflow-hidden">
        {/* Decorative African Pattern Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 border-4 border-white rounded-full" />
          <div className="absolute top-4 right-4 w-12 h-12 border-4 border-white rounded-full" />
          <div className="absolute bottom-4 left-8 w-8 h-8 border-4 border-white rounded-full" />
          <div className="absolute bottom-4 right-8 w-10 h-10 border-4 border-white rounded-full" />
        </div>
        
        {/* Success Icon */}
        <div className="relative z-10 mb-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check className="w-12 h-12 text-[#0F7B6C]" />
          </div>
          
          {/* Confetti Animation Simulation */}
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-[#FFC300] rounded-full animate-pulse" />
          <div className="absolute top-4 right-1/4 w-2 h-2 bg-[#C1121F] rounded-full animate-pulse delay-75" />
          <div className="absolute top-8 left-1/3 w-2 h-2 bg-[#1E3A8A] rounded-full animate-pulse delay-150" />
          <div className="absolute top-2 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Commande confirmée !</h1>
        <p className="text-lg opacity-90">Merci pour votre achat 🎉</p>
      </div>

      <div className="p-4 space-y-6 pb-8">
        {/* Order Details Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Détails de la commande</h2>
          
          <div className="space-y-4">
            {/* Order Number */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Numéro de commande:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-[#0F7B6C]">
                  #{orderData.orderNumber}
                </span>
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
            </div>
            
            {/* Date and Payment */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
              <span>{orderData.date}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Méthode de paiement:</span>
              <div className="flex items-center gap-1">
                <span className="text-orange-500">🟠</span>
                <span>{orderData.paymentMethod}</span>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Statut:</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Check className="w-3 h-3" />
                {orderData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Items Preview */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setShowItems(!showItems)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-[#1F2937]">
              {orderData.items} articles commandés
            </span>
            <ArrowRight className={`w-4 h-4 text-gray-600 transition-transform ${
              showItems ? 'rotate-90' : ''
            }`} />
          </button>
          
          {showItems && (
            <div className="px-4 pb-4 border-t space-y-3">
              {orderData.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1F2937] text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">Quantité: {product.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#0F7B6C]">
                    {(product.price * product.quantity).toLocaleString()} CFA
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Informations de livraison</h2>
          
          {/* Address Card */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-4 h-4 text-[#0F7B6C]" />
              <span className="bg-[#0F7B6C]/10 px-2 py-1 rounded-lg text-xs font-medium text-[#0F7B6C]">
                {orderData.address.label}
              </span>
            </div>
            <p className="font-medium text-[#1F2937]">{orderData.address.name}</p>
            <p className="text-sm text-gray-600">{orderData.address.phone}</p>
            <p className="text-sm text-gray-700 mt-1">{orderData.address.fullAddress}</p>
          </div>
          
          {/* Delivery Time */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Délai estimé: {orderData.estimatedDelivery}</span>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Vous serez notifié à chaque étape de la livraison
          </p>
        </div>

        {/* Notifications Sent */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Notifications envoyées</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  Email envoyé à: <span className="font-medium">{orderData.notifications.email}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  SMS envoyé au: <span className="font-medium">{orderData.notifications.phone}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">Facture PDF générée</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Notifications */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Vendeurs notifiés</h2>
          
          <div className="space-y-2">
            {orderData.vendors.map((vendor, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">{vendor.name}</span>
                <Check className="w-4 h-4 text-green-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Kente Pattern Divider */}
        <KentePattern className="my-6" />

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('order-tracking')}
            className="w-full bg-[#FFC300] text-[#1F2937] py-4 rounded-xl font-semibold hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-2"
          >
            Suivre ma commande
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleDownloadInvoice}
            className="w-full border border-[#0F7B6C] text-[#0F7B6C] py-3 rounded-xl font-medium hover:bg-[#0F7B6C]/5 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger la facture
          </button>
          
          <button 
            onClick={() => onNavigate('search')}
            className="w-full text-[#0F7B6C] py-3 font-medium hover:underline"
          >
            Continuer mes achats
          </button>
        </div>
      </div>
    </div>
  );
}
