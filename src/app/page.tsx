'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8EAFF] to-white">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <span className="text-gray-800 font-semibold">Team Achieve</span>
        </div>
        <button className="text-purple-600 text-sm font-medium">
          log in as a client
        </button>
      </div>

      <div className="flex min-h-screen lg:min-h-screen">
        {/* Left Panel - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F8EAFF] to-white p-8 lg:p-12 flex-col justify-center items-center relative">
          {/* Client Login Link */}
          <div className="absolute top-6 left-6">
            <button className="text-purple-600 text-sm font-medium hover:underline">
              log in as a client
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center relative">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <span className="text-gray-600 text-xl font-semibold">Team Achieve</span>
          </div>

          {/* Hero Image */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-80 h-60 bg-gradient-to-br from-sky-200 via-blue-300 to-blue-400 flex items-center justify-center relative">
              {/* Urban background simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-blue-300 to-blue-400 opacity-90"></div>

              {/* Building silhouettes */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-300 to-transparent opacity-30"></div>

              {/* Three people silhouettes */}
              <div className="relative z-10 flex items-center justify-center space-x-4">
                {/* Person 1 */}
                <div className="w-8 h-16 bg-black bg-opacity-40 rounded-t-full relative">
                  <div className="w-4 h-4 bg-black bg-opacity-40 rounded-full absolute -top-2 left-2"></div>
                </div>
                {/* Person 2 */}
                <div className="w-8 h-18 bg-black bg-opacity-50 rounded-t-full relative">
                  <div className="w-4 h-4 bg-black bg-opacity-50 rounded-full absolute -top-2 left-2"></div>
                </div>
                {/* Person 3 */}
                <div className="w-8 h-16 bg-black bg-opacity-40 rounded-t-full relative">
                  <div className="w-4 h-4 bg-black bg-opacity-40 rounded-full absolute -top-2 left-2"></div>
                </div>
              </div>

              {/* Connecting arms effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-1 bg-black bg-opacity-20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-700 mb-2">Team Achieve</h1>
            <p className="text-gray-600 text-lg">Your perfect solution for funding your desires</p>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
