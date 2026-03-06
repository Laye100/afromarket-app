import { useState } from 'react';
import { ArrowLeft, Check, Copy, Clock, Truck, CreditCard, Mail, MessageCircle, ShoppingBag, TrendingUp, Store, Share2 } from 'lucide-react';

export function ReturnRequestConfirmationScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [copied, setCopied] = useState(false);

  const returnData = {
    requestNumber: 'RET-20260310-089',
    submissionDate: '10 mars 2026, 11:45',
    status: 'pending',
    product: {
      name: 'Robe Wax élégante',
      image: 'https://picsum.photos/seed/robe-wax-elegant/60/60.jpg',
      refundAmount: 18000
    }
  };

  const handleCopyRequestNumber = () => {
    navigator.clipboard.writeText(returnData.requestNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timelineSteps = [
    {
      id: 1,
      title: 'Examen de votre demande',
      subtitle: 'Délai: 24-48 heures',
      status: 'current',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Récupération du colis',
      subtitle: 'Si validée',
      status: 'pending',
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Remboursement',
      subtitle: '5-7 jours après réception',
      status: 'pending',
      icon: <CreditCard className="w-5 h-5" />
    }
  ];

  const notifications = [
    { type: 'email', message: 'Email de confirmation envoyé', icon: Mail },
    { type: 'sms', message: 'SMS envoyé', icon: MessageCircle },
    { type: 'push', message: 'Notification push activée', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('search')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Demande de retour envoyée !</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Success Animation Area */}
        <div className="bg-gradient-to-b from-green-50 to-white rounded-2xl p-8 text-center">
          {/* Animated Checkmark */}
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-10 h-10">
              <Check className="w-full h-full text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Demande de retour envoyée !</h2>
          <p className="text-gray-600">Nous examinons votre demande</p>
        </div>

        {/* Return Request Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#1F2937]">Numéro de demande:</h3>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg">#{returnData.requestNumber}</span>
              <button 
                onClick={handleCopyRequestNumber}
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
          <p className="text-sm text-gray-600">
            Date de soumission: {returnData.submissionDate}
          </p>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-600 font-medium">En attente de validation</span>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-4">Prochaines étapes</h3>
          <div className="space-y-4">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="flex gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === 'current'
                    ? 'bg-orange-100 animate-pulse'
                    : step.status === 'completed'
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }`}>
                  <div className={`${
                    step.status === 'current'
                      ? 'text-orange-600'
                      : step.status === 'completed'
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    step.status === 'current' ? 'text-orange-600' : 'text-gray-700'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step.subtitle}</p>
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className={`w-0.5 h-8 ml-5 ${
                    step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-3">Vous serez notifié par:</h3>
          <div className="space-y-2">
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

        {/* Product Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-3">Produit concerné</h3>
          <div className="flex items-center gap-3">
            <img 
              src={returnData.product.image}
              alt={returnData.product.name}
              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
            />
            <div className="flex-1">
              <p className="font-medium text-[#1F2937]">{returnData.product.name}</p>
              <p className="font-bold text-green-600">
                {returnData.product.refundAmount.toLocaleString()} CFA
              </p>
            </div>
          </div>
        </div>

        {/* Impact Info */}
        <div className="bg-gradient-to-r from-[#0F7B6C]/10 to-emerald-50 border border-[#0F7B6C]/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#0F7B6C]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-[#0F7B6C]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0F7B6C] mb-2">Votre retour nous aide à:</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Améliorer la qualité des produits</span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Aider d'autres acheteurs</span>
                </div>
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Valoriser les bons vendeurs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Notification */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Store className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-blue-900">Mode AfroStyle a été notifié</p>
              <p className="text-sm text-blue-800">Le vendeur pourra répondre à votre demande</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('return-tracking')}
            className="w-full bg-[#FFC300] text-[#1F2937] py-3 rounded-xl font-semibold hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Suivre ma demande
          </button>
          
          <div className="flex gap-3">
            <button className="flex-1 border border-[#0F7B6C] text-[#0F7B6C] py-3 rounded-xl font-medium hover:bg-[#0F7B6C]/5 transition-colors">
              Voir mes commandes
            </button>
            <button className="flex-1 text-[#1E3A8A] py-3 rounded-xl font-medium hover:bg-[#1E3A8A]/5 transition-colors">
              Contacter le support
            </button>
          </div>
          
          <button className="w-full text-gray-600 py-2 font-medium hover:underline flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Partager ma demande
          </button>
        </div>
      </div>
    </div>
  );
}
