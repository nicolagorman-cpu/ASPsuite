import React from 'react';
import { Tab, TABS } from '../../constants';

interface SidebarProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-64 bg-brand-dark flex flex-col">
            <div className="h-20 flex items-center justify-center border-b border-brand-dark-300">
                <h1 className="text-2xl font-bold text-white tracking-wider">ASP<span className="text-brand-primary">suite</span></h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
                                isActive 
                                ? 'bg-brand-primary text-white shadow-lg' 
                                : 'text-gray-300 hover:bg-brand-dark-200 hover:text-white'
                            }`}
                        >
                            <Icon className="w-6 h-6 mr-4" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-brand-dark-300 text-center text-xs text-gray-500">
                <p>&copy; 2024 ASPsuite</p>
            </div>
        </div>
    );
};

export default Sidebar;