import { createColumnHelper } from '@tanstack/react-table';
import type { Invoice } from '../../api/invoiceApi';

const columnHelper = createColumnHelper<Invoice>();

export const getStatusColor = (paid: boolean, isDarkMode: boolean) => {
  if (paid) {
    return isDarkMode 
      ? 'bg-green-800 text-green-100' 
      : 'bg-green-100 text-green-800';
  }
  return isDarkMode 
    ? 'bg-yellow-800 text-yellow-100' 
    : 'bg-yellow-100 text-yellow-800';
};

export const getColumns = (isDarkMode: boolean) => [
  columnHelper.accessor('created_at', {
    header: 'Date',
    cell: info => (
      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
        {new Date(info.getValue()).toLocaleDateString()}
      </span>
    ),
  }),
  columnHelper.accessor('vendor_name', {
    header: 'Payee',
    cell: info => (
      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => (
      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} truncate max-w-xs block`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('due_date', {
    header: 'Due Date',
    cell: info => (
      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
        {new Date(info.getValue()).toLocaleDateString()}
      </span>
    ),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: info => (
      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
        ${Number(info.getValue()).toFixed(2)}
      </span>
    ),
  }),
  columnHelper.accessor('paid', {
    header: 'Status',
    cell: info => {
      const paid = info.getValue();
      const status = paid ? 'Paid' : 'Pending';
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          getStatusColor(paid, isDarkMode)
        }`}>
          {status}
        </span>
      );
    },
  }),
]; 