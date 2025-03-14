import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <nav className={`${isHomePage && !scrolled ? 'bg-transparent' : 'glass'} ${scrolled ? 'shadow-blue' : ''} border-b border-gray-800/50 sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center group">
                <div className={`flex items-center justify-center p-2 rounded-lg ${scrolled || !isHomePage ? 'bg-blue-600/20' : ''} transition-all duration-300 group-hover:bg-blue-600/20`}>
                  <FileText className="h-6 w-6 text-blue-400 animate-float" />
                </div>
                <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-shadow">InvoiceAI</span>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/create"
                className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl ${isHomePage ? 'text-white bg-blue-600 hover:bg-blue-500 shadow-blue' : 'text-blue-400 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30'} transition-all duration-300 animate-glow`}
              >
                Create Invoice
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass border-b border-gray-800 animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/create"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Invoice
              </Link>

            </div>
          </div>
        )}
      </nav>
      <main className="flex-grow">{children}</main>
      <footer className="glass border-t border-gray-800/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <span className="ml-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-shadow">InvoiceAI</span>
            </div>
            
            <div className="mt-6 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Contact</a>
            </div>
            
            <div className="mt-6 md:mt-0 text-sm text-gray-500">
              © {new Date().getFullYear()} InvoiceAI. All rights reserved.
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800/50 text-center text-xs text-gray-600">
            Contact: <a href="mailto:Timmy@stranerd.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Timmy@stranerd.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}