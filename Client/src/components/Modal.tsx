import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { Invoice } from '../types/Invoice';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, invoice }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  if (!isOpen || !invoice) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const formatAmount = (amount: number) => {
    try {
      return `$${Number(amount).toFixed(2)}`;
    } catch (error) {
      console.error('Error formatting amount:', error);
      return 'Invalid Amount';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className={`relative z-10 w-full max-w-2xl p-8 m-4 rounded-3xl 
        ${isDarkMode 
          ? 'bg-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.2)] border border-gray-700/50' 
          : 'bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.07),_0_10px_20px_rgba(8,_112,_184,_0.05)] border border-gray-200/50'
        } transform transition-all duration-300`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full 
            ${isDarkMode 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            } transition-colors duration-200`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <h2 className={`text-2xl font-semibold mb-6 
          ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Invoice Details
        </h2>

        {/* Modal Content */}
        <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem 
              label="Vendor" 
              value={invoice.vendor_name || 'N/A'} 
            />
            <DetailItem 
              label="Amount" 
              value={formatAmount(invoice.amount)} 
            />
            <DetailItem 
              label="Due Date" 
              value={formatDate(invoice.due_date)} 
            />
            <DetailItem 
              label="Status" 
              value={invoice.paid ? 'Paid' : 'Pending'} 
            />
            <DetailItem 
              label="Created" 
              value={formatDate(invoice.created_at)} 
            />
            <DetailItem 
              label="Last Updated" 
              value={formatDate(invoice.updated_at)} 
            />
          </div>
          
          {/* Description Section */}
          <div className="mt-6">
            <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
              Description
            </h3>
            <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {invoice.description || 'No description available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  
  return (
    <div className="space-y-1">
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  );
};

export default Modal; 