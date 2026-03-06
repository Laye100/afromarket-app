import { useState } from 'react';
import { ArrowLeft, Clock, CreditCard, AlertTriangle, Check, X, Info, Package } from 'lucide-react';

export function ReturnRequestStep3Screen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const returnData = {
    product: {
      name: 'Robe Wax élégante',
      image: 'https://picsum.photos/seed/robe-wax-elegant/80/80.jpg',
      quantity: 1,
      refundAmount: 18000
    },
    reason: {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Non conforme à la description',
      details: 'La couleur reçue est différente de celle commandée. J\'ai commandé du rouge mais reçu du bordeaux.'
    },
    photos: [
      'https://picsum.photos/seed/return-photo1/100/100.jpg',
      'https://picsum.photos/seed/return-photo2/100/100.jpg',
      'https://picsum.photos/seed/return-photo3/100/100.jpg'
    ],
    conditions: {
      originalPackaging: true,
      notUsed: true,
      tagsIntact: true
    },
    refund: {
      method: 'Orange Money',
      account: '+221 77 XXX XX XX',
      timeline: '5-7 jours'
    }
  };

  const handleSubmit = async () => {
    if (!termsAccepted) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('return-confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('return-step2')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Vérification</h1>
              <p className="text-xs opacity-90">Étape 3/3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Return Summary Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          {/* Section 1 - Product */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-[#1F2937] mb-3">Produit à retourner</h3>
            <div className="flex items-center gap-3">
              <img 
                src={returnData.product.image}
                alt={returnData.product.name}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
              <div className="flex-1">
                <p className="font-medium text-[#1F2937]">{returnData.product.name}</p>
                <p className="text-sm text-gray-600">Quantité: x{returnData.product.quantity}</p>
                <p className="font-bold text-green-600 text-lg">
                  {returnData.product.refundAmount.toLocaleString()} CFA
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 - Reason */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-[#1F2937] mb-3">Motif du retour</h3>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                {returnData.reason.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1F2937]">{returnData.reason.title}</p>
                <p className="text-sm text-gray-600 mt-1">{returnData.reason.details}</p>
              </div>
            </div>
          </div>

          {/* Section 3 - Photos */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-[#1F2937] mb-3">Photos fournies</h3>
            <div className="flex gap-2 overflow-x-auto">
              {returnData.photos.map((photo, index) => (
                <div key={index} className="flex-shrink-0">
                  <img 
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                  />
                  <p className="text-xs text-gray-500 text-center mt-1">Photo {index + 1}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Tappez sur une photo pour l'agrandir</p>
          </div>

          {/* Section 4 - Conditions */}
          <div>
            <h3 className="font-semibold text-[#1F2937] mb-3">Conditions de retour</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Emballage d'origine conservé</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Produit non utilisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Étiquettes intactes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Timeline Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-3">Délais de traitement</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-800">
                  <span className="font-medium">1.</span>
                  <span className="text-sm">Validation admin: 24-48h</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <span className="font-medium">2.</span>
                  <span className="text-sm">Récupération colis: 2-3 jours</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <span className="font-medium">3.</span>
                  <span className="text-sm">Vérification produit: 1-2 jours</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <span className="font-medium">4.</span>
                  <span className="text-sm">Remboursement: 5-7 jours</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-sm font-medium text-blue-900">Total: ~10-14 jours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Method Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-3">Remboursement sur:</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-500">🟠</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#1F2937]">{returnData.refund.method}</p>
              <p className="text-sm text-gray-600">{returnData.refund.account}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Même méthode que le paiement initial
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-900 mb-2">Information importante</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Votre demande sera examinée sous 24-48h</li>
                <li>• Vous recevrez une notification de validation ou rejet</li>
                <li>• Si rejetée, motifs vous seront communiqués</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 text-[#0F7B6C] border-gray-300 rounded focus:ring-[#0F7B6C] mt-1"
              />
              <span className="text-sm text-gray-700">
                Je confirme que les informations fournies sont exactes
              </span>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 text-[#0F7B6C] border-gray-300 rounded focus:ring-[#0F7B6C] mt-1"
              />
              <span className="text-sm text-gray-700">
                J'accepte les conditions de retour
              </span>
            </label>
            
            <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              <Info className="w-3 h-3" />
              Lire la politique de retour
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 max-w-[430px] mx-auto">
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('return-step2')}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Précédent
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!termsAccepted || isSubmitting}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
              termsAccepted && !isSubmitting
                ? 'bg-[#FFC300] text-[#1F2937] hover:bg-[#FFD700]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                <span>Soumission...</span>
              </>
            ) : (
              <>
                <Package className="w-4 h-4" />
                <span>Soumettre la demande</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
