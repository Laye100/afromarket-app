import { useState } from 'react';
import { ArrowLeft, MoreVertical, Clock, Package, CreditCard, Check, X, AlertTriangle, Phone, MessageCircle, Search, FileText } from 'lucide-react';

interface TimelineStep {
  id: string;
  title: string;
  timestamp: string;
  details: string;
  status: 'completed' | 'current' | 'pending';
  estimated?: string;
  adminNote?: string;
  courierInfo?: {
    name: string;
    phone: string;
    avatar: string;
  };
}

export function ReturnTrackingScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const returnData = {
    requestNumber: 'RET-20260310-089',
    submissionDate: '10 mars 2026, 11:45',
    product: {
      name: 'Robe Wax élégante',
      image: 'https://picsum.photos/seed/robe-wax-elegant/60/60.jpg',
      refundAmount: 18000
    }
  };

  const getTimelineByStatus = (status: string): TimelineStep[] => {
    switch (status) {
      case 'pending':
        return [
          {
            id: '1',
            title: 'En attente de validation',
            timestamp: '10 mars, 11:45',
            details: 'L\'administrateur examine votre demande',
            status: 'current',
            estimated: 'Réponse sous 24-48h'
          },
          {
            id: '2',
            title: 'En attente de récupération',
            timestamp: '',
            details: 'Un livreur va récupérer votre colis',
            status: 'pending'
          },
          {
            id: '3',
            title: 'Vérification en cours',
            timestamp: '',
            details: 'Le vendeur vérifie le produit',
            status: 'pending'
          },
          {
            id: '4',
            title: 'Remboursement',
            timestamp: '',
            details: 'Remboursement versé',
            status: 'pending'
          }
        ];
      
      case 'approved':
        return [
          {
            id: '1',
            title: 'Demande validée',
            timestamp: '10 mars, 14:30',
            details: 'Retour accepté. Motif valide.',
            status: 'completed',
            adminNote: 'Retour accepté. Motif valide.'
          },
          {
            id: '2',
            title: 'En attente de récupération',
            timestamp: '12 mars, 10:00',
            details: 'Un livreur va récupérer votre colis',
            status: 'current',
            estimated: '12 mars, 10:00-12:00',
            courierInfo: {
              name: 'Mamadou Diallo',
              phone: '+221 77 123 45 67',
              avatar: 'https://picsum.photos/seed/courier-mamadou/40/40.jpg'
            }
          },
          {
            id: '3',
            title: 'Vérification en cours',
            timestamp: '',
            details: 'Le vendeur vérifie le produit',
            status: 'pending'
          },
          {
            id: '4',
            title: 'Remboursement',
            timestamp: '',
            details: 'Remboursement versé',
            status: 'pending'
          }
        ];
      
      case 'rejected':
        return [
          {
            id: '1',
            title: 'Demande rejetée',
            timestamp: '10 mars, 16:20',
            details: 'Votre demande ne respecte pas les conditions',
            status: 'completed'
          }
        ];
      
      default:
        return [];
    }
  };

  const timeline = getTimelineByStatus(currentStatus);

  const renderTimelineIcon = (step: TimelineStep) => {
    if (step.status === 'completed') {
      return (
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
          <Check className="w-6 h-6 text-white" />
        </div>
      );
    } else if (step.status === 'current') {
      return (
        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
          <Clock className="w-6 h-6 text-white" />
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
      return <div className="w-0.5 h-16 bg-green-400 ml-6" />;
    } else if (step.status === 'current') {
      return <div className="w-0.5 h-16 border-l-2 border-dashed border-orange-400 ml-6" />;
    } else {
      return <div className="w-0.5 h-16 border-l-2 border-dashed border-gray-300 ml-6" />;
    }
  };

  const getStatusBadge = () => {
    switch (currentStatus) {
      case 'pending':
        return (
          <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">En attente de validation</span>
          </div>
        );
      case 'approved':
        return (
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Demande validée</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-2">
            <X className="w-4 h-4" />
            <span className="text-sm font-medium">Demande rejetée</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('return-confirmation')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Suivi retour</h1>
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
                <button 
                  onClick={() => setShowAppealModal(true)}
                  className="w-full text-left px-4 py-3 text-[#1F2937] hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <FileText className="w-4 h-4 text-[#0F7B6C]" />
                  <span>Contester cette décision</span>
                </button>
                <button className="w-full text-left px-4 py-3 text-[#1F2937] hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-[#1E3A8A]" />
                  <span>Contacter le support</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Test Buttons */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-3">Tester les statuts:</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentStatus('pending')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentStatus === 'pending' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setCurrentStatus('approved')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentStatus === 'approved' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button 
              onClick={() => setCurrentStatus('rejected')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentStatus === 'rejected' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>
        {/* Request Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Demande #{returnData.requestNumber}</p>
              <p className="text-xs text-gray-500">{returnData.submissionDate}</p>
            </div>
            {getStatusBadge()}
          </div>
          
          <div className="flex items-center gap-3">
            <img 
              src={returnData.product.image}
              alt={returnData.product.name}
              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
            />
            <div className="flex-1">
              <p className="font-medium text-[#1F2937]">{returnData.product.name}</p>
              <p className="font-bold text-green-600">
                {returnData.product.refundAmount.toLocaleString()} CFA
              </p>
            </div>
          </div>
        </div>

        {/* Rejection Banner */}
        {currentStatus === 'rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-1">Demande rejetée</h3>
                <p className="text-sm text-red-800">
                  Votre demande ne respecte pas les conditions de retour (délai de 7 jours dépassé)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-4">Historique de la demande</h3>
          <div className="space-y-4">
            {timeline.map((step, index) => (
              <div key={step.id}>
                <div className="flex gap-4">
                  {renderTimelineIcon(step)}
                  <div className="flex-1">
                    <h4 className={`font-semibold text-[#1F2937] ${
                      step.status === 'current' ? 'text-orange-600' : ''
                    }`}>
                      {step.title}
                    </h4>
                    {step.timestamp && (
                      <p className="text-sm text-gray-600">{step.timestamp}</p>
                    )}
                    <p className="text-sm text-gray-700 mt-1">{step.details}</p>
                    
                    {step.estimated && (
                      <p className="text-sm text-orange-600 font-medium mt-2">
                        {step.estimated}
                      </p>
                    )}
                    
                    {step.adminNote && (
                      <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 italic">
                          "{step.adminNote}"
                        </p>
                      </div>
                    )}
                    
                    {step.courierInfo && (
                      <div className="mt-3 bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={step.courierInfo.avatar}
                            alt="Livreur"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-[#1F2937]">{step.courierInfo.name}</p>
                            <p className="text-sm text-gray-600">{step.courierInfo.phone}</p>
                          </div>
                          <button className="p-2 bg-[#0F7B6C] text-white rounded-lg hover:bg-[#0E6A5D] transition-colors">
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {renderTimelineConnector(index, timeline.length)}
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Actions (for rejected status) */}
        {currentStatus === 'rejected' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-[#1F2937] mb-3">Actions alternatives</h3>
            <div className="space-y-2">
              <button className="w-full p-3 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors">
                <Package className="w-4 h-4 text-[#0F7B6C]" />
                <span className="text-sm font-medium">Contacter le vendeur</span>
              </button>
              <button className="w-full p-3 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition-colors">
                <MessageCircle className="w-4 h-4 text-[#1E3A8A]" />
                <span className="text-sm font-medium">Contacter le support</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => onNavigate('order-tracking')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Retour aux commandes
          </button>
        </div>
      </div>

      {/* Appeal Modal */}
      {showAppealModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-[#1F2937] mb-4">Contester cette décision</h3>
            
            <textarea
              placeholder="Expliquez pourquoi vous contestez cette décision..."
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0F7B6C] resize-none"
              rows={4}
            />
            
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setShowAppealModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  setShowAppealModal(false);
                  // Handle appeal submission
                }}
                className="flex-1 bg-[#0F7B6C] text-white py-2 rounded-lg font-medium hover:bg-[#0E6A5D] transition-colors"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
