import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
  identifier?: string; // Added to match Transfer's RecentRecipient
  type?: 'account' | 'upi' | 'mobile' | 'qr' | null; // Added to match Transfer's RecentRecipient
  bankName?: string; // Optional, for account transfers
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
  const navigate = useNavigate();

  const displayContacts = recentContacts.slice(0, 4);

  const handleContactClick = (contact: Contact) => {
    // Navigate to transfer page and pass contact data
    // navigate(`/transfer/${contact.id}`, {
    //   state: {
    //     name: contact.name,
    //     identifier: contact.identifier || '',
    //     type: contact.type || null,
    //     bankName: contact.bankName || '',
    //   },
    // });
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
      {showHeader && (
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-semibold text-gray-800">Recent Contacts</h3>
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

      <div className="grid grid-cols-4 gap-2 pb-2">
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
              <p 
                className="text-xs gap-2 text-gray-800 truncate max-w-[80px] hover:text-[#134e5e] cursor-pointer"
                onClick={() => handleContactClick(contact)}
              >
                {contact.name}
              </p>
            </div>
          </div>
        ))}
        
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
              <h4 
                className="text-xl font-semibold text-gray-800 mb-1 hover:text-[#134e5e] cursor-pointer"
                onClick={() => handleContactClick(selectedContact)}
              >
                {selectedContact.name}
              </h4>
              <p className="text-gray-500">Last transaction: {selectedContact.lastTransaction}</p>
              <p className="text-sm text-gray-400 mt-2">{selectedContact.lastInteraction}</p>
            </div>

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

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 rounded-xl border-gray-200 hover:border-[#134e5e] hover:bg-[#134e5e]/5"
                onClick={() => navigate(`/transfer/${selectedContact.id}`, {
                  state: {
                    name: selectedContact.name,
                    identifier: selectedContact.identifier || '',
                    type: selectedContact.type || null,
                    bankName: selectedContact.bankName || '',
                  },
                })}
              >
                <span className="text-[#134e5e]">Transfer</span>
              </Button>
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

export default RecentContacts;