import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface OTPVerificationScreenProps {
  onNavigate: (screen: string) => void;
  phoneNumber?: string;
}

export function OTPVerificationScreen({
  onNavigate,
  phoneNumber = '+221 77 123 45 67',
}: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(275); // 4:35 in seconds
  const [attempts, setAttempts] = useState(3);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (index === 5 && value) {
      const code = [...newOtp.slice(0, 5), value].join('');
      verifyCode(code);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = (code: string) => {
    // Simulate verification
    if (code === '123456') {
      setIsSuccess(true);
      setTimeout(() => {
        onNavigate('login');
      }, 1500);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      
      if (newAttempts === 0) {
        setError('Compte bloqué 15 min');
      } else {
        setError(`Code incorrect. ${newAttempts} tentative${newAttempts > 1 ? 's' : ''} restante${newAttempts > 1 ? 's' : ''}`);
      }
      
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(275);
      setOtp(['', '', '', '', '', '']);
      setError('');
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center shadow-sm">
        <button
          onClick={() => onNavigate('signup')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-[#1F2937]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-md mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#0F7B6C]/10 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-[#0F7B6C]" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#1F2937] text-center mb-2">
            Vérifiez votre numéro
          </h2>
          <p className="text-[#6B7280] text-center mb-8">
            Code envoyé au <span className="font-semibold">{phoneNumber}</span>
          </p>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 ${
                attempts === 0 ? 'bg-[#C1121F]/10 border-[#C1121F]/20' : 'bg-[#C1121F]/10 border-[#C1121F]/20'
              } border rounded-2xl flex items-start gap-3`}
            >
              <AlertCircle className="w-5 h-5 text-[#C1121F] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#C1121F] font-medium">{error}</p>
            </motion.div>
          )}

          {/* Success State */}
          {isSuccess && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-6 p-4 bg-[#0F7B6C]/10 border border-[#0F7B6C]/20 rounded-2xl flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6 text-[#0F7B6C]" />
              <p className="text-sm text-[#0F7B6C] font-semibold">Code vérifié avec succès !</p>
            </motion.div>
          )}

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-2xl font-bold rounded-xl outline-none transition-all ${
                  digit
                    ? 'bg-[#0F7B6C]/5 border-2 border-[#0F7B6C] text-[#0F7B6C]'
                    : 'bg-white border-2 border-gray-200 focus:border-[#0F7B6C] text-[#1F2937]'
                } ${error ? 'animate-[shake_0.5s]' : ''}`}
                style={{
                  boxShadow: digit ? '0 2px 8px rgba(15, 123, 108, 0.1)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#6B7280]" />
            <p className="text-sm text-[#6B7280]">
              Code valide pendant <span className="font-semibold text-[#1F2937]">{formatTime(timer)}</span>
            </p>
          </div>

          {/* Resend Code */}
          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={timer > 0}
              className={`text-sm font-semibold ${
                timer > 0
                  ? 'text-[#9CA3AF] cursor-not-allowed'
                  : 'text-[#0F7B6C] hover:underline'
              }`}
            >
              Renvoyer le code
            </button>
          </div>

          {/* Decorative Pattern */}
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#0F7B6C', '#FFC300', '#1E3A8A', '#C1121F'][i],
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
