import { useState } from 'react';
import { ChevronDown, User, Lock, Fingerprint, ArrowRight } from 'lucide-react';
import { KentePattern } from './KentePattern';
import { Switch } from './ui/switch';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-[#0F7B6C] to-[#0A5A4F] pb-12">
        <div className="px-6 pt-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-[#0F7B6C]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white text-center">
            Se connecter
          </h2>
          <p className="text-white/80 text-center mt-2">
            Heureux de vous revoir ! 👋
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 -mt-6 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Phone Number Input */}
              <div>
                <label className="block text-xs font-semibold text-[#1F2937] uppercase mb-2">
                  Numéro de téléphone
                </label>
                <div className="flex items-stretch bg-[#F8F9FA] rounded-2xl border-2 border-gray-200 focus-within:border-[#0F7B6C] transition-colors overflow-hidden">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-4 bg-white border-r border-gray-200 min-w-[120px]"
                  >
                    <span className="text-2xl">🇸🇳</span>
                    <span className="text-[#1F2937] font-medium">+221</span>
                    <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                  </button>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="XX XXX XX XX"
                    className="flex-1 px-4 py-4 bg-[#F8F9FA] outline-none min-h-[56px]"
                  />
                </div>
              </div>

              {/* Code Input */}
              <div>
                <label className="block text-xs font-semibold text-[#1F2937] uppercase mb-2">
                  Code de connexion
                </label>
                <div className="flex justify-between gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className={`w-full h-14 text-center text-2xl font-bold rounded-xl outline-none transition-all ${
                        digit
                          ? 'bg-[#0F7B6C]/5 border-2 border-[#0F7B6C] text-[#0F7B6C]'
                          : 'bg-[#F8F9FA] border-2 border-gray-200 focus:border-[#0F7B6C] text-[#1F2937]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Session Info Banner */}
              <div className="p-4 bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 rounded-2xl flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#1E3A8A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#1E3A8A] font-semibold">
                    Session sauvegardée 24h
                  </p>
                  <p className="text-xs text-[#1E3A8A]/70 mt-1">
                    Connexion automatique pendant 24 heures
                  </p>
                </div>
              </div>

              {/* Biometric Option Card */}
              <div className="p-4 bg-gradient-to-r from-[#0F7B6C]/5 to-[#0F7B6C]/10 rounded-2xl border border-[#0F7B6C]/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Fingerprint className="w-6 h-6 text-[#0F7B6C]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2937]">
                        Connexion biométrique
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        Activable après 1ère connexion
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={biometricEnabled}
                    onCheckedChange={setBiometricEnabled}
                    className="data-[state=checked]:bg-[#FFC300]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#FFC300] text-[#1F2937] font-bold py-4 rounded-2xl shadow-lg hover:bg-[#FFD633] active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[56px]"
              >
                Se connecter
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-[#9CA3AF] font-medium uppercase">
                ou continuer avec
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-[#0F7B6C] transition-colors min-h-[48px]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium text-[#1F2937]">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-[#0F7B6C] transition-colors min-h-[48px]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="font-medium text-[#1F2937]">iCloud</span>
              </button>
            </div>
          </div>

          {/* Bottom Link */}
          <div className="text-center mt-6 mb-6">
            <p className="text-[#6B7280]">
              Pas de compte ?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-[#0F7B6C] font-semibold hover:underline"
              >
                S'inscrire
              </button>
            </p>
          </div>

          {/* Decorative Pattern */}
          <KentePattern className="rounded-full overflow-hidden w-32 mx-auto mb-6" />
        </div>
      </div>
    </div>
  );
}
