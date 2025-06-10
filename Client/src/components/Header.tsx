import { FiBell, FiMoon, FiSearch, FiSettings, FiSun, FiUser } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/features/theme/themeSlice';
import type { RootState } from '../store/store';

const Header = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const location = useLocation();

  const getPageName = () => {
    const path = location.pathname;
    const pageName = path === '/' ? 'Home' : path.split('/')[1];
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center">
          <span className={`hover:${isDarkMode ? 'text-white' : 'text-gray-800'} ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Home
          </span>
          {location.pathname !== '/' && (
            <>
              <span className={`mx-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>/</span>
              <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                {getPageName()}
              </span>
            </>
          )}
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-6">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-1.5 rounded-2xl border w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'}`}
            />
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>

          {/* Action icons */}
          <button 
            className={`hover:${isDarkMode ? 'text-white' : 'text-gray-800'} 
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            <FiBell className="w-6 h-6" />
          </button>
          
          <button 
            className={`hover:${isDarkMode ? 'text-white' : 'text-gray-800'} 
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            <FiSettings className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleToggleTheme}
            className={`hover:${isDarkMode ? 'text-white' : 'text-gray-800'} 
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>

          {/* Profile picture */}
          <div className="relative">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${isDarkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'}`}
              title="Profile"
            >
              <FiUser className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 