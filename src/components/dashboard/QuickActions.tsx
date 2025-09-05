import { useNavigate } from 'react-router-dom';

interface QuickAction {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  path: string;
}

interface QuickActionsProps {
  quickActions: QuickAction[];
}

export const QuickActions = ({ quickActions }: QuickActionsProps) => {
  const navigate = useNavigate();

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-1">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center p-5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-colors">
              {action.icon}
            </div>
            <h4 className="mt-3 text-sm text-gray-800 text-center">{action.title}</h4>
          </button>
        ))}
      </div>
    </section>
  );
};