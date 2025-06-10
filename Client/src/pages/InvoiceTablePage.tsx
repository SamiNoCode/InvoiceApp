import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import type { RootState } from '../store/store';
import { getColumns } from '../components/InvoiceTable/tableConfig';
import { fetchInvoices } from '../store/features/invoice/invoiceSlice';
import type { AppDispatch } from '../store/store';
import Modal from '../components/Modal';
import type { Invoice } from '../api/invoiceApi';

const InvoiceTablePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const status = useSelector((state: RootState) => state.invoices.status);
  const error = useSelector((state: RootState) => state.invoices.error);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInvoices());
    }
  }, [status, dispatch]);

  const table = useReactTable({
    data: invoices,
    columns: getColumns(isDarkMode),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (status === 'loading') {
    return (
      <div className={`fixed top-0 right-0 bottom-0 left-60 h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8 flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={`fixed top-0 right-0 bottom-0 left-60 h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8 flex items-center justify-center`}>
        <div className={`text-lg ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed top-0 right-0 bottom-0 left-60 h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
      <div className={`w-[calc(100%+16px)] h-full -ml-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl 
        ${isDarkMode 
          ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.2)] border border-gray-700/50' 
          : 'shadow-[0_20px_50px_rgba(8,_112,_184,_0.07),_0_10px_20px_rgba(8,_112,_184,_0.05)] border border-gray-200/50'
        }
        transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl`}>
        {/* Header Section */}
        <div className="rounded-t-3xl overflow-hidden">
          <Header />
        </div>
        <div className={`w-full h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

        <div className="p-8">
          {/* Table Section */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 
            ${isDarkMode 
              ? 'shadow-[0_4px_12px_rgba(0,0,0,0.1)]' 
              : 'shadow-[0_4px_12px_rgba(8,_112,_184,_0.03)]'
            }">
            <table className={`min-w-full divide-y ${
              isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              <thead className={`${isDarkMode 
                ? 'bg-gradient-to-r from-[#8B98C7] to-[#A6AFCA]' 
                : 'bg-gradient-to-r from-[#BDCAF9] to-[#D8E1FC]'} backdrop-blur-sm`}>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider cursor-pointer
                          ${isDarkMode 
                            ? 'text-white hover:text-gray-200' 
                            : 'text-gray-700 hover:text-gray-900'
                          } transition-colors duration-200`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}</span>
                          <span className="inline-block">
                            {{
                              asc: '↑',
                              desc: '↓',
                            }[header.column.getIsSorted() as string] ?? ''}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className={`divide-y ${
                isDarkMode 
                  ? 'bg-gray-800/50 divide-gray-700' 
                  : 'bg-white divide-gray-200'
              }`}>
                {table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedInvoice(row.original as Invoice)}
                    className={`${isDarkMode 
                      ? 'hover:bg-gray-700/50' 
                      : 'hover:bg-gray-50'
                    } transition-colors duration-200 cursor-pointer`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={selectedInvoice !== null}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default InvoiceTablePage;