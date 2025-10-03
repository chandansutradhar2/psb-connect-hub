
// import { useNavigate, useLocation } from 'react-router-dom';
// import { 
//   Home, 
//   BarChart3, 
//   CreditCard, 
//   User, 
//   QrCode,
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// export const BottomNavigation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const navItems = [
//     { 
//       icon: <Home className="h-5 w-5" />, 
//       label: 'Home', 
//       path: '/dashboard',
//       activeColor: 'text-primary'
//     },
//     { 
//       icon: <BarChart3 className="h-5 w-5" />, 
//       label: 'Money', 
//       path: '/finance-management',
//       activeColor: 'text-primary'
//     },
//     { 
//       icon: <QrCode className="h-8 w-8" />, 
//       label: 'Pay', 
//       path: '/qr-payment', 
//       isCenter: true,
//       activeColor: 'text-white'
//     },
//     { 
//       icon: <CreditCard className="h-5 w-5" />, 
//       label: 'Cards', 
//       path: '/cards-management',
//       activeColor: 'text-primary'
//     },
//     { 
//       icon: <User className="h-5 w-5" />, 
//       label: 'Profile', 
//       path: '/profile',
//       activeColor: 'text-primary'
//     },
//   ];

//   const isActive = (path) => {
//     if (path === '/dashboard') {
//       return location.pathname === '/dashboard' || location.pathname === '/';
//     }
//     if (path === '/finance-management') {
//       return ['/finance-management', '/investments', '/deposit-management', '/insurance-dashboard'].includes(location.pathname);
//     }
//     if (path === '/cards') {
//       return ['/cards', '/cards-management', '/credit-card-management'].includes(location.pathname);
//     }
//     return location.pathname === path;
//   };

//   const handleNavigation = (item) => {
//     if (item.path === '/finance-management') {
//       if (location.pathname === '/finance-management') {
//         navigate('/investments');
//       } else if (location.pathname === '/investments') {
//         navigate('/deposit-management');
//       } else if (location.pathname === '/deposit-management') {
//         navigate('/insurance-dashboard');
//       } else {
//         navigate('/finance-management');
//       }
//     } else {
//       navigate(item.path);
//     }
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50">
//       {/* Professional background with glass effect */}
//       <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl border-t border-border/50 shadow-2xl"></div>
      
//       {/* Navigation content */}
//       <div className="relative px-4 py-2">
//         <div className="flex items-center justify-between max-w-md mx-auto">
//           {navItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => handleNavigation(item)}
//               className={cn(
//                 "flex flex-col items-center justify-center transition-all duration-300 relative group",
//                 item.isCenter 
//                   ? cn(
//                     "bg-gradient-to-br from-[#1178AC] to-[#1397DA] text-white",
//                       // "bg-gradient-to-br from-primary via-primary to-primary-dark text-white",
//                       "rounded-3xl p-5 shadow-xl transform -translate-y-6",
//                       "hover:scale-105 hover:shadow-2xl focus-ring",
//                       "border-2 border-white-50 hover:border-primary/50 focus:border-primary/50",
//                       "min-w-[80px] flex items-center justify-center",
//                       "hover:bg-primary/10 focus:bg-primary/10"
//                     )
//                   : cn(
//                       "py-3 px-5 rounded-2xl min-w-[68px]",
//                       "hover:bg-muted/70 focus-ring transition-all duration-200"
//                     ),
//                 !item.isCenter && isActive(item.path)
//                   ? "text-primary bg-primary/10 shadow-sm font-semibold"
//                   : !item.isCenter && "text-muted-foreground hover:text-primary"
//               )}
//             >
//               {/* Icon with enhanced styling */}
//               <div className={cn(
//                 "transition-all duration-200",
//                 item.isCenter && "group-hover:scale-110",
//                 !item.isCenter && isActive(item.path) && "scale-110"
//               )}>
//                 {item.icon}
//               </div>
              
//               {/* Label for non-center items */}
//               {!item.isCenter && (
//                 <span className={cn(
//                   "text-xs font-semibold mt-1.5 tracking-tight transition-all duration-200",
//                   isActive(item.path) ? "text-primary" : "text-muted-foreground group-hover:text-primary"
//                 )}>
//                   {item.label}
//                 </span>
//               )}

//               {/* Enhanced active indicator */}
//               {!item.isCenter && isActive(item.path) && (
//                 <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-sm"></div>
//               )}

//               {/* Professional tooltip for center button */}
//               {item.isCenter && (
//                 <div className={cn(
//                   "absolute -top-16 left-1/2 transform -translate-x-1/2",
//                   "bg-foreground text-background text-xs font-semibold py-2 px-4 rounded-xl",
//                   "opacity-0 group-hover:opacity-100 transition-all duration-200",
//                   "whitespace-nowrap pointer-events-none shadow-lg backdrop-blur-sm"
//                 )}>
//                   Quick Pay
//                   <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
//                 </div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

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
  Settings,
  BarChart3,
  QrCode,
  User,
} from 'lucide-react';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

interface SidebarSection {
  section: string;
  items: SidebarItem[];
}

const sidebarItems: SidebarSection[] = [
  {
    section: 'Banking',
    items: [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: Send, label: 'Transfer Money', path: '/transfer' },
      { icon: Receipt, label: 'Pay Bills', path: '/bills' },
      { icon: Smartphone, label: 'Recharge', path: '/recharge' },
      { icon: CreditCard, label: 'My Cards', path: '/cards' },
    ],
  },
  {
    section: 'Investments',
    items: [
      { icon: TrendingUp, label: 'Investments', path: '/investments' },
      { icon: Building, label: 'Fixed Deposits', path: '/deposit-management' },
      { icon: Shield, label: 'Insurance', path: '/insurance-dashboard' },
    ],
  },
  {
    section: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help Center', path: '/help-center' },
      { icon: Settings, label: 'Settings', path: '/settings' },
    ],
  },
];

interface AppNavigationProps {
  children: ReactNode;
}

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: <Home className="h-5 w-5" />, 
      label: 'Home', 
      path: '/dashboard',
      activeColor: 'text-primary'
    },
    { 
      icon: <BarChart3 className="h-5 w-5" />, 
      label: 'Money', 
      path: '/finance-management',
      activeColor: 'text-primary'
    },
    { 
      icon: <QrCode className="h-8 w-8" />, 
      label: 'Pay', 
      path: '/qr-payment', 
      isCenter: true,
      activeColor: 'text-white'
    },
    { 
      icon: <CreditCard className="h-5 w-5" />, 
      label: 'Cards', 
      path: '/cards-management',
      activeColor: 'text-primary'
    },
    { 
      icon: <User className="h-5 w-5" />, 
      label: 'Profile', 
      path: '/profile',
      activeColor: 'text-primary'
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    if (path === '/finance-management') {
      return ['/finance-management', '/investments', '/deposit-management', '/insurance-dashboard'].includes(location.pathname);
    }
    if (path === '/cards-management') {
      return ['/cards', '/cards-management', '/credit-card-management'].includes(location.pathname);
    }
    return location.pathname === path;
  };

  const handleNavigation = (item: typeof navItems[number]) => {
    if (item.path === '/finance-management') {
      if (location.pathname === '/finance-management') {
        navigate('/investments');
      } else if (location.pathname === '/investments') {
        navigate('/deposit-management');
      } else if (location.pathname === '/deposit-management') {
        navigate('/insurance-dashboard');
      } else {
        navigate('/finance-management');
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl border-t border-border/50 shadow-2xl"></div>
      <div className="relative px-4 py-2">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 relative group",
                item.isCenter 
                  ? cn(
                      "bg-gradient-to-br from-[#1178AC] to-[#1397DA] text-white",
                      "rounded-3xl p-5 shadow-xl transform -translate-y-6",
                      "hover:scale-105 hover:shadow-2xl focus-ring",
                      "border-2 border-white-50 hover:border-primary/50 focus:border-primary/50",
                      "min-w-[80px] flex items-center justify-center",
                      "hover:bg-primary/10 focus:bg-primary/10"
                    )
                  : cn(
                      "py-3 px-5 rounded-2xl min-w-[68px]",
                      "hover:bg-muted/70 focus-ring transition-all duration-200"
                    ),
                !item.isCenter && isActive(item.path)
                  ? "text-primary bg-primary/10 shadow-sm font-semibold"
                  : !item.isCenter && "text-muted-foreground hover:text-primary"
              )}
            >
              <div className={cn(
                "transition-all duration-200",
                item.isCenter && "group-hover:scale-110",
                !item.isCenter && isActive(item.path) && "scale-110"
              )}>
                {item.icon}
              </div>
              {!item.isCenter && (
                <span className={cn(
                  "text-xs font-semibold mt-1.5 tracking-tight transition-all duration-200",
                  isActive(item.path) ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}>
                  {item.label}
                </span>
              )}
              {!item.isCenter && isActive(item.path) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-sm"></div>
              )}
              {item.isCenter && (
                <div className={cn(
                  "absolute -top-16 left-1/2 transform -translate-x-1/2",
                  "bg-foreground text-background text-xs font-semibold py-2 px-4 rounded-xl",
                  "opacity-0 group-hover:opacity-100 transition-all duration-200",
                  "whitespace-nowrap pointer-events-none shadow-lg backdrop-blur-sm"
                )}>
                  Quick Pay
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AppNavigation = ({ children }: AppNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isActiveRoute = (path: string) => currentPath === path;
  const hideSidebarRoutes = ['/', '/splash', '/login'];
  const showSidebar = !hideSidebarRoutes.includes(currentPath);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-8 w-auto" src="/images/simbollogo-psb.png" alt="PSB Logo" />
          <span className="ml-2 text-lg font-bold text-primary">PSB Connect</span>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-8">
          {sidebarItems.map((section) => (
            <div key={section.section}>
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.section}
              </h3>
              <div className="mt-2 space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full transition-all duration-200',
                      isActiveRoute(item.path)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
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
    <div className="min-h-screen bg-background">
      {showSidebar && <DesktopSidebar />}
      {showSidebar && <BottomNavigation />}
      <div className={cn(showSidebar ? 'lg:pl-64' : '')}>
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
};