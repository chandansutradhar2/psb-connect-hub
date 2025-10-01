import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Mic, 
  User, 
  Bot, 
  Phone, 
  Video, 
  X,
  Image,
  File,
  Download,
  MoreVertical,
  Smile,
  ThumbsUp,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BankingLayout } from "@/components/BankingLayout";
import { Badge } from "@/components/ui/badge";

const ChatSupport = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial chat messages
  const initialMessages = [
    {
      id: 1,
      sender: "bot",
      message: "Hello! I'm PSB Assistant. How can I help you today?",
      time: "10:30 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "user",
      message: "I need help with my account balance",
      time: "10:31 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "bot",
      message: "I can help you check your account balance. Please select your account:",
      time: "10:31 AM",
      type: "text"
    },
    {
      id: 4,
      sender: "bot",
      message: "",
      time: "10:31 AM",
      type: "options",
      options: ["Savings Account", "Current Account", "Salary Account"]
    }
  ];

  const quickActions = [
    "Check Balance",
    "Transfer Money",
    "Pay Bills",
    "Block Card",
    "Mini Statement",
    "Account Statement",
    "Change Password",
    "Speak to Agent"
  ];

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize messages
  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate bot response
  const simulateBotResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = {};
      
      if (userMessage.toLowerCase().includes("savings")) {
        botResponse = {
          id: Date.now(),
          sender: "bot",
          message: "Your current balance in Savings Account (****1234) is ₹45,250.00. Is there anything else I can help you with?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "text"
        };
      } else if (userMessage.toLowerCase().includes("current")) {
        botResponse = {
          id: Date.now(),
          sender: "bot",
          message: "Your current balance in Current Account (****5678) is ₹1,25,700.00. Is there anything else I can help you with?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "text"
        };
      } else if (userMessage.toLowerCase().includes("salary")) {
        botResponse = {
          id: Date.now(),
          sender: "bot",
          message: "Your current balance in Salary Account (****9012) is ₹82,400.00. Is there anything else I can help you with?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "text"
        };
      } else {
        botResponse = {
          id: Date.now(),
          sender: "bot",
          message: "I'm sorry, I didn't understand that. Could you please try again or select from the options below?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "text"
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: "user",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      simulateBotResponse(message);
    }
  };

  const handleQuickAction = (action) => {
    const newMessage = {
      id: Date.now(),
      sender: "user",
      message: action,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };
    
    setMessages(prev => [...prev, newMessage]);
    simulateBotResponse(action);
  };

  const handleOptionSelect = (option) => {
    const newMessage = {
      id: Date.now(),
      sender: "user",
      message: option,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };
    
    setMessages(prev => [...prev, newMessage]);
    simulateBotResponse(option);
  };

  const handleCallSupport = () => {
    window.open('tel:18001234567');
  };

  const handleVideoCall = () => {
    // In a real app, this would initiate a video call
    alert("Video call feature would be initiated here");
  };

  return (
    <BankingLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/dashboard')}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-blue-100">
                  <AvatarFallback className="bg-blue-100">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold">PSB Support</h1>
                  <div className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <p className="text-xs text-gray-500">{isTyping ? 'Typing...' : isConnected ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full"
                onClick={handleCallSupport}
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full"
                onClick={handleVideoCall}
              >
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Bot className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="font-medium text-gray-500">Start a conversation</h3>
              <p className="text-sm text-gray-400 mt-1">Ask me anything about your account or banking services</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={msg.sender === "user" ? "bg-[#134e5e2e]" : "bg-gray-100"}>
                      {msg.sender === "user" ? 
                        <User className="h-4 w-4 text-[#52845e]" /> : 
                        <Bot className="h-4 w-4 text-gray-600" />
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div className={`${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col`}>
                    <Card className={`${msg.sender === "user" ? "bg-gradient-to-r from-[#134e5e] to-[#52845e] text-white" : "bg-white"} shadow-sm rounded-2xl`}>
                      <CardContent className="p-3">
                        {msg.type === "text" && (
                          <p className="text-sm">{msg.message}</p>
                        )}
                        {msg.type === "options" && msg.options && (
                          <div className="space-y-2">
                            {msg.options.map((option, index) => (
                              <Button 
                                key={index} 
                                variant={msg.sender === "user" ? "secondary" : "outline"} 
                                size="sm" 
                                className="w-full justify-start text-left whitespace-normal h-auto py-2"
                                onClick={() => handleOptionSelect(option)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <p className={`text-xs text-gray-500 mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 max-w-[85%]">
                <Avatar className="h-8 w-8 bg-gray-100">
                  <AvatarFallback className="bg-gray-100">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </AvatarFallback>
                </Avatar>
                <Card className="bg-white shadow-sm rounded-2xl">
                  <CardContent className="p-3">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 pt-3 pb-1 bg-white border-t">
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 w-max">
              {quickActions.map((action, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full whitespace-nowrap text-xs"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-12 rounded-full"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send className={`h-5 w-5 ${message.trim() ? 'text-blue-600' : 'text-gray-400'}`} />
              </Button>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default ChatSupport;