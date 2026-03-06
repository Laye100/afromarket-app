import { Home, Search, Plus, Heart, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
}

export function BottomNav({ activeTab = 'home' }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'search', icon: Search, label: 'Recherche' },
    { id: 'sell', icon: Plus, label: 'Vendre' },
    { id: 'favorites', icon: Heart, label: 'Favoris' },
    { id: 'profile', icon: User, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-4 py-3 relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isSell = tab.id === 'sell';

            if (isSell) {
              return (
                <button
                  key={tab.id}
                  className="flex flex-col items-center justify-center relative -top-6"
                >
                  <div className="w-[60px] h-[60px] bg-[#FFC300] rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-[#1F2937]" strokeWidth={2.5} />
                  </div>
                </button>
              );
            }

            return (
              <button
                key={tab.id}
                className="flex flex-col items-center justify-center min-w-[44px] min-h-[44px] gap-1"
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? 'text-[#0F7B6C]' : 'text-[#9CA3AF]'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-[10px] ${
                    isActive ? 'text-[#0F7B6C] font-semibold' : 'text-[#9CA3AF]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
