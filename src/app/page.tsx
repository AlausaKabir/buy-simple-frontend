'use client';

import { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';
import Image from 'next/image';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'staff' | 'admin' | 'superadmin';
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        // Invalid user data, clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  // Handle successful login
  const handleLogin = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-[#F8F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show dashboard if user is logged in
  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // Show login page
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7FF] via-[#F8F4FF] to-white">
      {/* Header - Desktop Logo */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center shadow-lg">
              <div className="flex items-center space-x-0.5">
                <div className="w-1.5 h-2.5 bg-white rounded-full opacity-90"></div>
                <div className="w-1.5 h-2.5 bg-white rounded-full opacity-90"></div>
              </div>
            </div>
            <span className="text-xl font-semibold text-gray-800">Team Achieve</span>
          </div>
        </div>
      </header>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Hero Section (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#FAF7FF] to-[#F0EBFF] p-12 flex-col justify-center items-center">
          {/* Hero Image Container */}
          <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
            <div className="relative w-[700px] h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/hero-image.png"
                alt="Team Achieve"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-center mt-4 max-w-md">
            <h2 className="text-2xl mt-4 font-bold text-[#61227D] mb-4">
              Team Achieve
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your perfect solution for funding your desires
            </p>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-8 lg:px-16 lg:py-16">
          <div className="w-full max-w-md">
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
