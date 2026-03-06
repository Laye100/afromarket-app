import { useState } from 'react';
import { ArrowLeft, Edit2, Trash2, Plus, MapPin, Navigation, Home, Building } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  landmark?: string;
}

export function CheckoutStep1Screen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Maison',
      name: 'Abdoulaye Diouf',
      phone: '+221 77 123 45 67',
      address: 'Cité Keur Gorgui, Villa 234, près pharmacie',
      landmark: 'Près de la mosquée'
    },
    {
      id: '2',
      label: 'Bureau',
      name: 'Abdoulaye Diouf',
      phone: '+221 77 123 45 67',
      address: 'Plateau, Immeuble ABC, Bureau 456'
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    label: 'Maison',
    saveAddress: true
  });

  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.phone && newAddress.address) {
      const address: Address = {
        id: Date.now().toString(),
        label: newAddress.label,
        name: newAddress.name,
        phone: newAddress.phone,
        address: newAddress.address,
        landmark: newAddress.landmark
      };
      setAddresses([...addresses, address]);
      setSelectedAddressId(address.id);
      setNewAddress({
        name: '',
        phone: '',
        address: '',
        landmark: '',
        label: 'Maison',
        saveAddress: true
      });
      setShowNewAddressForm(false);
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    if (selectedAddressId === id && addresses.length > 1) {
      setSelectedAddressId(addresses.find(addr => addr.id !== id)?.id || '');
    }
  };

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-[#0F7B6C] text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => onNavigate('cart')}
          />
          <h1 className="text-lg font-semibold">Adresse de livraison</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-1/2 rounded-full" />
          </div>
          <span className="text-xs">2/4</span>
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-0 rounded-full" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Saved Addresses Section */}
        <div>
          <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Adresses enregistrées</h2>
          <div className="space-y-3">
            {addresses.map(address => (
              <div
                key={address.id}
                onClick={() => setSelectedAddressId(address.id)}
                className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${
                  selectedAddressId === address.id 
                    ? 'border-[#0F7B6C] shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* Radio Button */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                      selectedAddressId === address.id 
                        ? 'border-[#0F7B6C]' 
                        : 'border-gray-300'
                    }`}>
                      {selectedAddressId === address.id && (
                        <div className="w-2.5 h-2.5 bg-[#0F7B6C] rounded-full" />
                      )}
                    </div>
                    
                    {/* Address Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-gray-100 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                          {address.label === 'Maison' && <Home className="w-3 h-3" />}
                          {address.label === 'Bureau' && <Building className="w-3 h-3" />}
                          {address.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[#1F2937]">{address.name}</h3>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                      <p className="text-sm text-gray-700 mt-1">{address.address}</p>
                      {address.landmark && (
                        <p className="text-xs text-gray-500 mt-1">{address.landmark}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit functionality
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address.id);
                      }}
                      className="p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add New Address Button */}
          <button 
            onClick={() => setShowNewAddressForm(true)}
            className="w-full mt-4 border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center gap-2 hover:border-[#0F7B6C] hover:bg-[#0F7B6C]/5 transition-colors"
          >
            <Plus className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Ajouter une adresse</span>
          </button>
        </div>

        {/* New Address Form */}
        {showNewAddressForm && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-[#1F2937] mb-4">Nouvelle adresse</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du destinataire *
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
                  placeholder="Entrez le nom complet"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
                  placeholder="+221 XX XXX XX XX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse complète *
                </label>
                <textarea
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C] h-20 resize-none"
                  placeholder="Entrez l'adresse complète"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Point de repère
                </label>
                <input
                  type="text"
                  value={newAddress.landmark}
                  onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
                  placeholder="Ex: Près de la mosquée"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'adresse
                </label>
                <select
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0F7B6C]"
                >
                  <option value="Maison">Maison</option>
                  <option value="Bureau">Bureau</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saveAddress"
                  checked={newAddress.saveAddress}
                  onChange={(e) => setNewAddress({...newAddress, saveAddress: e.target.checked})}
                  className="w-4 h-4 text-[#0F7B6C] border-gray-300 rounded focus:ring-[#0F7B6C]"
                />
                <label htmlFor="saveAddress" className="text-sm text-gray-700">
                  Enregistrer cette adresse
                </label>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowNewAddressForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleAddAddress}
                  className="flex-1 px-4 py-2 bg-[#0F7B6C] text-white rounded-lg hover:bg-[#0E6A5D]"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Map Integration */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0F7B6C]" />
            Localiser sur la carte
          </h3>
          
          {/* Map Placeholder */}
          <div className="bg-gray-100 h-[300px] rounded-lg flex items-center justify-center mb-4 relative">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#0F7B6C] mx-auto mb-2" />
              <p className="text-gray-600">Carte interactive</p>
              <p className="text-sm text-gray-500">Glissez le point pour préciser votre position</p>
            </div>
            {/* Simulated map pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <div className="w-8 h-8 bg-[#C1121F] rounded-full flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setUseCurrentLocation(!useCurrentLocation)}
            className={`w-full py-2 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
              useCurrentLocation 
                ? 'bg-[#0F7B6C] text-white border-[#0F7B6C]' 
                : 'border-gray-300 text-gray-700 hover:border-[#0F7B6C] hover:bg-[#0F7B6C]/5'
            }`}
          >
            <Navigation className="w-4 h-4" />
            Utiliser ma position
          </button>
          
          {useCurrentLocation && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                Position détectée: Dakar, Plateau, près du marché Kermel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-[430px] mx-auto">
        <button 
          onClick={() => selectedAddress && onNavigate('checkout-step2')}
          disabled={!selectedAddress}
          className={`w-full py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
            selectedAddress
              ? 'bg-[#FFC300] text-[#1F2937] hover:bg-[#FFD700]' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuer
          <ArrowLeft className="w-5 h-5 rotate-180" />
        </button>
      </div>
    </div>
  );
}
