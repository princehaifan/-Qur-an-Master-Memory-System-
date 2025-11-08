
import React, { ReactNode } from 'react';

interface AccordionProps {
  id: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ id, openId, setOpenId, title, icon, children }) => {
  const isOpen = openId === id;

  const toggleAccordion = () => {
    setOpenId(isOpen ? null : id);
  };

  return (
    <div className="border border-primary-800 bg-primary-900/50 rounded-lg shadow-md overflow-hidden">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold text-primary-100 hover:bg-primary-800/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
            <span className="text-secondary-400">{icon}</span>
            {title}
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-primary-800 text-primary-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
