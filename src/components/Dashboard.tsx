'use client';

import { useState, useEffect } from 'react';
import { AiOutlineLogout, AiOutlineUser, AiOutlineFileText, AiOutlineCalendar, AiOutlineDollarCircle } from 'react-icons/ai';

interface Loan {
    id: string;
    userEmail: string;
    amount: number;
    totalLoan?: number; // Only visible to admin/superadmin
    status: 'pending' | 'active' | 'completed' | 'rejected';
    interestRate: number;
    maturityDate: string;
    applicationDate: string;
    purpose: string;
}

interface User {
    id: string;
    email: string;
    name: string;
    role: 'staff' | 'admin' | 'superadmin';
}

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'all' | 'my-loans' | 'expired'>('all');

    // Fetch all loans
    const fetchAllLoans = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/loans', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch loans');
            }

            const data = await response.json();
            setLoans(data.loans || []);
            setFilteredLoans(data.loans || []);
        } catch (error) {
            setError('Failed to load loans');
            console.error('Error fetching loans:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user's specific loans
    const fetchMyLoans = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/loans/${user.email}/get`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch my loans');
            }

            const data = await response.json();
            setFilteredLoans(data.loans || []);
        } catch (error) {
            setError('Failed to load your loans');
            console.error('Error fetching my loans:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch expired loans
    const fetchExpiredLoans = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/loans/expired', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch expired loans');
            }

            const data = await response.json();
            setFilteredLoans(data.loans || []);
        } catch (error) {
            setError('Failed to load expired loans');
            console.error('Error fetching expired loans:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter loans by status
    const filterByStatus = (status: string) => {
        setStatusFilter(status);
        if (status === 'all') {
            setFilteredLoans(loans);
        } else {
            const filtered = loans.filter(loan => loan.status === status);
            setFilteredLoans(filtered);
        }
    };

    // Handle view mode change
    const handleViewModeChange = (mode: 'all' | 'my-loans' | 'expired') => {
        setViewMode(mode);
        setStatusFilter('all');

        switch (mode) {
            case 'all':
                fetchAllLoans();
                break;
            case 'my-loans':
                fetchMyLoans();
                break;
            case 'expired':
                fetchExpiredLoans();
                break;
        }
    };

    // Delete loan (SuperAdmin only)
    const deleteLoan = async (loanId: string) => {
        if (user.role !== 'superadmin') {
            alert('Only super admins can delete loans');
            return;
        }

        if (!confirm('Are you sure you want to delete this loan?')) {
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/loans/${loanId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete loan');
            }

            // Refresh the current view
            handleViewModeChange(viewMode);
            alert('Loan deleted successfully');
        } catch (error) {
            alert('Failed to delete loan');
            console.error('Error deleting loan:', error);
        }
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    useEffect(() => {
        fetchAllLoans();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center shadow-lg">
                                <div className="flex items-center space-x-0.5">
                                    <div className="w-1.5 h-2.5 bg-white rounded-full opacity-90"></div>
                                    <div className="w-1.5 h-2.5 bg-white rounded-full opacity-90"></div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Team Achieve</h1>
                                <p className="text-sm text-gray-600">Loan Management System</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <AiOutlineUser className="h-5 w-5 text-gray-400" />
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={onLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <AiOutlineLogout className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* View Mode Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => handleViewModeChange('all')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${viewMode === 'all'
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                All Loans
                            </button>
                            <button
                                onClick={() => handleViewModeChange('my-loans')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${viewMode === 'my-loans'
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                My Loans
                            </button>
                            <button
                                onClick={() => handleViewModeChange('expired')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${viewMode === 'expired'
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Expired Loans
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Status Filter - Only show for 'all' view */}
                {viewMode === 'all' && (
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => filterByStatus('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'all'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                All Status
                            </button>
                            <button
                                onClick={() => filterByStatus('pending')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'pending'
                                        ? 'bg-yellow-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => filterByStatus('active')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'active'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => filterByStatus('completed')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'completed'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                Completed
                            </button>
                            <button
                                onClick={() => filterByStatus('rejected')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'rejected'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div>
                        <span className="ml-2 text-gray-600">Loading loans...</span>
                    </div>
                ) : (
                    <>
                        {/* Loans Count */}
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Showing {filteredLoans.length} loan{filteredLoans.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* Loans Grid */}
                        {filteredLoans.length === 0 ? (
                            <div className="text-center py-12">
                                <AiOutlineFileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
                                <p className="text-gray-600">There are no loans matching your current filter.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredLoans.map((loan) => (
                                    <div key={loan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {formatCurrency(loan.amount)}
                                                </h3>
                                                <p className="text-sm text-gray-600">{loan.userEmail}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(loan.status)}`}>
                                                {loan.status}
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <AiOutlineDollarCircle className="h-4 w-4 mr-2" />
                                                Interest: {loan.interestRate}%
                                            </div>

                                            {/* Total Loan - Only visible to admin/superadmin */}
                                            {loan.totalLoan && (user.role === 'admin' || user.role === 'superadmin') && (
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <AiOutlineDollarCircle className="h-4 w-4 mr-2" />
                                                    Total: {formatCurrency(loan.totalLoan)}
                                                </div>
                                            )}

                                            <div className="flex items-center text-sm text-gray-600">
                                                <AiOutlineCalendar className="h-4 w-4 mr-2" />
                                                Applied: {formatDate(loan.applicationDate)}
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600">
                                                <AiOutlineCalendar className="h-4 w-4 mr-2" />
                                                Maturity: {formatDate(loan.maturityDate)}
                                            </div>

                                            <div className="pt-2">
                                                <p className="text-sm text-gray-600 font-medium">Purpose:</p>
                                                <p className="text-sm text-gray-800">{loan.purpose}</p>
                                            </div>

                                            {/* Delete button for SuperAdmin */}
                                            {user.role === 'superadmin' && (
                                                <div className="pt-4 border-t border-gray-100">
                                                    <button
                                                        onClick={() => deleteLoan(loan.id)}
                                                        className="w-full px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                                                    >
                                                        Delete Loan
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
