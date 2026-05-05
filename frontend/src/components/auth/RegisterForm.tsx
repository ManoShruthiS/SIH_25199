import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setServerError(null);
    try {
      // Integration with project authentication backend
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Success redirect to login with state message
      navigate('/login', { 
        state: { message: 'Account created successfully. Please sign in to continue.' } 
      });
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">SIH 25199 Enterprise Access Portal</p>
      </div>

      {serverError && (
        <div className="p-4 text-sm text-red-700 bg-red-50 border-l-4 border-red-500 rounded animate-pulse">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <User size={18} />
            </div>
            <input
              {...register('name')}
              type="text"
              id="name"
              className={`block w-full pl-11 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300'
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Mail size={18} />
            </div>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`block w-full pl-11 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300'
              }`}
              placeholder="name@enterprise.gov.in"
            />
          </div>
          {errors.email && <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`block w-full pl-11 pr-12 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.password.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <ShieldCheck size={18} />
            </div>
            <input
              {...register('confirmPassword')}
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              className={`block w-full pl-11 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ${
                errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300'
              }`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>

        <div className="pt-4 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="font-bold text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;