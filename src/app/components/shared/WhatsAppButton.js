'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const whatsappNumber = '917899113311'; // Without '+' sign
  const whatsappMessage = encodeURIComponent('Hello! I would like to know more about your IT services.');

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


  const handleClick = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      {isVisible && (
        <div 
          className="fixed bottom-6 right-6 z-50"
          // style={{ animationDuration: '2s' }}
        >
          <button
            onClick={handleClick}
            className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center"
            aria-label="WhatsApp Chat"
          >
            <MessageCircle className="w-6 h-6" fill="white" />
          </button>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
