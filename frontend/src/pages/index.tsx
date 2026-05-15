import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheckIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

/**
 * SIH 25199 - Enterprise Portal Landing Page
 * Performance-optimized landing with authentication-aware routing.
 * Target Release: May 18
 */
export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Handle redirect if user is already logged in
  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Head>
        <title>SIH 25199 | Enterprise Management Portal</title>
        <meta name="description" content="Secure enterprise resource planning and management platform." />
      </Head>

      {/* Navigation */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                SIH 25199
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                    Sign In
                  </Link>
                  <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
                Next-Gen Enterprise <br />
                <span className="text-indigo-600">Operations Hub</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                The SIH 25199 Enterprise Portal provides a unified interface for resource allocation, 
                real-time analytics, and secure departmental communication designed for rapid scaling.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={handleGetStarted}
                  className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center transition-all group"
                >
                  {isAuthenticated ? 'Enter Portal' : 'Start Implementation'}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link href="#features" className="text-sm font-semibold leading-6 text-slate-900 hover:text-indigo-600">
                  View Specifications <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Background Gradient Blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 blur-3xl opacity-20 pointer-events-none -z-10">
            <div className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-indigo-400 to-violet-500"></div>
          </div>
        </div>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise Security</h3>
                <p className="text-slate-600">
                  End-to-end encryption for all sensitive transactions and role-based access control 
                  integrated with existing SSO providers.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <ChartBarIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Real-time Analytics</h3>
                <p className="text-slate-600">
                  High-throughput data processing pipelines ensure your dashboard reflects current 
                  operational metrics without latency.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <CpuChipIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Scalable Infrastructure</h3>
                <p className="text-slate-600">
                  Built on a containerized microservices architecture to handle enterprise-level 
                  traffic spikes seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} SIH 25199 Enterprise Portal. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-xs text-slate-400">
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600">Support</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}