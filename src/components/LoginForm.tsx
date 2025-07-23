'use client';

import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface User {
    id: string;
    email: string;
    name: string;
    role: 'staff' | 'admin' | 'superadmin';
}

interface LoginFormProps {
    onLogin: (user: User, token: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: { [key: string]: string } = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    rememberMe: formData.rememberMe,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success - call the onLogin callback
                onLogin(data.user, data.token);
            } else {
                setErrors({ submit: data.message || 'Login failed' });
            }
        } catch (error) {
            setErrors({ submit: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[450px] mx-auto px-2">
            


            <div className="text-center mb-12">
                <h1 className="text-3xl font-semibold text-[#61227D] mb-4">
                    Welcome Back
                </h1>
                <p className="text-gray-600 leading-relaxed text-base">
                    Enter your email address and password to access your account.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Email Field */}
                <div className="space-y-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full px-5 py-4 rounded-lg border-2 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:border-gray-400 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'
                            }`}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-3">
                            <span>⚠</span> {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className={`w-full px-5 py-4 pr-14 rounded-lg border-2 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:border-gray-400 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-purple-600"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible className="h-5 w-5" />
                            ) : (
                                <AiOutlineEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-3">
                            <span>⚠</span> {errors.password}
                        </p>
                    )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between py-3 mt-6">
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors"
                        />
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Remember me</span>
                    </label>
                    <button
                        type="button"
                        className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-all font-medium"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                    <div className="p-5 bg-red-50 border border-red-200 rounded-lg mt-6">
                        <p className="text-sm text-red-600 flex items-center gap-2">
                            <span className="text-base">⚠</span> {errors.submit}
                        </p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-500/20 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-lg mt-8"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            <span>Signing in...</span>
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </button>

                {/* Sign Up Link */}
                <div className="text-center pt-8 mt-8 border-t border-gray-100">
                    <p className="text-base text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            className="text-purple-600 hover:text-purple-700 hover:underline font-semibold transition-all"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}
