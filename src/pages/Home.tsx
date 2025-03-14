import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Zap, Shield, Clock, ArrowRight, Star, ChevronRight, Globe, CreditCard } from 'lucide-react';

export const Home: FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/5 blur-3xl" />
          <div className="absolute top-[60%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/5 blur-3xl" />
          <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-blue-400 rounded-full animate-pulse-slow" />
          <div className="absolute top-[30%] right-[30%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-slow" />
          <div className="absolute top-[70%] left-[40%] w-1 h-1 bg-blue-400 rounded-full animate-pulse-slow" />
          <div className="absolute top-[20%] right-[10%] w-1 h-1 bg-blue-400 rounded-full animate-pulse-slow" />
          <div className="absolute top-[80%] right-[20%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-slow" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-down">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-8">
                <Star className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400">Trusted by 10,000+ businesses</span>
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                  Create professional
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 mt-3">
                  invoices instantly
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-400 max-w-lg">
                Generate beautiful, professional invoices in seconds with multi-currency support. Perfect for freelancers, small businesses, and entrepreneurs worldwide.
              </p>
              <div className="mt-10 flex flex-row items-center gap-3 sm:gap-4">
                <Link
                  to="/create"
                  className="flex-1 inline-flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-600/20"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a 
                  href="#features" 
                  className="flex-1 inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold text-gray-300 bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </div>
              
              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm text-gray-400">Secure PDF Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm text-gray-400">No Sign-up Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-sm text-gray-400">Multi-currency Support</span>
                </div>
              </div>
            </div>
            
            {/* Hero image/mockup */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl transform rotate-6 scale-105"></div>
              <div className="relative bg-gray-800/80 border border-gray-700 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-blue-400" />
                    <span className="ml-2 font-bold text-gray-200">Invoice #001</span>
                  </div>
                  <div className="text-sm text-gray-400">March 14, 2025</div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-700/50 rounded-lg w-3/4"></div>
                  <div className="h-8 bg-gray-700/50 rounded-lg w-1/2"></div>
                  <div className="h-24 bg-gray-700/50 rounded-lg w-full mt-6"></div>
                  <div className="flex justify-end">
                    <div className="h-10 bg-blue-500/50 rounded-lg w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-gray-900/30" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-transparent to-gray-900/30" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase animate-slide-down">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 sm:text-4xl animate-slide-down">
              Everything you need to create professional invoices
            </p>
            <p className="mt-4 text-gray-400 text-lg">
              Our invoice generator provides all the tools you need to create, customize, and send professional invoices to your clients.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-xl">
                    <Zap className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-100">Lightning Fast Creation</h3>
                  <p className="mt-4 text-gray-400">
                    Create professional invoices in seconds with our intuitive interface. No more wasting time with complex software.
                  </p>
                </div>
              </div>

              <div className="group relative bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-xl">
                    <Shield className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-100">Secure & Reliable</h3>
                  <p className="mt-4 text-gray-400">
                    Your data never leaves your device. We use client-side PDF generation to ensure your sensitive information stays private.
                  </p>
                </div>
              </div>

              <div className="group relative bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-xl">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-100">Time Saving</h3>
                  <p className="mt-4 text-gray-400">
                    Save hours of manual work with automated invoice generation. Focus on growing your business instead.
                  </p>
                </div>
              </div>

              <div className="group relative bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-xl">
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-100">Professional Design</h3>
                  <p className="mt-4 text-gray-400">
                    Our clean, professional invoice template ensures your business makes a great impression with every invoice you send.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-xl">
                    <Globe className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-100">Multi-currency Support</h3>
                  <p className="mt-4 text-gray-400">
                    Create invoices in multiple currencies with proper symbols and formatting for global business transactions.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-600/20 rounded-xl">
                    <CreditCard className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-100">No Credit Card Required</h3>
                  <p className="mt-4 text-gray-400">
                    Our invoice generator is completely free to use with no hidden fees or subscription requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link
              to="/create"
              className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-600/20"
            >
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase animate-slide-down">How It Works</h2>
            <p className="mt-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 sm:text-4xl animate-slide-down">
              Create an invoice in three simple steps
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6">
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30 text-xl font-bold text-blue-400">1</div>
              <h3 className="text-xl font-bold text-gray-100 mt-6">Fill in your details</h3>
              <p className="mt-4 text-gray-400">Enter your business information, client details, and itemize your products or services.</p>
            </div>
            
            <div className="relative p-6">
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30 text-xl font-bold text-blue-400">2</div>
              <h3 className="text-xl font-bold text-gray-100 mt-6">Customize your invoice</h3>
              <p className="mt-4 text-gray-400">Add your logo, select your currency, and include any additional notes or terms.</p>
            </div>
            
            <div className="relative p-6">
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30 text-xl font-bold text-blue-400">3</div>
              <h3 className="text-xl font-bold text-gray-100 mt-6">Generate & download</h3>
              <p className="mt-4 text-gray-400">Generate your professional PDF invoice and download it instantly to share with your clients.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link
              to="/create"
              className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-600/20"
            >
              Create Your Invoice
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};