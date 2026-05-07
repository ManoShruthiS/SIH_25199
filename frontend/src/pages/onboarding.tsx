import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import api from '../lib/api';

/**
 * SIH 25199 - User Skills Assessment & Onboarding
 * Release Target: May 18
 * This module handles the initial profiling of enterprise users to tailor the platform experience.
 */

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface OnboardingData {
  role: string;
  experienceYears: number;
  skills: string[];
  bio: string;
  preferences: {
    notifications: boolean;
    visibility: 'public' | 'private' | 'internal';
  };
}

const STEPS = [
  { id: 1, title: 'Professional Role', description: 'What is your primary function?' },
  { id: 2, title: 'Skill Inventory', description: 'Select your core competencies' },
  { id: 3, title: 'Experience Level', description: 'Define your expertise depth' },
  { id: 4, title: 'Finalize Profile', description: 'Setting up your workspace' }
];

const AVAILABLE_SKILLS = [
  { id: '1', name: 'React/Next.js', category: 'Frontend' },
  { id: '2', name: 'Node.js', category: 'Backend' },
  { id: '3', name: 'Python/Django', category: 'Backend' },
  { id: '4', name: 'PostgreSQL', category: 'Database' },
  { id: '5', name: 'AWS/Cloud', category: 'Infrastructure' },
  { id: '6', name: 'TypeScript', category: 'Languages' },
  { id: '7', name: 'Docker/K8s', category: 'DevOps' },
  { id: '8', name: 'GraphQL', category: 'API' }
];

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<OnboardingData>({
    role: '',
    experienceYears: 0,
    skills: [],
    bio: '',
    preferences: {
      notifications: true,
      visibility: 'internal'
    }
  });

  useEffect(() => {
    if (!auth?.isLoading && !auth?.isAuthenticated) {
      router.push('/login');
    }
  }, [auth, router]);

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = () => {
    setError(null);
    if (currentStep === 1 && !formData.role) {
      setError('Please select a professional role.');
      return false;
    }
    if (currentStep === 2 && formData.skills.length === 0) {
      setError('Please select at least one skill to proceed.');
      return false;
    }
    return true;
  };

  const toggleSkill = (skillName: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillName)
        ? prev.skills.filter(s => s !== skillName)
        : [...prev.skills, skillName]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.post('/users/onboarding-complete', formData);
      if (auth?.updateUser) {
        auth.updateUser({ ...auth.user, ...formData } as any);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save profile. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (auth?.isLoading) return <div className="flex h-screen items-center justify-center">Initializing...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-slate-200">
        
        {/* Progress Header */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                  currentStep >= step.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <span className={`text-xs mt-2 font-medium ${currentStep >= step.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 h-0.5 bg-slate-200 w-full -z-0">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300" 
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">{STEPS[currentStep - 1].title}</h2>
          <p className="text-slate-500 mt-1">{STEPS[currentStep - 1].description}</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="mt-8 min-h-[300px]">
          {/* Step 1: Role */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {['Engineering', 'Product', 'Design', 'Data Science', 'Operations', 'Management'].map((role) => (
                <button
                  key={role}
                  onClick={() => setFormData({ ...formData, role })}
                  className={`p-4 text-left rounded-lg border-2 transition-all ${
                    formData.role === role ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  <span className="block font-semibold text-slate-900">{role}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Skills */}
          {currentStep === 2 && (
            <div>
              <div className="flex flex-wrap gap-3">
                {AVAILABLE_SKILLS.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.name)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                      formData.skills.includes(skill.name)
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">Years of Experience</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-4 accent-indigo-600"
                />
                <div className="text-center mt-2 font-bold text-indigo-600">{formData.experienceYears}+ years</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Brief Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us a bit about your professional background..."
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
                />
              </div>
            </div>
          )}

          {/* Step 4: Finalize */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-4">Review Summary</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Selected Role</dt>
                    <dd className="mt-1 text-sm text-slate-900">{formData.role || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Experience</dt>
                    <dd className="mt-1 text-sm text-slate-900">{formData.experienceYears} Years</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-slate-500">Skills Selected</dt>
                    <dd className="mt-1 text-sm text-slate-900 flex flex-wrap gap-1">
                      {formData.skills.map(s => (
                        <span key={s} className="bg-slate-200 px-2 py-0.5 rounded text-xs">{s}</span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center">
                <input
                  id="notifications"
                  type="checkbox"
                  checked={formData.preferences.notifications}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, notifications: e.target.checked }
                  })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-slate-700">
                  Enable email notifications for project updates
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
            className={`px-6 py-2 text-sm font-medium rounded-md ${
              currentStep === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Back
          </button>
          
          {currentStep < STEPS.length ? (
            <button
              onClick={handleNext}
              className="px-8 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center ${
                isSubmitting ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {isSubmitting ? 'Finalizing...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;