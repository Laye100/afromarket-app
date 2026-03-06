import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Package, ArrowRightLeft, UserX, Camera, Search, Check, X } from 'lucide-react';

interface ReturnReason {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface UploadedPhoto {
  id: string;
  url: string;
  file: File;
}

export function ReturnRequestStep2Screen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [packageConditions, setPackageConditions] = useState({
    originalPackaging: true,
    notUsed: true,
    tagsIntact: true
  });
  const [showPhotoGuidelines, setShowPhotoGuidelines] = useState(false);

  const selectedProduct = {
    id: '1',
    name: 'Robe Wax élégante',
    image: 'https://picsum.photos/seed/robe-wax-elegant/60/60.jpg',
    quantity: 1,
    price: 18000
  };

  const returnReasons: ReturnReason[] = [
    {
      id: 'not_conforming',
      title: 'Non conforme à la description',
      subtitle: 'Le produit ne correspond pas aux photos/détails',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      id: 'quality_defect',
      title: 'Défaut de qualité ou produit endommagé',
      subtitle: 'Défaut de fabrication, trous, taches, casse',
      icon: <Package className="w-5 h-5" />
    },
    {
      id: 'vendor_error',
      title: 'Erreur de commande du vendeur',
      subtitle: 'Mauvaise taille, couleur, ou article différent',
      icon: <ArrowRightLeft className="w-5 h-5" />
    },
    {
      id: 'other',
      title: 'Autre raison',
      subtitle: 'Je change d\'avis, ne me plaît pas, etc.',
      icon: <UserX className="w-5 h-5" />
    }
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, slotIndex: number) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('La photo ne doit pas dépasser 5MB');
      return;
    }

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png|heif)$/i)) {
      alert('Format de fichier non supporté. Utilisez JPG, PNG ou HEIF');
      return;
    }

    const url = URL.createObjectURL(file);
    const newPhoto: UploadedPhoto = {
      id: Date.now().toString(),
      url,
      file
    };

    // Replace or add photo at specific slot
    const newPhotos = [...uploadedPhotos];
    if (slotIndex < newPhotos.length) {
      newPhotos[slotIndex] = newPhoto;
    } else {
      newPhotos.push(newPhoto);
    }
    
    setUploadedPhotos(newPhotos.slice(0, 3)); // Max 3 photos
  };

  const handleRemovePhoto = (photoId: string) => {
    setUploadedPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const isFormValid = selectedReason && uploadedPhotos.length >= 2;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7B6C] to-[#0E6A5D] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('return-step1')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Motif du retour</h1>
              <p className="text-xs opacity-90">Étape 2/3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Selected Product Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img 
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-[#1F2937]">{selectedProduct.name}</h3>
              <p className="text-sm text-gray-600">Quantité: x{selectedProduct.quantity}</p>
              <p className="font-bold text-[#0F7B6C]">{selectedProduct.price.toLocaleString()} CFA</p>
            </div>
          </div>
        </div>

        {/* Return Reason Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-1">Pourquoi retournez-vous cet article ?</h3>
          <span className="text-red-500 text-sm">*</span>
          
          <div className="space-y-3 mt-4">
            {returnReasons.map(reason => (
              <label
                key={reason.id}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  selectedReason === reason.id
                    ? 'bg-[#0F7B6C]/10 border border-[#0F7B6C]'
                    : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-[#0F7B6C] border-gray-300 focus:ring-[#0F7B6C] mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {reason.icon}
                    </div>
                    <div>
                      <p className="font-medium text-[#1F2937]">{reason.title}</p>
                      <p className="text-sm text-gray-600">{reason.subtitle}</p>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Details Textarea */}
        {selectedReason && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block">
              <h3 className="font-bold text-[#1F2937] mb-2">
                Détails supplémentaires
                <span className="text-gray-400 font-normal text-sm"> (facultatif)</span>
              </h3>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value.slice(0, 500))}
                placeholder="Décrivez le problème en détail (ex: taille trop petite, couleur différente...)"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0F7B6C] focus:ring-1 focus:ring-[#0F7B6C]/20 resize-none"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {details.length}/500
              </p>
            </label>
          </div>
        )}

        {/* Photo Upload Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-1">
            Photos du produit
            <span className="text-red-500 text-sm">*</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">Minimum 2 photos · Maximum 3 photos</p>
          <p className="text-xs text-blue-600 mb-4">Required for: Preuve de conformité et d'état</p>
          
          {/* Upload Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[0, 1, 2].map(slotIndex => {
              const photo = uploadedPhotos[slotIndex];
              const IconComponent = slotIndex === 0 ? Camera : slotIndex === 1 ? Package : Search;
              const slotTexts = ["Ajouter photo", "Produit entier", "Détail défaut"];
              
              return (
                <div key={slotIndex} className="aspect-square">
                  {photo ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={photo.url}
                        alt={`Photo ${slotIndex + 1}`}
                        className="w-full h-full object-cover rounded-xl border-2 border-[#0F7B6C]"
                      />
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        Photo {slotIndex + 1}
                      </div>
                    </div>
                  ) : (
                    <label className="block">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/heif"
                        onChange={(e) => handlePhotoUpload(e, slotIndex)}
                        className="hidden"
                      />
                      <div className="w-full h-full border-2 border-dashed border-[#0F7B6C] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#0F7B6C]/5 transition-colors">
                        <IconComponent className="w-6 h-6 text-[#0F7B6C] mb-1" />
                        <span className="text-xs text-[#0F7B6C] text-center">
                          {slotTexts[slotIndex]}
                        </span>
                      </div>
                    </label>
                  )}
                </div>
              );
            })}
          </div>

          {/* Photo Guidelines */}
          <button
            onClick={() => setShowPhotoGuidelines(!showPhotoGuidelines)}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            📸 Conseils pour vos photos
            {showPhotoGuidelines ? ' ▲' : ' ▼'}
          </button>
          
          {showPhotoGuidelines && (
            <div className="mt-3 p-3 bg-blue-50 rounded-xl">
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Éclairage naturel</li>
                <li>• Vue d'ensemble du produit</li>
                <li>• Zoom sur le défaut/problème</li>
                <li>• Emballage d'origine si possible</li>
              </ul>
            </div>
          )}
        </div>

        {/* Package Condition Checklist */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] mb-3">État de l'emballage</h3>
          <div className="space-y-2">
            {[
              { key: 'originalPackaging', label: "J'ai conservé l'emballage d'origine" },
              { key: 'notUsed', label: "Le produit n'a pas été utilisé/porté/découpé" },
              { key: 'tagsIntact', label: "Toutes les étiquettes sont intactes" }
            ].map(condition => (
              <label key={condition.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={packageConditions[condition.key as keyof typeof packageConditions]}
                  onChange={(e) => setPackageConditions(prev => ({
                    ...prev,
                    [condition.key]: e.target.checked
                  }))}
                  className="w-4 h-4 text-[#0F7B6C] border-gray-300 rounded focus:ring-[#0F7B6C]"
                />
                <span className="text-sm text-gray-700">{condition.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 max-w-[430px] mx-auto">
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('return-step1')}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Précédent
          </button>
          <button 
            onClick={() => onNavigate('return-step3')}
            disabled={!isFormValid}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              isFormValid
                ? 'bg-[#FFC300] text-[#1F2937] hover:bg-[#FFD700]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
