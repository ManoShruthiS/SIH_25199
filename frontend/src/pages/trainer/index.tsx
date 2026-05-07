import React, { useState, useEffect, useCallback, useContext } from 'react';
import Head from 'next/head';
import api from '../../lib/api';
import { AuthContext } from '../../context/AuthContext';

/**
 * SIH 25199 - Trainer Dashboard
 * Purpose: Tracking learner progress, analyzing skill gaps, and managing certifications.
 * Status: Production Ready | Target: May 18
 */

interface Learner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  completionPercentage: number;
  lastActivity: string;
  status: 'active' | 'at_risk' | 'completed' | 'on_hold';
  topSkillGap: string;
}

interface DashboardMetrics {
  totalLearners: number;
  averageProgress: number;
  criticalSkillGaps: number;
  certificationsIssued: number;
}

interface SkillGapDetail {
  skillName: string;
  gapIntensity: number;
  affectedLearners: number;
  priority: 'high' | 'medium' | 'low';
}

const TrainerDashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [learners, setLearners] = useState<Learner[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGapDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  const syncDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setSyncError(null);

      // Concurrent data fetching for performance optimization
      const [metricsRes, learnersRes, gapsRes] = await Promise.all([
        api.get('/trainer/metrics'),
        api.get('/trainer/learners/summary'),
        api.get('/trainer/analysis/skill-gaps')
      ]);

      setMetrics(metricsRes.data);
      setLearners(learnersRes.data);
      setSkillGaps(gapsRes.data);
    } catch (error) {
      console.error('Data Synchronization Error [SIH-25199]:', error);
      setSyncError('Critical error during data synchronization. Verify enterprise network access.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      syncDashboardData();
    }
  }, [auth?.isAuthenticated, syncDashboardData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600 font-medium tracking-tight">Synchronizing Enterprise Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      <Head>
        <title>Trainer Portal | SIH 25199 Enterprise</title>
      </Head>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <nav className="flex items-center text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
              <span>Enterprise Dashboard</span>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-slate-500 font-medium">Trainer Control</span>
            </nav>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Learner Insight & Progress
            </h1>
            <p className="mt-2 text-slate-500 font-medium max-w-2xl">
              Real-time monitoring of personnel skill acquisition. Analyze deficiencies and track certification milestones for project SIH 25199.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-slate-700">LIVE FEED ACTIVE</span>
            <button 
              onClick={syncDashboardData}
              className="ml-4 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-all active:scale-95"
            >
              Force Refresh
            </button>
          </div>
        </div>

        {syncError && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 font-medium flex justify-between items-center">
            <span>{syncError}</span>
            <button onClick={() => setSyncError(null)} className="text-red-500 hover:text-red-700">Dismiss</button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Active Learners', value: metrics?.totalLearners || 0, trend: '+4%', color: 'blue' },
            { label: 'Mean Progress', value: `${metrics?.averageProgress || 0}%`, trend: '+12%', color: 'emerald' },
            { label: 'Critical Gaps', value: metrics?.criticalSkillGaps || 0, trend: '-2', color: 'rose' },
            { label: 'Certifications', value: metrics?.certificationsIssued || 0, trend: '+18', color: 'indigo' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded bg-${stat.trend.startsWith('+') ? 'green' : 'red'}-50 text-${stat.trend.startsWith('+') ? 'green' : 'red'}-600`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Learner Table */}
          <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Individual Performance Tracking</h2>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Filter by name..." 
                  className="px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <th className="px-8 py-4">Learner Profile</th>
                    <th className="px-8 py-4">Metric Status</th>
                    <th className="px-8 py-4">Efficiency</th>
                    <th className="px-8 py-4">Target Deficiency</th>
                    <th className="px-8 py-4">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {learners.map((learner) => (
                    <tr key={learner.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                            {learner.firstName[0]}{learner.lastName[0]}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {learner.firstName} {learner.lastName}
                            </div>
                            <div className="text-xs font-medium text-slate-500">{learner.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-tight uppercase ${
                          learner.status === 'active' ? 'bg-green-100 text-green-700' :
                          learner.status === 'at_risk' ? 'bg-red-100 text-red-700' :
                          learner.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {learner.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-1.5 min-w-[120px]">
                          <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>PROGRESS</span>
                            <span>{learner.completionPercentage}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                learner.completionPercentage > 80 ? 'bg-emerald-500' : 
                                learner.completionPercentage > 40 ? 'bg-blue-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${learner.completionPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                          {learner.topSkillGap}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-slate-400">
                        {new Date(learner.lastActivity).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/30 text-center">
              <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">
                View All Personnel Records
              </button>
            </div>
          </div>

          {/* Skill Gap Analysis Sidebar */}
          <div className="xl:col-span-4 flex flex-col gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
                Critical Skill Deficiencies
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded">Q2 ANALYTICS</span>
              </h3>
              <div className="space-y-8">
                {skillGaps.length > 0 ? skillGaps.map((gap, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-sm font-bold text-slate-700 block leading-none">{gap.skillName}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1 block">
                          Affecting {gap.affectedLearners} users
                        </span>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest ${
                        gap.priority === 'high' ? 'bg-red-500 text-white' : 
                        gap.priority === 'medium' ? 'bg-amber-400 text-white' : 'bg-slate-400 text-white'
                      }`}>
                        {gap.priority}
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-3 text-xs flex rounded-lg bg-slate-100">
                        <div 
                          style={{ width: `${gap.gapIntensity}%` }} 
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-700 ${
                            gap.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-rose-600' : 
                            'bg-gradient-to-r from-amber-400 to-orange-500'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="py-10 text-center text-slate-400 font-medium">
                    No critical gaps detected in current cohort.
                  </div>
                )}
              </div>
              <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]">
                Generate Intervention Plan
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-lg font-bold mb-2">Certification Roadmap</h3>
              <p className="text-blue-100 text-sm font-medium mb-6 leading-relaxed">
                42 Learners are currently within 15% of completing the 'Enterprise Systems Security' certification.
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Cohort Readiness</span>
                <span className="text-2xl font-black">74%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-6">
                <div className="bg-white h-2 rounded-full shadow-sm" style={{ width: '74%' }}></div>
              </div>
              <button className="w-full py-3 bg-white text-blue-700 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors">
                Accelerate Pathway
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 border-t border-slate-200 py-10 px-6 text-center">
        <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">
          SIH 25199 Proprietary Enterprise Portal &copy; 2024 | Version 1.0.0-Stable
        </p>
      </footer>
    </div>
  );
};

export default TrainerDashboard;