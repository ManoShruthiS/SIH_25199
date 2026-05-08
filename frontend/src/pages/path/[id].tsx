import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '@/lib/api';
import { AuthContext } from '@/context/AuthContext';

/**
 * SIH 25199 - Learning Path Detail Page
 * Release Target: May 18
 * Enterprise-grade dynamic routing for curriculum progression.
 */

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'quiz' | 'reading';
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface PathDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  progress: number;
  modules: Module[];
}

const PathDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const auth = useContext(AuthContext);

  const [path, setPath] = useState<PathDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPathDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/paths/${id}`);
        setPath(response.data);
        if (response.data.modules.length > 0) {
          setActiveModule(response.data.modules[0].id);
        }
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to load learning path details.');
        console.error('Error fetching path:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPathDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !path) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800">Path Not Found</h2>
        <p className="text-gray-600 mt-2">{error || "The requested learning path doesn't exist or has been moved."}</p>
        <button 
          onClick={() => router.push('/dashboard')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Head>
        <title>{path.title} | SIH 25199 Enterprise</title>
      </Head>

      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push('/dashboard')}>Dashboard</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push('/paths')}>Learning Paths</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{path.title}</span>
          </div>
          
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:truncate">
                {path.title}
              </h1>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="font-semibold text-gray-900 mr-1">Difficulty:</span> {path.difficulty}
                </span>
                <span className="flex items-center">
                  <span className="font-semibold text-gray-900 mr-1">Est. Time:</span> {path.estimatedHours} Hours
                </span>
                <span className="flex items-center">
                  <span className="font-semibold text-gray-900 mr-1">Category:</span> {path.category}
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-col md:mt-0 md:ml-4 items-end">
              <div className="w-64 bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${path.progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">{path.progress}% Completed</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About this Path</h2>
              <p className="text-gray-700 leading-relaxed">
                {path.description}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Curriculum</h2>
              {path.modules.map((module) => (
                <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button 
                    onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.lessons.length} Lessons</p>
                    </div>
                    <svg 
                      className={`w-6 h-6 transition-transform ${activeModule === module.id ? 'rotate-180' : ''}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeModule === module.id && (
                    <div className="border-t border-gray-100 bg-white">
                      <ul className="divide-y divide-gray-100">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-center justify-between p-4 hover:bg-blue-50 transition cursor-pointer">
                            <div className="flex items-center space-x-3">
                              {lesson.completed ? (
                                <span className="h-6 w-6 text-green-500 flex-shrink-0">
                                  <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              ) : (
                                <span className="h-6 w-6 border-2 border-gray-300 rounded-full flex-shrink-0"></span>
                              )}
                              <div>
                                <p className={`text-sm font-medium ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                  {lesson.title}
                                </p>
                                <span className="text-xs text-gray-400 uppercase">{lesson.type} • {lesson.duration}</span>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                              {lesson.completed ? 'Review' : 'Start'}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progression</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${path.progress > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {path.progress === 100 ? 'Completed' : path.progress > 0 ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Instructor</span>
                  <span className="text-gray-900 font-medium">Enterprise Learning Team</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Access Level</span>
                  <span className="text-gray-900 font-medium capitalize">{auth?.user?.role || 'Guest'}</span>
                </div>
                
                <button 
                  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  onClick={() => {/* Trigger course player */}}
                >
                  {path.progress > 0 ? 'Continue Learning' : 'Start Learning Path'}
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4 italic">
                  Release v1.0.4 - SIH Project 25199
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PathDetailPage;