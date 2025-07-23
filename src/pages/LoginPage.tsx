import React from 'react';
import Logo from '../components/ui/Logo';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        {/* Left Side - Hero Image */}
        <div className="w-1/2 flex flex-col bg-gradient-to-br from-pink-50 to-purple-100" style={{
          borderTopRightRadius: '30px',
          borderBottomRightRadius: '30px'
        }}>
          {/* Logo Section */}
          <div className="px-16 pt-4">
            <Logo size="lg" />
          </div>
          
          {/* Hero Image Section */}
          <div className="flex-1 flex flex-col justify-center px-16 pb-4 -mt-16">
            <div className="w-full">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-4">
                <img 
                  src="/hero-image.svg" 
                  alt="Team Achieve - Happy people celebrating together"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="text-center">
                <h2 className="text-purple-700 text-xl font-bold mb-2 font-serif">Team Achieve</h2>
                <p className="text-gray-700 text-sm font-bold font-serif">Your perfect solution for funding your desires</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-1/2 flex items-center justify-center p-16 bg-white">
          <div className="w-full max-w-md">
            <LoginForm onSubmit={handleLogin} />
          </div>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex flex-col min-h-screen p-6">
          {/* Header */}
          <div className="flex justify-center pt-4 pb-8">
            <Logo size="md" />
          </div>
          
          {/* Login Form */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <LoginForm onSubmit={handleLogin} />
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center pt-6 pb-4">
            <p className="text-gray-600 text-sm">
              Your perfect solution for funding your desires
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;