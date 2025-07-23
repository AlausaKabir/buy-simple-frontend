'use client';

import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

export default function SignupForm() {
    const [formData, setFormData] = useState<SignupFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Success - redirect or handle success
                console.log('Signup successful:', data);
                // You can add redirect logic here
            } else {
                setErrors({ submit: data.message || 'Signup failed' });
            }
        } catch (error) {
            setErrors({ submit: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] mx-auto px-6 lg:px-0">
            {/* Header */}
            <div className="text-center mb-8 lg:mb-10">
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                    Create Account
                </h1>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Join Team Achieve and start your journey to success.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First name"
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.firstName ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300 hover:border-gray-400'
                                }`}
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-600">{errors.firstName}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last name"
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.lastName ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300 hover:border-gray-400'
                                }`}
                        />
                        {errors.lastName && (
                            <p className="text-sm text-red-600">{errors.lastName}</p>
                        )}
                    </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.email ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300 hover:border-gray-400'
                            }`}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a password"
                            className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.password ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300 hover:border-gray-400'
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible className="h-5 w-5" />
                            ) : (
                                <AiOutlineEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300 hover:border-gray-400'
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible className="h-5 w-5" />
                            ) : (
                                <AiOutlineEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                </div>

                {/* Terms Agreement */}
                <div className="space-y-2">
                    <label className="flex items-start cursor-pointer">
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            className="h-4 w-4 mt-1 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700 leading-relaxed">
                            I agree to the{' '}
                            <button type="button" className="text-purple-600 hover:text-purple-700 hover:underline">
                                Terms of Service
                            </button>
                            {' '}and{' '}
                            <button type="button" className="text-purple-600 hover:text-purple-700 hover:underline">
                                Privacy Policy
                            </button>
                        </span>
                    </label>
                    {errors.agreeToTerms && (
                        <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                    )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            <span>Creating account...</span>
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </button>

                {/* Sign In Link */}
                <div className="text-center text-sm text-gray-600 pt-4">
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}
