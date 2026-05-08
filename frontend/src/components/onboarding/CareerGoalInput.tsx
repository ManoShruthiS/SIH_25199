import React, { useState, useEffect } from 'react';

/**
 * CareerGoalInput Component
 * Part of the SIH 25199 Enterprise Onboarding Flow.
 * Captures user's target job role to personalize the platform experience.
 * Release Version: 1.0.0 (May 18)
 */

interface CareerGoalInputProps {
  initialValue?: string;
  onSave: (goal: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const SUGGESTED_ROLES = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "DevOps Architect",
  "System Administrator",
  "Security Analyst",
  "Cloud Engineer"
];

export const CareerGoalInput: React.FC<CareerGoalInputProps> = ({
  initialValue = '',
  onSave,
  onBack,
  onNext
}) => {
  const [goal, setGoal] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValue) {
      setGoal(initialValue);
    }
  }, [initialValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
    if (error) setError(null);
  };

  const handleSuggestionClick = (role: string) => {
    setGoal(role);
    if (error) setError(null);
  };

  const handleContinue = () => {
    const trimmedGoal = goal.trim();
    if (!trimmedGoal) {
      setError('Please specify your career goal to proceed.');
      return;
    }
    
    if (trimmedGoal.length < 2) {
      setError('Please enter a valid job title.');
      return;
    }

    onSave(trimmedGoal);
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Define your target career path</h2>
        <p className="text-slate-600 leading-relaxed">
          Specify the professional role you are currently pursuing. This information helps our enterprise 
          engine align available opportunities and training modules with your objectives.
        </p>
      </div>

      <div className="space-y-8">
        <div className="relative">
          <label htmlFor="careerGoal" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Target Job Title
          </label>
          <input
            type="text"
            id="careerGoal"
            value={goal}
            onChange={handleInputChange}
            autoFocus
            placeholder="e.g. Senior Backend Architect"
            className={`w-full px-4 py-4 text-lg border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 ${
              error ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'
            }`}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Common Industry Roles</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleSuggestionClick(role)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  goal.toLowerCase() === role.toLowerCase()
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-slate-100 pt-8">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-2 text-slate-500 font-medium hover:text-slate-800 transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-95"
        >
          Confirm & Continue
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CareerGoalInput;