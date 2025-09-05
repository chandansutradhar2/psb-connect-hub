
import { Button } from '@/components/ui/button';
import { Search, Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-xl px-6 py-4 border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold tracking-tight">PSB</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground font-medium">{userName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/search')} 
            className={cn(
              "rounded-2xl w-11 h-11 hover:bg-muted/70 transition-all duration-200",
              "focus-ring"
            )}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/notifications')} 
            className={cn(
              "rounded-2xl w-11 h-11 hover:bg-muted/70 relative transition-all duration-200",
              "focus-ring"
            )}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white animate-pulse"></span>
          </Button>
        </div>
      </div>
    </header>
  );
};
