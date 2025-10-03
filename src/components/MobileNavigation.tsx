import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  CreditCard, 
  Send, 
  Receipt, 
  Smartphone, 
  TrendingUp, 
  Shield, 
  Building, 
  HelpCircle, 
  Settings 
} from 'lucide-react';

const sidebarItems = [
  { 
    section: 'Banking', 
    items: [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: Send, label: 'Transfer Money', path: '/transfer' },
      { icon: Receipt, label: 'Pay Bills', path: '/bills' },
      { icon: Smartphone, label: 'Recharge', path: '/recharge' },
      { icon: CreditCard, label: 'My Cards', path: '/cards-management' },
    ]
  },
  { 
    section: 'Investments', 
    items: [
      { icon: TrendingUp, label: 'Investments', path: '/investments' },
      { icon: Building, label: 'Fixed Deposits', path: '/deposit-management' },
      { icon: Shield, label: 'Insurance', path: '/insurance-dashboard' },
    ]
  },
  { 
    section: 'Support', 
    items: [
      { icon: HelpCircle, label: 'Help Center', path: '/help-center' },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ]
  },
];

interface MobileNavigationProps {
  children: ReactNode;
}

export const MobileNavigation = ({ children }: MobileNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isActiveRoute = (path: string) => currentPath === path;

  // Hide DesktopSidebar for specific routes
  const hideSidebarRoutes = ['/', '/splash', '/login'];
  const showSidebar = !hideSidebarRoutes.includes(currentPath);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Desktop sidebar for larger screens
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-gradient-to-b lg:from-[#1178AC] lg:to-[#1397DA] lg:shadow-lg lg:transition-all lg:duration-300">
      <div className="flex flex-col flex-grow pt-6 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-10 w-auto" src="/images/simbollogo-psb.png" alt="PSB Logo" />
          <span className="ml-3 text-xl font-semibold text-white tracking-tight">PSB Connect</span>
        </div>
        
        <nav className="mt-10 flex-1 px-4 space-y-6">
          {sidebarItems.map((section) => (
            <div key={section.section}>
              <h3 className="px-3 text-sm font-medium text-white/80 uppercase tracking-widest">
                {section.section}
              </h3>
              <div className="mt-3 space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      'group flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-all duration-200',
                      isActiveRoute(item.path)
                        ? 'bg-white/10 text-white shadow-md'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-white/70 group-hover:text-white" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {showSidebar && <DesktopSidebar />}
      
      <div className={cn(showSidebar ? 'lg:pl-72' : '')}>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};