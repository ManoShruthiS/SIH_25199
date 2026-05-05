import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Project Tracking', href: '/projects' },
        { label: 'Resources', href: '/resources' },
        { label: 'Analytics', href: '/analytics' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: '/support' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Security', href: '/security' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">SIH 25199</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Enterprise-grade project management and monitoring system designed for high-stakes 
              deliverables and real-time collaboration. Streamlining workflows for 
              large-scale technical implementations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-sm hover:text-indigo-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm">
                <Mail size={16} className="text-indigo-500" />
                <span>ops@sih-25199.internal</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone size={16} className="text-indigo-500" />
                <span>+1 (555) 010-8899</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin size={16} className="text-indigo-500 mt-1" />
                <span>1221 Innovation Way,<br />Tech District, CA 94025</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-xs text-slate-500">
            &copy; {currentYear} Enterprise Project SIH 25199. All rights reserved. 
            Internal Build: v1.0.4-stable.
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>System Status: Operational</span>
            </span>
            <div className="text-xs text-slate-500">
              Deadline: May 18, 2024
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;