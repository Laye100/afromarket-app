import { useState, useEffect } from 'react';
import { useSideMenu } from './SideMenuProvider';
import { 
  Home, 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Package, 
  Star, 
  Settings, 
  HelpCircle, 
  LogOut, 
  X, 
  Menu,
  Store,
  TrendingUp,
  Clock,
  MapPin,
  CreditCard,
  Bell,
  ChevronRight,
  Plus
} from 'lucide-react';

interface SideMenuProps {
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

export function SideMenu({ onNavigate, currentScreen }: SideMenuProps) {
  const { isOpen, closeMenu } = useSideMenu();
  const [userProfile, setUserProfile] = useState({
    name: 'Diouf455',
    avatar: 'https://picsum.photos/seed/user-avatar/60/60.jpg',
    email: 'diouf455@example.com',
    memberSince: 'Mars 2024'
  });

  const menuItems = [
    {
      section: 'Principal',
      items: [
        { id: 'home', label: 'Accueil', icon: Home, screen: 'home', badge: null },
        { id: 'search', label: 'Rechercher', icon: Search, screen: 'search', badge: null },
        { id: 'cart', label: 'Panier', icon: ShoppingCart, screen: 'cart', badge: '2' },
        { id: 'favorites', label: 'Favoris', icon: Heart, screen: 'favorites', badge: '12' },
      ]
    },
    {
      section: 'Mes Commandes',
      items: [
        { id: 'orders', label: 'Mes Commandes', icon: Package, screen: 'orders', badge: null },
        { id: 'tracking', label: 'Suivi Colis', icon: MapPin, screen: 'order-tracking', badge: null },
        { id: 'returns', label: 'Retours', icon: Clock, screen: 'return-tracking', badge: null },
      ]
    },
    {
      section: 'Boutiques',
      items: [
        { id: 'shops', label: 'Parcourir Boutiques', icon: Store, screen: 'shops', badge: null },
        { id: 'trending', label: 'Tendances', icon: TrendingUp, screen: 'trending', badge: 'Nouveau' },
        { id: 'sell', label: 'Vendre sur AfroMarket', icon: Plus, screen: 'sell', badge: null },
      ]
    },
    {
      section: 'Mon Compte',
      items: [
        { id: 'profile', label: 'Mon Profil', icon: User, screen: 'profile', badge: null },
        { id: 'payment', label: 'Moyens de Paiement', icon: CreditCard, screen: 'payment', badge: null },
        { id: 'notifications', label: 'Notifications', icon: Bell, screen: 'notifications', badge: '3' },
        { id: 'settings', label: 'Paramètres', icon: Settings, screen: 'settings', badge: null },
      ]
    },
    {
      section: 'Support',
      items: [
        { id: 'help', label: 'Aide & Support', icon: HelpCircle, screen: 'help', badge: null },
        { id: 'about', label: 'À Propos', icon: Star, screen: 'about', badge: null },
        { id: 'logout', label: 'Déconnexion', icon: LogOut, screen: 'logout', badge: null },
      ]
    }
  ];

  const handleMenuItemClick = (screen: string) => {
    if (screen === 'logout') {
      // Handle logout logic here
      console.log('Logout clicked');
      onNavigate('login');
    } else {
      onNavigate(screen);
    }
    closeMenu();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Side Menu */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80 lg:w-96`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F7B6C] to-[#12927F] p-6 relative">
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-16 h-16 rounded-full border-3 border-white shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">{userProfile.name}</h3>
              <p className="text-white/80 text-sm">{userProfile.email}</p>
              <p className="text-white/60 text-xs mt-1">{userProfile.memberSince}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-white font-bold text-xl">156</div>
              <div className="text-white/70 text-xs">Commandes</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-xl">4.8</div>
              <div className="text-white/70 text-xs">Note</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-xl">23</div>
              <div className="text-white/70 text-xs">Favoris</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {/* Section Title */}
              <div className="px-6 mb-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.section}
                </h4>
              </div>

              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.screen;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.screen)}
                      className={`w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                        isActive ? 'bg-[#0F7B6C]/10 border-l-4 border-[#0F7B6C]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-[#0F7B6C] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className={`font-medium ${
                            isActive ? 'text-[#0F7B6C]' : 'text-gray-900'
                          }`}>
                            {item.label}
                          </div>
                          {item.id === 'sell' && (
                            <div className="text-xs text-gray-500">Gagnez de l'argent</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.badge === 'Nouveau' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 ${
                          isActive ? 'text-[#0F7B6C]' : 'text-gray-400'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">AfroMarket v1.0.0</p>
            <div className="flex justify-center gap-4">
              <button className="text-xs text-gray-600 hover:text-[#0F7B6C] transition-colors">
                Confidentialité
              </button>
              <button className="text-xs text-gray-600 hover:text-[#0F7B6C] transition-colors">
                Conditions
              </button>
              <button className="text-xs text-gray-600 hover:text-[#0F7B6C] transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
