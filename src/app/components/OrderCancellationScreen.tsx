import { useState } from 'react';
import { X, AlertTriangle, Check, Info, CreditCard, MessageCircle, ArrowLeft } from 'lucide-react';

interface CancellationReason {
  id: string;
  label: string;
  requiresText: boolean;
}

export function OrderCancellationScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [selectedVendors, setSelectedVendors] = useState(['1', '2']);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Simulate eligibility check
  const isEligible = true; // Within 2h and status ≤ "En préparation"
  const timeRemaining = '1h32';

  const orderData = {
    orderNumber: 'TIS-20260305-142',
    totalAmount: 122500,
    paymentMethod: 'Orange Money',
    phoneNumber: '+221 77 XXX XX XX'
  };

  const vendors = [
    {
      id: '1',
      name: 'Mode AfroStyle',
      amount: 45000
    },
    {
      id: '2',
      name: 'Stock Tissenza',
      amount: 77500
    }
  ];

  const cancellationReasons: CancellationReason[] = [
    { id: 'error', label: 'J\'ai commandé par erreur', requiresText: false },
    { id: 'delay', label: 'Délai de livraison trop long', requiresText: false },
    { id: 'price', label: 'Prix plus bas ailleurs', requiresText: false },
    { id: 'changed-mind', label: 'J\'ai changé d\'avis', requiresText: false },
    { id: 'other', label: 'Autre raison', requiresText: true }
  ];

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const calculateRefundAmount = () => {
    return vendors
      .filter(v => selectedVendors.includes(v.id))
      .reduce((sum, v) => sum + v.amount, 0);
  };

  const handleConfirmCancellation = () => {
    if (!selectedReason || selectedVendors.length === 0) return;
    
    if (!isConfirming) {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 3000);
      return;
    }
    
    // Proceed with cancellation
    onNavigate('order-cancellation-confirmation');
  };

  const refundAmount = calculateRefundAmount();

  if (!isEligible) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-2">Annulation impossible</h2>
            
            <div className="bg-red-50 rounded-xl p-4 mb-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">Délai dépassé (&gt; 2 heures)</span>
                </div>
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">📦 Colis déjà expédié</span>
                </div>
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">🚚 En cours de livraison</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 w-full">
              <p className="text-sm text-gray-600 mb-4">Vous pouvez:</p>
              <button className="w-full bg-[#0F7B6C] text-white py-3 rounded-xl font-medium hover:bg-[#0E6A5D] transition-colors">
                Refuser le colis à la réception
              </button>
              <button className="w-full border border-[#0F7B6C] text-[#0F7B6C] py-3 rounded-xl font-medium hover:bg-[#0F7B6C]/5 transition-colors">
                Contacter le vendeur
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Demander un retour après réception
              </button>
              <button 
                onClick={() => onNavigate('order-tracking')}
                className="w-full text-[#0F7B6C] py-2 font-medium hover:underline"
              >
                Besoin d'aide ? Contactez le support
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('order-tracking')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Annuler la commande ?</h1>
              <p className="text-xs opacity-90">Cette action est définitive</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-8">
        {/* Eligibility Check */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Conditions d'annulation:</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-800">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Commande éligible</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Dans le délai ({timeRemaining} restantes)</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Remboursement sous 3-5 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Commande #{orderData.orderNumber}</p>
              <p className="font-bold text-[#1F2937]">{refundAmount.toLocaleString()} CFA</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Remboursement via</p>
              <div className="flex items-center gap-1">
                <span className="text-orange-500">🟠</span>
                <span className="text-sm font-medium">{orderData.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Vendor Selection */}
        {vendors.length > 1 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-[#1F2937] mb-3">Annuler pour:</h3>
            <div className="space-y-2">
              {vendors.map(vendor => (
                <label 
                  key={vendor.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedVendors.includes(vendor.id)}
                    onChange={() => handleVendorToggle(vendor.id)}
                    className="w-4 h-4 text-[#0F7B6C] border-gray-300 rounded focus:ring-[#0F7B6C]"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#1F2937]">{vendor.name}</p>
                    <p className="text-sm text-gray-600">{vendor.amount.toLocaleString()} CFA</p>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Vous pouvez annuler tout ou partie de votre commande
            </p>
          </div>
        )}

        {/* Reason Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-3">Raison de l'annulation</h3>
          <div className="space-y-2">
            {cancellationReasons.map(reason => (
              <label 
                key={reason.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-[#0F7B6C] border-gray-300 focus:ring-[#0F7B6C]"
                />
                <span className="flex-1 text-[#1F2937]">{reason.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Comments */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="block">
            <h3 className="font-semibold text-[#1F2937] mb-2">
              Détails supplémentaires (facultatif)
            </h3>
            <textarea
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="Dites-nous en plus..."
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0F7B6C] focus:ring-1 focus:ring-[#0F7B6C]/20 resize-none"
              rows={3}
            />
          </label>
        </div>

        {/* Refund Details */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Remboursement:</h3>
              <div className="space-y-1">
                <p className="text-green-800 font-medium">
                  Montant: {refundAmount.toLocaleString()} CFA
                </p>
                <p className="text-green-800 text-sm">
                  Méthode: {orderData.paymentMethod} ({orderData.phoneNumber})
                </p>
                <p className="text-green-800 text-sm">
                  Délai: Sous 3-5 jours ouvrés
                </p>
              </div>
              <p className="text-xs text-green-600 mt-2">
                Vous recevrez une notification lorsque le remboursement sera effectué
              </p>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Attention</h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Le vendeur sera immédiatement notifié</li>
                <li>• Cette action ne peut pas être annulée</li>
                <li>• Le remboursement peut prendre 3-5 jours</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button 
            onClick={() => onNavigate('order-tracking')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Retour
          </button>
          
          <button 
            onClick={handleConfirmCancellation}
            disabled={!selectedReason || selectedVendors.length === 0}
            className={`w-full py-3 rounded-xl font-medium transition-all ${
              selectedReason && selectedVendors.length > 0
                ? isConfirming
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#C1121F] text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isConfirming ? (
              <span>Confirmez à nouveau pour annuler</span>
            ) : (
              <span>Confirmer l'annulation</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
