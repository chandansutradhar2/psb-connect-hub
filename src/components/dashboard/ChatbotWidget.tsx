import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Bot, Headphones, ChevronRight, Send, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const ChatbotWidget = () => {
  const navigate = useNavigate();
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  const quickHelp = [
    {
      question: 'How to transfer money?',
      answer: 'Go to Transfer section and select beneficiary',
      action: () => navigate('/transfer')
    },
    {
      question: 'Check account balance',
      answer: 'Your current balance is shown on the main screen',
      action: () => navigate('/mini-statement')
    },
    {
      question: 'Block my card',
      answer: 'Go to Cards section and select block option',
      action: () => navigate('/cards-management')
    },
    {
      question: 'UPI PIN issues',
      answer: 'Reset your UPI PIN in UPI settings',
      action: () => navigate('/upi-profile')
    }
  ];

  const supportChannels = [
    {
      type: 'AI Chat',
      description: 'Get instant answers 24/7',
      icon: <Bot className="h-4 w-4" />,
      status: 'online',
      action: () => navigate('/chat-support'),
      badge: 'Instant'
    },
    {
      type: 'Video Call',
      description: 'Connect with our experts',
      icon: <Headphones className="h-4 w-4" />,
      status: 'available',
      action: () => navigate('/support'),
      badge: 'Premium'
    }
  ];

  return (
    <Card className="card-professional">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center">
            <MessageCircle className="h-4 w-4 text-blue-600 mr-2" />
            Help & Support
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:bg-primary/10 rounded-lg h-8 px-2"
            onClick={() => navigate('/help-center')}
          >
            Help Center
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Assistant Quick Access */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 bg-blue-500 text-white rounded-lg">
              <Bot className="h-3 w-3" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900">PSB Assistant</p>
              <p className="text-xs text-blue-700">AI-powered help, available 24/7</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
              Online
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => navigate('/chat-support')}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Chat Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => setShowQuickHelp(!showQuickHelp)}
            >
              <HelpCircle className="h-3 w-3 mr-1" />
              Quick Help
            </Button>
          </div>

          {/* Quick Help Dropdown */}
          {showQuickHelp && (
            <div className="space-y-2 bg-white border border-blue-200 rounded-lg p-2">
              {quickHelp.map((help, index) => (
                <button
                  key={index}
                  onClick={help.action}
                  className="w-full text-left p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <p className="text-xs font-medium text-blue-900">{help.question}</p>
                  <p className="text-xs text-blue-600">{help.answer}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Support Channels */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Contact Support</h4>
          <div className="space-y-2">
            {supportChannels.map((channel, index) => (
              <button
                key={index}
                onClick={channel.action}
                className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                    {channel.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{channel.type}</p>
                    <p className="text-xs text-muted-foreground">{channel.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${
                    channel.status === 'online' 
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}>
                    {channel.badge}
                  </Badge>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Questions */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Popular Questions</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { q: 'Transfer Limits', path: '/help-center' },
              { q: 'Service Charges', path: '/help-center' },
              { q: 'KYC Update', path: '/help-center' },
              { q: 'Account Statement', path: '/statements-center' }
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-8 text-xs justify-start"
                onClick={() => navigate(item.path)}
              >
                {item.q}
              </Button>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t border-border pt-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Emergency Helpline</p>
                <p className="text-xs text-red-600">Available 24/7 for urgent issues</p>
              </div>
              <Button 
                size="sm" 
                variant="destructive" 
                className="h-8 text-xs"
                onClick={() => navigate('/support')}
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};