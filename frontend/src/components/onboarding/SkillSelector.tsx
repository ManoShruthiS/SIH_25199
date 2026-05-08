import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Check, Plus, Code, Database, Globe, Shield, Terminal, Layers } from 'lucide-react';

/**
 * SIH 25199 - Enterprise Portal
 * Component: SkillSelector
 * Description: High-performance skill selection interface with category filtering and search.
 * Release Target: May 18
 */

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

type SkillCategory = 'Frontend' | 'Backend' | 'DevOps' | 'Data Science' | 'Security' | 'Cloud' | 'Other';

interface SkillSelectorProps {
  initialSelected?: string[];
  onChange: (selectedIds: string[]) => void;
  maxSelection?: number;
}

const SKILL_DATABASE: Skill[] = [
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend' },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend' },
  { id: 'python', name: 'Python', category: 'Backend' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Backend' },
  { id: 'mongodb', name: 'MongoDB', category: 'Backend' },
  { id: 'docker', name: 'Docker', category: 'DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps' },
  { id: 'aws', name: 'AWS', category: 'Cloud' },
  { id: 'azure', name: 'Azure', category: 'Cloud' },
  { id: 'pytorch', name: 'PyTorch', category: 'Data Science' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'Data Science' },
  { id: 'cybersec', name: 'Cyber Security', category: 'Security' },
  { id: 'graphql', name: 'GraphQL', category: 'Backend' },
  { id: 'rust', name: 'Rust', category: 'Backend' },
  { id: 'golang', name: 'Go', category: 'Backend' },
];

const CATEGORY_ICONS: Record<SkillCategory, React.ReactNode> = {
  Frontend: <Globe className="w-4 h-4" />,
  Backend: <Database className="w-4 h-4" />,
  DevOps: <Terminal className="w-4 h-4" />,
  'Data Science': <Layers className="w-4 h-4" />,
  Security: <Shield className="w-4 h-4" />,
  Cloud: <Code className="w-4 h-4" />,
  Other: <Plus className="w-4 h-4" />,
};

const SkillSelector: React.FC<SkillSelectorProps> = ({ 
  initialSelected = [], 
  onChange, 
  maxSelection = 15 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelected);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  useEffect(() => {
    onChange(selectedIds);
  }, [selectedIds, onChange]);

  const filteredSkills = useMemo(() => {
    return SKILL_DATABASE.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const toggleSkill = (skillId: string) => {
    setSelectedIds(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      }
      if (prev.length >= maxSelection) {
        return prev;
      }
      return [...prev, skillId];
    });
  };

  const selectedSkillsData = SKILL_DATABASE.filter(s => selectedIds.includes(s.id));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search technologies (e.g. React, Docker...)"
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            {selectedIds.length} / {maxSelection} selected
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['All', 'Frontend', 'Backend', 'DevOps', 'Cloud', 'Data Science', 'Security'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === cat 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Your Selection</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSkillsData.map(skill => (
              <div 
                key={skill.id}
                className="flex items-center gap-1.5 px-3 py-1 bg-white border border-indigo-200 text-indigo-700 rounded-lg shadow-sm animate-in fade-in zoom-in duration-200"
              >
                <span className="text-sm font-medium">{skill.name}</span>
                <button 
                  onClick={() => toggleSkill(skill.id)}
                  className="hover:bg-indigo-50 p-0.5 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredSkills.map((skill) => {
          const isSelected = selectedIds.includes(skill.id);
          return (
            <button
              key={skill.id}
              onClick={() => toggleSkill(skill.id)}
              disabled={!isSelected && selectedIds.length >= maxSelection}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all group ${
                isSelected 
                ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' 
                : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
              } ${(!isSelected && selectedIds.length >= maxSelection) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100'}`}>
                  {CATEGORY_ICONS[skill.category]}
                </div>
                <div>
                  <div className={`text-sm font-semibold ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {skill.name}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-tight">
                    {skill.category}
                  </div>
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
            </button>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-slate-300" />
          </div>
          <h3 className="text-slate-900 font-medium">No technologies found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default SkillSelector;