// pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, ArrowRight, Shield, ChevronLeft } from 'lucide-react';
import Logo from '@/assets/home/logo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(email, password);

    if (result.success) {
      const userRole = result.data?.data?.role;

      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      setError(result.error || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] font-['Manrope']">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 backdrop-blur-[20px] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 h-[62px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="mr-2 transition-colors text-white/30 hover:text-white/60"
            >
              <ChevronLeft className="w-[18px] h-[18px]" />
            </button>
            <div className="flex items-center gap-3">
              <img 
                src={Logo} 
                alt="BRT150" 
                className="h-8 w-auto object-contain"
              />
              <div>
                <div className="text-white font-bold text-sm leading-none mb-0.5">BRT150</div>
                <div className="font-bold tracking-[0.22em] uppercase text-[9px] text-[#C9A227]">
                  Demo Day
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-white/20">
            <Lock className="w-[11px] h-[11px]" />
            Secure Login
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen pt-[62px] bg-[#050505] flex items-center justify-center px-4">
        <div className="max-w-[580px] w-full py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-bold leading-[1.15] mb-4 text-[clamp(2rem,5vw,2.75rem)] text-white">
              Welcome <span className="bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] bg-clip-text text-transparent">Back</span>
            </h1>
            <p className="text-base font-medium max-w-sm mx-auto leading-relaxed text-white/40">
              Sign in to your BRT150 Demo Day account
            </p>
          </div>

          {/* Card Container */}
          <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#151010] to-[#0E0909] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-[10px] font-medium text-[#C9A227] hover:text-[#DFBA3A] transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed w-full px-8 py-4 text-[15px] bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505] shadow-[0_4px_20px_rgba(201,162,39,0.3)] hover:shadow-[0_4px_32px_rgba(201,162,39,0.4)] font-['Manrope']"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest text-center mb-4">
                Demo Accounts
              </p>
              <div className="space-y-2.5">
                {/* <button
                  onClick={() => {
                    setEmail('harish.backend.dev@gmail.com');
                    setPassword('test@123');
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-left bg-[#0A0707] border border-white/5 hover:border-[#C9A227]/40 hover:bg-[#C9A227]/5"
                >
                  <span className="font-medium text-white/80 text-xs">User</span>
                  <span className="text-white/30 text-xs">harish.backend.dev@gmail.com</span>
                </button> */}
                <button
                  onClick={() => {
                    setEmail('admin@gmail.com');
                    setPassword('Test@1234');
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-left bg-[#0A0707] border border-white/5 hover:border-[#C9A227]/40 hover:bg-[#C9A227]/5"
                >
                  <span className="font-medium text-white/80 text-xs">Admin</span>
                  <span className="text-white/30 text-xs">admin@demo.com</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            {/* <div className="mt-6 pt-5 border-t border-white/5">
              <p className="text-center text-xs text-white/30">
                New here?{' '}
                <Link to="/onboarding" className="text-[#C9A227] font-semibold hover:text-[#DFBA3A] transition-colors">
                  Create account
                </Link>
              </p>
            </div> */}
          </div>

          {/* Security Footer */}
          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-white/15">
            <Shield className="w-3.5 h-3.5" />
            <span>Enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;