import { Menu } from 'lucide-react';
import { useSideMenu } from './SideMenuProvider';

interface MenuButtonProps {
  className?: string;
  variant?: 'header' | 'floating';
}

export function MenuButton({ className = '', variant = 'header' }: MenuButtonProps) {
  const { openMenu } = useSideMenu();

  const baseClasses = "flex items-center justify-center transition-all duration-200";
  
  const variantClasses = {
    header: "w-10 h-10 bg-white/20 rounded-full hover:bg-white/30",
    floating: "bg-[#0F7B6C] text-white rounded-lg shadow-lg p-3 hover:bg-[#12927F]"
  };

  return (
    <button
      onClick={openMenu}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label="Ouvrir le menu"
    >
      <Menu className="w-5 h-6" />
    </button>
  );
}
