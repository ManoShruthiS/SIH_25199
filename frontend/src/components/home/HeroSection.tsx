import React, { useContext } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Activity, BarChart3, Lock } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

/**
 * SIH 25199 - HeroSection Component
 * Deployment Target: May 18
 * 
 * High-impact landing page component for enterprise-level visibility.
 * Implements conditional CTA logic based on user authentication state.
 */

const HeroSection: React.FC = () => {
  const auth = useContext(AuthContext);
  const isAuthenticated = auth?.isAuthenticated || false;

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Background patterns for enterprise aesthetic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-40" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Content side */}
          <div className="flex-1 text-center lg:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-widest uppercase mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Enterprise Priority Release - SIH 25199
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.05] mb-8">
              Orchestrate Your <span className="text-blue-600">Enterprise Digital</span> Infrastructure.
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Consolidate siloed data, automate cross-departmental workflows, and maintain 
              strict compliance with our centralized portal designed for May 18 standards.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              {isAuthenticated ? (
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                >
                  Enter Command Center
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <Link 
                  href="/auth/login"
                  className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-slate-900 rounded-lg shadow-xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                >
                  Start Integration
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              )}
              
              <Link 
                href="/security"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 w-full sm:w-auto group"
              >
                <Lock className="mr-2 w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                Security Specs
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-6 border-t border-slate-100 pt-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">AES-256 Encrypted</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">99.99% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">ISO 27001 Compliant</span>
              </div>
            </div>
          </div>

          {/* Visual side - Portal Mockup */}
          <div className="flex-1 w-full lg:min-w-[500px]">
            <div className="relative group">
              {/* Glow background */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Header bar */}
                <div className="h-12 bg-slate-900 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-slate-800 rounded px-6 py-1 text-[10px] text-slate-400 font-mono">
                      SYSTEM_ID: SIH_25199_PROD
                    </div>
                  </div>
                </div>

                {/* Simulated UI dashboard */}
                <div className="p-8 space-y-8 bg-slate-50">
                  <div className="flex gap-6">
                    <div className="w-1/3 h-32 bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                      <div className="h-2 w-12 bg-slate-100 rounded"></div>
                      <div className="h-4 w-20 bg-blue-100 rounded"></div>
                      <div className="pt-4 flex items-end gap-1">
                        <div className="flex-1 bg-blue-500 h-8 rounded-sm"></div>
                        <div className="flex-1 bg-blue-300 h-12 rounded-sm"></div>
                        <div className="flex-1 bg-blue-400 h-6 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="w-2/3 h-32 bg-white rounded-xl border border-slate-200 p-4">
                      <div className="flex justify-between mb-4">
                        <div className="h-2 w-24 bg-slate-100 rounded"></div>
                        <div className="h-2 w-8 bg-slate-100 rounded"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-blue-600"></div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full w-1/2 bg-indigo-500"></div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-slate-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-3 w-40 bg-slate-200 rounded"></div>
                      <div className="h-8 w-8 bg-slate-50 rounded-full border border-slate-100"></div>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-50"></div>
                            <div className="space-y-2">
                              <div className="h-2 w-24 bg-slate-100 rounded"></div>
                              <div className="h-1.5 w-16 bg-slate-50 rounded"></div>
                            </div>
                          </div>
                          <div className="h-6 w-16 bg-emerald-50 rounded-full border border-emerald-100"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges for depth */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 hidden sm:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    98%
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Sync Efficiency</div>
                    <div className="text-sm font-bold text-slate-900">Optimal Range</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;