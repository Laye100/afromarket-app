import { useState } from 'react';
import { ArrowLeft, Check, X, Copy, CreditCard, Mail, MessageCircle, ShoppingBag, HelpCircle } from 'lucide-react';

export function OrderCancellationConfirmationScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [copied, setCopied] = useState(false);

  const cancellationData = {
    orderNumber: 'TIS-20260305-142',
    cancellationDate: '5 mars 2026, 17:05',
    reason: 'J\'ai changé d\'avis',
    refundAmount: 122500,
    refundMethod: 'Orange Money',
    phoneNumber: '+221 77 XXX XX XX',
    refundTimeline: '3-5 jours ouvrés'
  };

  const notifications = [
    { type: 'email', message: 'Email de confirmation envoyé', icon: Mail },
    { type: 'sms', message: 'SMS envoyé', icon: MessageCircle },
    { type: 'vendor', message: 'Vendeurs notifiés', icon: ShoppingBag }
  ];

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(cancellationData.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('search')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Commande annulée</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Success Animation Area */}
        <div className="bg-gradient-to-b from-red-50 to-white rounded-2xl p-8 text-center">
          {/* Animated X Icon */}
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <X className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Commande annulée</h2>
          <p className="text-gray-600">Nous avons bien pris en compte votre demande</p>
        </div>

        {/* Cancellation Details Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-4">Détails de l'annulation</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Numéro de commande:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold">#{cancellationData.orderNumber}</span>
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
            <div className="flex justify-between">
              <span className="text-gray-600">Date d'annulation:</span>
              <span className="font-medium">{cancellationData.cancellationDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Raison:</span>
              <span className="font-medium">{cancellationData.reason}</span>
            </div>
          </div>
        </div>

        {/* Refund Info Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 mb-2">Remboursement en cours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-800">Montant:</span>
                  <span className="font-bold text-green-900 text-lg">
                    {cancellationData.refundAmount.toLocaleString()} CFA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800">Méthode:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-orange-500">🟠</span>
                    <span className="font-medium text-green-900">{cancellationData.refundMethod}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800">Délai:</span>
                  <span className="font-medium text-green-900">{cancellationData.refundTimeline}</span>
                </div>
              </div>
              <div className="mt-3 p-2 bg-green-100 rounded-lg">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Vous recevrez une notification lorsque le remboursement sera effectué
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Sent */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-4">Notifications envoyées</h3>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <notification.icon className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{notification.message}</p>
                </div>
                <Check className="w-4 h-4 text-green-600" />
              </div>
            ))}
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-4">Que faire ensuite ?</h3>
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('search')}
              className="w-full bg-[#FFC300] text-[#1F2937] py-3 rounded-xl font-semibold hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Continuer mes achats
            </button>
            
            <button className="w-full border border-[#0F7B6C] text-[#0F7B6C] py-3 rounded-xl font-medium hover:bg-[#0F7B6C]/5 transition-colors">
              Voir mes autres commandes
            </button>
            
            <button className="w-full text-[#1E3A8A] py-2 font-medium hover:underline flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Contacter le support
            </button>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Information importante</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Le remboursement apparaîtra sur votre compte dans 3-5 jours</li>
                <li>• Vous recevrez un email de confirmation du remboursement</li>
                <li>• Les vendeurs ont été notifiés de l'annulation</li>
                <li>• Aucun frais d'annulation ne sera appliqué</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <p className="text-gray-600 mb-3">Besoin d'aide avec votre remboursement ?</p>
          <button className="text-[#0F7B6C] font-medium hover:underline">
            Contactez notre support client
          </button>
        </div>
      </div>
    </div>
  );
}
