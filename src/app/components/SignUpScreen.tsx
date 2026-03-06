import { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { KentePattern } from './KentePattern';

interface SignUpScreenProps {
  onNavigate: (screen: string) => void;
}

export function SignUpScreen({ onNavigate }: SignUpScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showExistingAccountError, setShowExistingAccountError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!phoneNumber || phoneNumber.length < 9) {
      newErrors.phone = 'Numéro invalide';
    }
    if (!fullName || fullName.length < 2 || fullName.length > 50) {
      newErrors.name = 'Nom doit contenir 2-50 caractères';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate existing account error (for demo)
    if (phoneNumber === '771234567') {
      setShowExistingAccountError(true);
      return;
    }

    setErrors({});
    onNavigate('otp');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-white">
        <div className="px-6 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#0F7B6C] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1F2937]">AfroMarket</h1>
          </div>
        </div>
        <KentePattern />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-[#1F2937] mb-2">
            Créer votre compte
          </h2>
          <p className="text-[#6B7280] mb-8">
            Rejoignez notre communauté de vendeurs et acheteurs
          </p>

          {/* Existing Account Error Banner */}
          {showExistingAccountError && (
            <div className="mb-6 p-4 bg-[#C1121F]/10 border border-[#C1121F]/20 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#C1121F] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#C1121F]">
                  Numéro déjà inscrit.{' '}
                  <button
                    onClick={() => onNavigate('login')}
                    className="font-semibold underline"
                  >
                    Se connecter ?
                  </button>
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase mb-2">
                Numéro de téléphone
              </label>
              <div className="relative">
                <div className="flex items-stretch bg-white rounded-2xl border-2 border-gray-200 focus-within:border-[#0F7B6C] transition-colors overflow-hidden shadow-sm">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-4 bg-gray-50 border-r border-gray-200 min-w-[120px]"
                  >
                    <span className="text-2xl">🇸🇳</span>
                    <span className="text-[#1F2937] font-medium">+221</span>
                    <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                  </button>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setErrors({ ...errors, phone: '' });
                      setShowExistingAccountError(false);
                    }}
                    placeholder="XX XXX XX XX"
                    className="flex-1 px-4 py-4 outline-none min-h-[56px]"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-[#C1121F] mt-2 ml-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase mb-2">
                Nom complet
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Nom complet"
                  className="w-full px-4 py-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-[#0F7B6C] outline-none transition-colors shadow-sm min-h-[56px]"
                />
                {errors.name && (
                  <p className="text-xs text-[#C1121F] mt-2 ml-1">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Email Input (Optional) */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-xs font-semibold text-[#1F2937] uppercase">
                  Email
                </label>
                <span className="px-2 py-0.5 bg-[#1E3A8A]/10 text-[#1E3A8A] text-[10px] font-semibold rounded-full">
                  FACULTATIF
                </span>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-[#0F7B6C] outline-none transition-colors shadow-sm min-h-[56px]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FFC300] text-[#1F2937] font-bold py-4 rounded-2xl shadow-lg hover:bg-[#FFD633] active:scale-[0.98] transition-all mt-8 min-h-[56px]"
            >
              S'inscrire
            </button>
          </form>

          {/* Bottom Link */}
          <div className="text-center mt-6">
            <p className="text-[#6B7280]">
              Déjà inscrit ?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-[#0F7B6C] font-semibold hover:underline"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
