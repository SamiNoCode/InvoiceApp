import type { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  ReceiptRefundIcon, 
  CreditCardIcon, 
  ChartBarIcon,
  ChevronRightIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { logout } from '../store/features/auth/authSlice';

const menuItems = [
  { name: 'Home', icon: HomeIcon, path: '/dashboard' },
  { name: 'Invoices', icon: DocumentTextIcon, path: '/invoices' },
  { name: 'Bills', icon: ReceiptRefundIcon, path: '/bills' },
  { name: 'Expenses', icon: CreditCardIcon, path: '/expenses' },
  { name: 'Reports', icon: ChartBarIcon, path: '/reports' },
];

const SideMenu: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 p-8">
      <div className={`w-[calc(100%+16px)] h-full -ml-4 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.2)]' 
          : 'bg-white border-gray-200/50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07),_0_10px_20px_rgba(8,_112,_184,_0.05)]'
        } rounded-3xl border
        transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl`
      }>
        <div className={`w-full h-full flex flex-col ${
          isDarkMode
            ? 'bg-gradient-to-b from-[#8B98C7] to-[#A6AFCA]'
            : 'bg-gradient-to-b from-[#BDCAF9] to-[#D8E1FC]'
          } rounded-3xl overflow-hidden`}>
          <div className={`h-16 flex items-center justify-center border-b ${
            isDarkMode 
              ? 'border-[#535bf2]/30 bg-black/10' 
              : 'border-[#535bf2]/20 bg-white/10'
            } backdrop-blur-sm`}>
            <span className="text-[#535bf2] text-xl font-bold tracking-tight">LOGO</span>
          </div>

          <nav className="flex-1 pt-6 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl mb-1 transition-all duration-200
                    ${isActive 
                      ? `${isDarkMode ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-sm 
                         shadow-[0_4px_12px_rgba(0,0,0,0.05)] font-bold text-[#535bf2] scale-[1.02] translate-x-1` 
                      : `${isDarkMode ? 'text-gray-300' : 'text-gray-700'} 
                         ${isDarkMode ? 'hover:bg-black/10' : 'hover:bg-white/10'} hover:translate-x-1`
                    }
                  `}
                >
                  <div className={`p-1.5 rounded-lg mr-3 transition-colors duration-200
                    ${isActive 
                      ? 'bg-[#535bf2] text-white' 
                      : `${isDarkMode ? 'bg-black/20 text-gray-300' : 'bg-white/50 text-gray-700'}`
                    }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1">{item.name}</span>
                  <ChevronRightIcon 
                    className={`w-4 h-4 transition-transform duration-200
                      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                      ${isDarkMode ? 'text-gray-300' : ''}
                    `} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="px-3 pb-6">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200
                ${isDarkMode ? 'text-gray-300 hover:bg-black/10' : 'text-gray-700 hover:bg-white/10'} 
                hover:translate-x-1`}
            >
              <div className={`p-1.5 rounded-lg mr-3 transition-colors duration-200
                ${isDarkMode ? 'bg-black/20 text-gray-300' : 'bg-white/50 text-gray-700'}`}>
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              </div>
              <span className="flex-1">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu; 