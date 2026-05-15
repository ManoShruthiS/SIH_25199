import React from 'react';
import { Shield, Zap, BarChart3, Users, Layout, Lock } from 'lucide-react';

/**
 * SIH 25199 - Enterprise Features Component
 * Release Target: May 18
 * 
 * This component renders the core value proposition grid for the landing page.
 * Designed with Tailwind CSS for responsive behavior and high-fidelity visuals.
 */

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureItem: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <div className="flex flex-col p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    <div className="w-14 h-14 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const Features: React.FC = () => {
  const featureData = [
    {
      title: "Enterprise-Grade Security",
      description: "Implemented with OAuth2 standards, JWT-based session management, and end-to-end encryption for all sensitive enterprise data packets.",
      icon: <Shield size={28} />,
    },
    {
      title: "Real-time Intelligence",
      description: "Advanced data visualization pipelines that synchronize with the FastAPI backend to provide sub-second latency on operational metrics.",
      icon: <BarChart3 size={28} />,
    },
    {
      title: "Granular Access Control",
      description: "Comprehensive RBAC (Role-Based Access Control) system allowing administrators to define precise permissions for users and managers.",
      icon: <Users size={28} />,
    },
    {
      title: "High-Availability Core",
      description: "Engineered for maximum uptime using containerized microservices and a robust PostgreSQL persistence layer for critical operations.",
      icon: <Zap size={28} />,
    },
    {
      title: "Extensible Architecture",
      description: "Modular design pattern allows for seamless integration of new business logic and external API services without breaking core workflows.",
      icon: <Layout size={28} />,
    },
    {
      title: "Audit Transparency",
      description: "Comprehensive logging and data integrity checks ensure that every system transaction is tracked and verifiable for compliance audits.",
      icon: <Lock size={28} />,
    },
  ];

  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Project SIH 25199
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Advanced Infrastructure for <br className="hidden md:block" /> Modern Enterprise Portals
          </h2>
          <div className="w-20 h-1.5 bg-indigo-600 rounded-full mb-6"></div>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            A production-ready environment optimized for the May 18 deployment, focusing on scalability, 
            security, and high-performance data processing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featureData.map((feature, index) => (
            <FeatureItem
              key={`feature-${index}`}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
        
        <div className="mt-20 p-8 rounded-3xl bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h4 className="text-2xl font-bold mb-2">Ready to initiate deployment?</h4>
            <p className="text-gray-400">Join the enterprise portal and streamline your internal workflows today.</p>
          </div>
          <button className="whitespace-nowrap px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors duration-200">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;