import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  ChevronRight,
  Phone,
  MessageCircle,
  Video,
  Mail,
  MoreVertical,
  X,
  UserPlus
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastTransaction: string;
  lastInteraction: string;
}

interface RecentContactsProps {
  recentContacts: Contact[];
  onContactSelect?: (contact: Contact) => void;
  onAddContact?: () => void;
  showHeader?: boolean;
  className?: string;
}

export const RecentContacts = ({ 
  recentContacts, 
  onContactSelect,
  onAddContact,
  showHeader = true,
  className = '' 
}: RecentContactsProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Show only first 4 contacts
  const displayContacts = recentContacts.slice(0, 4);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    onContactSelect?.(contact);
  };

  const handleAddContact = () => {
    onAddContact?.();
  };

  const contactActions = [
    { icon: Phone, label: 'Call', action: () => console.log('Call', selectedContact?.name) },
    { icon: MessageCircle, label: 'Message', action: () => console.log('Message', selectedContact?.name) },
    { icon: Video, label: 'Video Call', action: () => console.log('Video Call', selectedContact?.name) },
    { icon: Mail, label: 'Email', action: () => console.log('Email', selectedContact?.name) },
  ];

  return (
    <section className={`px-2 ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-semibold text-gray-800">Recent Contacts</h3>
            {/* <p className="text-sm text-gray-500 mt-1">Your frequently contacted people</p> */}
          </div>
          <Button 
            variant="ghost" 
            size="xs" 
            className="text-gray-600 hover:text-[#134e5e] rounded-full"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Contacts Grid */}
      <div className="grid grid-cols-5 gap-2 pb-2">
        {displayContacts.map((contact) => (
          <div 
            key={contact.id} 
            className="flex flex-col items-center p-4 rounded-xl hover:bg-gradient-to-br hover:from-[#134e5e]/5 hover:to-[#71b280]/5 cursor-pointer transition-all duration-200 group"
            onClick={() => handleContactClick(contact)}
          >
            <div className="relative mb-3">
              <Avatar className="w-14 h-14 border-2 border-white shadow-md group-hover:border-[#134e5e]/30 transition-colors">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#134e5e] to-[#71b280] text-white font-semibold text-lg">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center">
              <p className="text-xs gap-2 text-gray-800 truncate max-w-[80px]">{contact.name}</p>
              {/* <p className="text-xs text-[#134e5e] font-medium mt-1">{contact.lastTransaction}</p> */}
              {/* <p className="text-xs text-gray-500 mt-1">{contact.lastInteraction}</p> */}
            </div>
          </div>
        ))}
        
        {/* Add New Contact Button */}
        <div 
          className="flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-[#134e5e]/5 hover:to-[#71b280]/5 cursor-pointer transition-all duration-200 group"
          onClick={handleAddContact}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3 group-hover:from-[#134e5e]/10 group-hover:to-[#71b280]/10 transition-all duration-200">
            <Plus className="h-6 w-6 text-gray-500 group-hover:text-[#134e5e] transition-colors" />
          </div>
          <p className="text-xs text-gray-600 group-hover:text-[#134e5e] transition-colors">Add</p>
        </div>
      </div>

      {/* Selected Contact Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-800">Contact Details</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedContact(null)}
                className="h-8 w-8 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center mb-6">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-lg">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#134e5e] to-[#71b280] text-white text-2xl font-semibold">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">{selectedContact.name}</h4>
              <p className="text-gray-500">Last transaction: {selectedContact.lastTransaction}</p>
              <p className="text-sm text-gray-400 mt-2">{selectedContact.lastInteraction}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {contactActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-12 flex-col py-2 rounded-xl border-gray-200 hover:border-[#134e5e] hover:bg-[#134e5e]/5"
                    onClick={action.action}
                  >
                    <IconComponent className="h-5 w-5 mb-1 text-[#134e5e]" />
                    <span className="text-xs text-gray-600">{action.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Additional Actions */}
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 rounded-xl border-gray-200 hover:border-[#134e5e] hover:bg-[#134e5e]/5"
              >
                <UserPlus className="h-4 w-4 mr-2 text-[#134e5e]" />
                <span className="text-[#134e5e]">Add to Contacts</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 rounded-xl border-gray-200 hover:border-[#134e5e] hover:bg-[#134e5e]/5"
              >
                <MoreVertical className="h-4 w-4 mr-2 text-[#134e5e]" />
                <span className="text-[#134e5e]">More</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Default export with sampl@e data for storybook or testing
export default RecentContacts;

// Sample data with Indian names only
RecentContacts.defaultProps = {
  recentContacts: [
    {
      id: '1',
      name: 'Rajesh Kumar',
      avatar: '',
      lastTransaction: '₹5,000',
      lastInteraction: '2 hours ago'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      avatar: '',
      lastTransaction: '₹2,500',
      lastInteraction: '1 day ago'
    },
    {
      id: '3',
      name: 'Amit Patel',
      avatar: '',
      lastTransaction: '₹7,800',
      lastInteraction: '3 days ago'
    },
    {
      id: '4',
      name: 'Sunita Singh',
      avatar: '',
      lastTransaction: '₹1,200',
      lastInteraction: '5 days ago'
    },
    {
      id: '5',
      name: 'Vikram Malhotra',  
      avatar: '',
      lastTransaction: '₹3,400',
      lastInteraction: '1 week ago'
    }
  ]
};