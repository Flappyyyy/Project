import React from 'react';
import { LayoutDashboard, History, LogOut, FileCheck } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    return (
        <div className="w-64 bg-rose-950 border-r border-rose-900 text-pink-100 flex flex-col hidden md:flex shrink-0 z-20">
            <div className="p-6 h-[73px] border-b border-rose-900 flex items-center">
                <div className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-lg bg-rose-400 flex items-center justify-center font-bold text-lg shadow-sm">
                        P
                    </div>
                    <span className="font-bold text-xl tracking-tight leading-none mt-1">ROSCA</span>
                </div>
            </div>
            <div className="p-4 flex-1">
                <p className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-2 ml-2">Menu</p>
                <nav className="space-y-1.5">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${activeTab === 'dashboard' ? 'bg-rose-400 text-white shadow-sm' : 'hover:bg-rose-900 hover:text-white'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" /> Payment Management
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${activeTab === 'history' ? 'bg-rose-400 text-white shadow-sm' : 'hover:bg-rose-900 hover:text-white'}`}
                    >
                        <History className="w-5 h-5" /> History
                    </button>
                    <button
                        onClick={() => setActiveTab('logs')}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${activeTab === 'logs' ? 'bg-rose-400 text-white shadow-sm' : 'hover:bg-rose-900 hover:text-white'}`}
                    >
                        <FileCheck className="w-5 h-5" /> Payment Logs
                    </button>
                </nav>
            </div>
            <div className="p-4 border-t border-rose-900">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-medium text-pink-300 hover:bg-rose-900 hover:text-rose-400 transition-colors cursor-pointer"
                >
                    <LogOut className="w-5 h-5" /> Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
