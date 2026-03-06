import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Lock, ChevronDown, ChevronUp, Clock, CreditCard, Smartphone } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'mobile' | 'card';
  description: string;
  icon: string;
  color: string;
}

export function CheckoutStep3Screen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedMethod, setSelectedMethod] = useState<string>('orange-money');
  const [expandedSummary, setExpandedSummary] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [countdown, setCountdown] = useState(863); // 14:23 in seconds
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [paymentDetails, setPaymentDetails] = useState({
    orangeMoney: '',
    wave: '',
    freeMoney: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'orange-money',
      name: 'Orange Money',
      type: 'mobile',
      description: 'Paiement sécurisé via USSD',
      icon: '🟠',
      color: 'orange'
    },
    {
      id: 'wave',
      name: 'Wave',
      type: 'mobile',
      description: 'Transfert instantané',
      icon: '🌊',
      color: 'blue'
    },
    {
      id: 'free-money',
      name: 'Free Money',
      type: 'mobile',
      description: 'Paiement mobile',
      icon: '🔵',
      color: 'purple'
    },
    {
      id: 'card',
      name: 'Carte Bancaire',
      type: 'card',
      description: 'Visa, Mastercard via Stripe',
      icon: '💳',
      color: 'gray'
    }
  ];

  // Order details
  const orderSummary = {
    items: 7,
    subtotal: 125000,
    shipping: 2500,
    discount: 5000,
    total: 122500
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayment = async () => {
    if (!termsAccepted) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onNavigate('checkout-confirmation');
    }, 3000);
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'orange-money':
        return (
          <div className="mt-4 space-y-3">
            <input
              type="tel"
              placeholder="Numéro Orange Money"
              value={paymentDetails.orangeMoney}
              onChange={(e) => setPaymentDetails({...paymentDetails, orangeMoney: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
              maxLength={9}
            />
            <p className="text-xs text-gray-500">
              Format: 77 XXX XX XX
            </p>
          </div>
        );
      
      case 'wave':
        return (
          <div className="mt-4 space-y-3">
            <input
              type="tel"
              placeholder="Numéro Wave"
              value={paymentDetails.wave}
              onChange={(e) => setPaymentDetails({...paymentDetails, wave: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
              maxLength={9}
            />
          </div>
        );
      
      case 'free-money':
        return (
          <div className="mt-4 space-y-3">
            <input
              type="tel"
              placeholder="Numéro Free Money"
              value={paymentDetails.freeMoney}
              onChange={(e) => setPaymentDetails({...paymentDetails, freeMoney: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
              maxLength={9}
            />
          </div>
        );
      
      case 'card':
        return (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Numéro de carte"
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
              maxLength={19}
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/AA"
                value={paymentDetails.expiryDate}
                onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
                maxLength={5}
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
                maxLength={3}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-[#0F7B6C] text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => onNavigate('checkout-step2')}
          />
          <h1 className="text-lg font-semibold">Paiement</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-full rounded-full" />
          </div>
          <span className="text-xs">4/4</span>
        </div>
      </div>

      {/* Stock Reservation Timer */}
      <div className="bg-orange-50 border border-orange-200 p-3 mx-4 mt-4 rounded-lg flex items-center gap-2">
        <Clock className="w-4 h-4 text-orange-600" />
        <span className="text-sm text-orange-800">
          Panier réservé pendant: {formatCountdown(countdown)}
        </span>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Payment Methods */}
        <div>
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Méthodes de paiement</h2>
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-[#0F7B6C] shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? 'border-[#0F7B6C]'
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-2.5 h-2.5 bg-[#0F7B6C] rounded-full" />
                      )}
                    </div>
                    
                    {/* Payment Method Icon */}
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                      {method.icon}
                    </div>
                    
                    {/* Method Info */}
                    <div>
                      <h3 className="font-semibold text-[#1F2937]">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Payment Form */}
                {selectedMethod === method.id && renderPaymentForm()}
              </div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-900">Paiement 100% sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>Protégé par</span>
                <span className="font-medium">Stripe</span>
                <span>•</span>
                <span>SSL Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedSummary(!expandedSummary)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-[#1F2937] flex items-center gap-2">
              Récapitulatif
              {expandedSummary ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </h3>
          </button>
          
          {expandedSummary && (
            <div className="px-4 pb-4 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span>Produits ({orderSummary.items}):</span>
                <span>{orderSummary.subtotal.toLocaleString()} CFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Livraison:</span>
                <span>{orderSummary.shipping.toLocaleString()} CFA</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Réduction (PROMO20):</span>
                <span>-{orderSummary.discount.toLocaleString()} CFA</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-lg font-bold">TOTAL À PAYER:</span>
                <span className="text-lg font-bold text-[#0F7B6C]">
                  {orderSummary.total.toLocaleString()} CFA
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-[#0F7B6C] border-gray-300 rounded focus:ring-[#0F7B6C] mt-1"
            />
            <span className="text-sm text-gray-700">
              J'accepte les{' '}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Open CGV modal
                }}
                className="text-[#0F7B6C] hover:underline font-medium"
              >
                conditions générales de vente
              </button>
            </span>
          </label>
        </div>

        {/* Payment Info Cards */}
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <h4 className="font-medium text-blue-900">Paiement mobile disponible</h4>
            </div>
            <p className="text-sm text-blue-800">
              Orange Money, Wave et Free Money acceptés
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-green-600" />
              <h4 className="font-medium text-green-900">Paiement par carte sécurisé</h4>
            </div>
            <p className="text-sm text-green-800">
              Visa et Mastercard via Stripe
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-[430px] mx-auto">
        <button 
          onClick={handlePayment}
          disabled={!termsAccepted || isProcessing}
          className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            termsAccepted && !isProcessing
              ? 'bg-[#FFC300] text-[#1F2937] hover:bg-[#FFD700] animate-pulse' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
              Traitement en cours...
            </>
          ) : (
            <>
              Payer {orderSummary.total.toLocaleString()} CFA
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
