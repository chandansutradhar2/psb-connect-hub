// import { ReactNode } from 'react';
// import { cn } from '@/lib/utils';

// interface BankingLayoutProps {
//   children: ReactNode;
//   className?: string;
//   showHeader?: boolean;
//   title?: string;
// }

// export const BankingLayout = ({ 
//   children, 
//   className, 
//   showHeader = true, 
//   title 
// }: BankingLayoutProps) => {
//   return (
//     <div className={cn(
//       "min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20",
//       className
//     )}>
//       {showHeader && (
//         <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">PSB</span>
//                 </div>
//                 <div>
//                   <h1 className="font-banking text-lg font-semibold text-foreground">
//                     {title || "Punjab & Sind Bank"}
//                   </h1>
//                   <p className="text-xs text-muted-foreground">Mobile Banking</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
//       )}
      
//       <main className="container mx-auto px-4 py-6 max-w-6xl">
//         {children}
//       </main>
//     </div>
//   );
// };

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BankingLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  title?: string;
}

export const BankingLayout = ({ 
  children, 
  className, 
  showHeader = true, 
  title 
}: BankingLayoutProps) => {
  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20",
        className
      )}
    >
      {showHeader && (
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
          {/* <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PSB</span>
                </div>
                <div>
                  <h1 className="font-banking text-base sm:text-lg font-semibold text-foreground">
                    {title || "Punjab & Sind Bank"}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Mobile Banking
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </header>
      )}

      <main className="">
        {children}
      </main>
    </div>
  );
};
