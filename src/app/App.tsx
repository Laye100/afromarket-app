import { useState } from 'react';
import { SignUpScreen } from './components/SignUpScreen';
import { OTPVerificationScreen } from './components/OTPVerificationScreen';
import { LoginScreen } from './components/LoginScreen';
import { ProductSearchScreen } from './components/ProductSearchScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutStep1Screen } from './components/CheckoutStep1Screen';
import { CheckoutStep2Screen } from './components/CheckoutStep2Screen';
import { CheckoutStep3Screen } from './components/CheckoutStep3Screen';
import { CheckoutConfirmationScreen } from './components/CheckoutConfirmationScreen';
import { OrderTrackingScreen } from './components/OrderTrackingScreen';
import { OrderTrackingMultiVendorScreen } from './components/OrderTrackingMultiVendorScreen';
import { OrderMapScreen } from './components/OrderMapScreen';
import { OrderCancellationScreen } from './components/OrderCancellationScreen';
import { OrderCancellationConfirmationScreen } from './components/OrderCancellationConfirmationScreen';
import { ReturnRequestStep1Screen } from './components/ReturnRequestStep1Screen';
import { ReturnRequestStep2Screen } from './components/ReturnRequestStep2Screen';
import { ReturnRequestStep3Screen } from './components/ReturnRequestStep3Screen';
import { ReturnRequestConfirmationScreen } from './components/ReturnRequestConfirmationScreen';
import { ReturnTrackingScreen } from './components/ReturnTrackingScreen';
import { BottomNav } from './components/BottomNav';
import { Toaster } from './components/ui/sonner';

type Screen = 'signup' | 'otp' | 'login' | 'search' | 'productDetail' | 'home' | 'cart' | 'checkout-step1' | 'checkout-step2' | 'checkout-step3' | 'checkout-confirmation' | 'order-tracking' | 'order-tracking-multi' | 'order-map' | 'order-cancellation' | 'order-cancellation-confirmation' | 'return-step1' | 'return-step2' | 'return-step3' | 'return-confirmation' | 'return-tracking';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('signup');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavigate = (screen: string, productId?: string) => {
    setCurrentScreen(screen as Screen);
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'signup':
        return <SignUpScreen onNavigate={handleNavigate} />;
      case 'otp':
        return <OTPVerificationScreen onNavigate={handleNavigate} />;
      case 'login':
        return <LoginScreen onNavigate={handleNavigate} />;
      case 'search':
        return <ProductSearchScreen onNavigate={handleNavigate} />;
      case 'productDetail':
        return <ProductDetailScreen productId={selectedProductId} onNavigate={handleNavigate} />;
      case 'home':
        return <ProductSearchScreen onNavigate={handleNavigate} />;
      case 'cart':
        return <CartScreen onNavigate={handleNavigate} />;
      case 'checkout-step1':
        return <CheckoutStep1Screen onNavigate={handleNavigate} />;
      case 'checkout-step2':
        return <CheckoutStep2Screen onNavigate={handleNavigate} />;
      case 'checkout-step3':
        return <CheckoutStep3Screen onNavigate={handleNavigate} />;
      case 'checkout-confirmation':
        return <CheckoutConfirmationScreen onNavigate={handleNavigate} />;
      case 'order-tracking':
        return <OrderTrackingScreen onNavigate={handleNavigate} />;
      case 'order-tracking-multi':
        return <OrderTrackingMultiVendorScreen onNavigate={handleNavigate} />;
      case 'order-map':
        return <OrderMapScreen onNavigate={handleNavigate} />;
      case 'order-cancellation':
        return <OrderCancellationScreen onNavigate={handleNavigate} />;
      case 'order-cancellation-confirmation':
        return <OrderCancellationConfirmationScreen onNavigate={handleNavigate} />;
      case 'return-step1':
        return <ReturnRequestStep1Screen onNavigate={handleNavigate} />;
      case 'return-step2':
        return <ReturnRequestStep2Screen onNavigate={handleNavigate} />;
      case 'return-step3':
        return <ReturnRequestStep3Screen onNavigate={handleNavigate} />;
      case 'return-confirmation':
        return <ReturnRequestConfirmationScreen onNavigate={handleNavigate} />;
      case 'return-tracking':
        return <ReturnTrackingScreen onNavigate={handleNavigate} />;
      default:
        return <SignUpScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <div className="relative">
        <div className="w-full max-w-[430px] mx-auto bg-white min-h-screen shadow-2xl">
          {renderScreen()}
          
          {/* Show bottom nav only on login screen for preview */}
          {currentScreen === 'login' && (
            <div className="pb-20">
              <BottomNav activeTab="profile" />
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowMobileMenu(false)}
          />
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden fixed top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Screen Navigation Helper (for demo purposes) */}
        <div className={`fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 space-y-2 z-50 max-w-xs lg:max-w-none transition-transform transform ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">Navigate Screens</p>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => handleNavigate('signup')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'signup'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            1. Inscription
          </button>
          <button
            onClick={() => handleNavigate('otp')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'otp'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            2. OTP Verification
          </button>
          <button
            onClick={() => handleNavigate('login')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'login'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            3. Connexion
          </button>
          <button
            onClick={() => handleNavigate('search')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'search'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            4. Recherche Produits
          </button>
          <button
            onClick={() => handleNavigate('productDetail', '1')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'productDetail'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            5. Détail Produit
          </button>
          <button
            onClick={() => handleNavigate('cart')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'cart'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            6. Panier (F-CLI-005)
          </button>
          <button
            onClick={() => handleNavigate('checkout-step1')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'checkout-step1'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            7. Livraison (1/4)
          </button>
          <button
            onClick={() => handleNavigate('checkout-step2')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'checkout-step2'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            8. Mode livraison (2/4)
          </button>
          <button
            onClick={() => handleNavigate('checkout-step3')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'checkout-step3'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            9. Paiement (3/4)
          </button>
          <button
            onClick={() => handleNavigate('checkout-confirmation')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'checkout-confirmation'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            10. Confirmation (4/4)
          </button>
          <button
            onClick={() => handleNavigate('order-tracking')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'order-tracking'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            11. Suivi commande (F-CLI-007)
          </button>
          <button
            onClick={() => handleNavigate('order-tracking-multi')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'order-tracking-multi'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            12. Suivi multi-vendeurs
          </button>
          <button
            onClick={() => handleNavigate('order-map')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'order-map'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            13. Vue carte temps réel
          </button>
          <button
            onClick={() => handleNavigate('order-cancellation')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'order-cancellation'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            14. Annulation (F-CLI-008)
          </button>
          <button
            onClick={() => handleNavigate('return-step1')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'return-step1'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            16. Demande retour - Étape 1 (F-CLI-009)
          </button>
          <button
            onClick={() => handleNavigate('return-step2')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'return-step2'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            17. Demande retour - Étape 2
          </button>
          <button
            onClick={() => handleNavigate('return-step3')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'return-step3'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            18. Demande retour - Étape 3
          </button>
          <button
            onClick={() => handleNavigate('return-confirmation')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'return-confirmation'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            19. Confirmation demande
          </button>
          <button
            onClick={() => handleNavigate('return-tracking')}
            className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentScreen === 'return-tracking'
                ? 'bg-[#0F7B6C] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            20. Suivi demande retour
          </button>
        </div>
      </div>
      
      <Toaster />
    </>
  );
}