
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Send } from 'lucide-react';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        // { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
        { name: 'Leads', path: '/', icon: <Users className="h-5 w-5" /> },
        { name: 'Campaigns', path: '/campaigns', icon: <Send className="h-5 w-5" /> },
        { name: 'Accounts', path: '/accounts', icon: <Briefcase className="h-5 w-5" /> }
    ];

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-primary">ReachOut</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`${location.pathname === item.path
                                        ? 'border-primary text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    <span className="mr-1">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/*
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="ml-3 relative">
                        <div>
                        <button
                        type="button"
                        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                        >
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                        <span className="font-medium">AJ</span>
                        </div>
                        </button>
                        </div>
                        </div>
                        </div>
                    */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`${location.pathname === item.path
                                ? 'bg-primary bg-opacity-10 border-primary text-primary'
                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium flex items-center`}
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
