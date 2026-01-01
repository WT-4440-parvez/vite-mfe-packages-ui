import React from 'react';
import { Bell, Settings, Menu, X } from 'lucide-react';
import { Input } from 'utilityApp/Input';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <span onClick={toggleSidebar} className="hover:cursor-pointer">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </span>
        <Input
          type="text"
          placeholder="Search indexes, components or settings..."
          className="flex-1 max-w-md px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sgx-lightBlue-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:cursor-pointer rounded-lg transition-colors relative">
          <Bell size={20} className="text-sgx-lightBlue-500" />
        </button>
        <button className="p-2 hover:cursor-pointer rounded-lg transition-colors">
          <Settings size={20} className="text-sgx-lightBlue-500" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div className="text-right">
            <div className="text-sm font-medium text-sgx-lightBlue-500">John Doe</div>
            <div className="text-xs text-sgx-blue-500">Index Manager</div>
          </div>
          <div className="w-10 h-10 bg-sgx-lightBlue-500 hover:cursor-pointer rounded-full flex items-center justify-center text-white font-medium">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
