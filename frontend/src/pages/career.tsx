import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Search, 
  ChevronRight, 
  BarChart2, 
  MapPin,
  Clock
} from 'lucide-react';

interface LMIData {
  id: string;
  job_title: string;
  industry: string;
  median_salary: number;
  growth_rate: number;
  demand_level: 'High' | 'Medium' | 'Low';
  required_skills: string[];
  top_locations: string[];
  education_level: string;
  description: string;
}

interface CareerRecommendation {
  career: LMIData;
  match_score: number;
  skill_gap: string[];
}

const CareerGuidancePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'market_trends'>('recommendations');
  const [marketData, setMarketData] = useState<LMIData[]>([]);

  const fetchCareerData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Parallel fetch for recommendations and general market data
      const [recRes, marketRes] = await Promise.all([
        api.get('/career-guidance/recommendations'),
        api.get('/career-guidance/market-trends')
      ]);

      setRecommendations(recRes.data);
      setMarketData(marketRes.data);
    } catch (error) {
      console.error('Failed to fetch Labor Market Information:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCareerData();
  }, [fetchCareerData]);

  const filteredMarketData = marketData.filter(item => 
    item.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Head>
        <title>Career Guidance | SIH 25199 Enterprise</title>
      </Head>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Career Path Navigator</h1>
              <p className="mt-2 text-sm text-gray-600">
                Data-driven insights powered by real-time Labor Market Information (LMI)
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search industries or roles..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-8 mt-8 border-b border-gray-100">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'recommendations' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tailored Recommendations
            </button>
            <button
              onClick={() => setActiveTab('market_trends')}
              className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'market_trends' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Market Trends (LMI)
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500 font-medium">Analyzing market data for SIH-25199...</p>
          </div>
        ) : activeTab === 'recommendations' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {recommendations.length > 0 ? (
                recommendations.map((rec) => (
                  <div key={rec.career.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {Math.round(rec.match_score * 100)}% Match
                          </span>
                          <h3 className="mt-2 text-xl font-bold text-gray-900">{rec.career.job_title}</h3>
                          <p className="text-gray-500 text-sm">{rec.career.industry}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">Est. Salary</p>
                          <p className="text-lg font-bold text-green-600">${rec.career.median_salary.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{rec.career.growth_rate}% Growth</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <BarChart2 className="h-4 w-4 mr-2 text-purple-500" />
                          <span>{rec.career.demand_level} Demand</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-red-500" />
                          <span>{rec.career.top_locations[0]}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-green-500" />
                          <span>Full-time</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.career.required_skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border border-gray-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {rec.skill_gap.length > 0 && (
                        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Skill Gaps Identified</h4>
                          <ul className="mt-2 text-sm text-amber-700 list-disc list-inside">
                            {rec.skill_gap.slice(0, 3).map((gap) => (
                              <li key={gap}>{gap}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
                      <button className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
                        View Learning Path <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations found</h3>
                  <p className="mt-1 text-sm text-gray-500">Complete your profile to get personalized career advice.</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Your Profile Strength
                </h3>
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          Intermediate
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          65%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                      <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Add 3 more certifications to reach Advanced status.</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg text-white">
                <h3 className="text-lg font-bold">LMI Insight</h3>
                <p className="mt-2 text-sm text-blue-100 leading-relaxed">
                  The Cybersecurity and Data Analytics sectors in your region are projected to grow by 22% over the next 18 months. Consider focusing on Cloud Security certifications to maximize salary potential.
                </p>
                <button className="mt-4 w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarketData.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <BarChart2 className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      job.demand_level === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {job.demand_level} Demand
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.job_title}</h3>
                <p className="text-sm text-gray-500 truncate">{job.industry}</p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Median Salary</span>
                    <span className="font-semibold text-gray-900">${job.median_salary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Annual Growth</span>
                    <span className="font-semibold text-green-600">+{job.growth_rate}%</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex -space-x-2">
                    {job.top_locations.map((loc, i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600" title={loc}>
                        {loc.substring(0, 2).toUpperCase()}
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-400">
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Late night crunch note - SIH 25199 Deployment Readiness */}
      <footer className="mt-12 text-center text-gray-400 text-[10px]">
        SIH 25199 - Enterprise Portal v1.0.4-release. Built for May 18 deadline.
      </footer>
    </div>
  );
};

export default CareerGuidancePage;