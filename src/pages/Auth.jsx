import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, KeyRound, Building, User, HelpCircle, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const { login, signup, sendOtp, verifyOtp, forgotPassword, addNotification } = useApp();
  const navigate = useNavigate();

  // Mode state: 'login' | 'signup' | 'otp' | 'forgot'
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');

  // OTP login state
  const [otpSent, setOtpSent] = useState(false);
  const [otpMockCode, setOtpMockCode] = useState('');
  const [isNewOtpUser, setIsNewOtpUser] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
      addNotification('Logged in successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      addNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !businessName || !ownerName || !phone) {
      addNotification('All fields are required', 'warning');
      return;
    }
    setLoading(true);
    try {
      await signup({ businessName, ownerName, phone, email, password });
      addNotification('Account created successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      addNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    try {
      const data = await sendOtp(phone);
      setOtpSent(true);
      setOtpMockCode(data.otpCode);
      addNotification(`OTP sent! Developer Simulated Code: ${data.otpCode}`, 'success');
    } catch (err) {
      addNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!phone || !otp) return;
    setLoading(true);
    try {
      const payload = { phone, otp };
      if (isNewOtpUser) {
        payload.businessName = businessName;
        payload.ownerName = ownerName;
        payload.email = email;
      }

      const res = await verifyOtp(payload);
      
      if (res.newUser) {
        setIsNewOtpUser(true);
        addNotification('Phone verified. Fill profile to complete signup.', 'info');
      } else {
        addNotification('Logged in successfully via OTP!', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      addNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      addNotification(`Temporary password sent! Code: ${res.tempPassword}`, 'success');
      setEmail('');
      setMode('login');
    } catch (err) {
      addNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-950 px-4 py-12">
      <div className="max-w-md w-full glass-card p-8 border border-slate-100 dark:border-dark-850 shadow-xl space-y-6">
        
        {/* Brand Logo and Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl premium-gradient text-white font-bold text-2xl shadow-md shadow-emerald-500/20">K</div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-dark-50">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Your Store'}
            {mode === 'otp' && 'OTP Phone Login'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            {mode === 'login' && 'Sign in to access your ledger'}
            {mode === 'signup' && 'Get started with digital khata'}
            {mode === 'otp' && 'Instant passcode authentication'}
            {mode === 'forgot' && 'We will send a temporary key'}
          </p>
        </div>

        {/* ==================== 1. EMAIL LOGIN MODE ==================== */}
        {mode === 'login' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-dark-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="name@business.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 dark:text-dark-400">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-500"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary mt-6">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Sign In'}
            </button>
          </form>
        )}

        {/* ==================== 2. EMAIL SIGNUP MODE ==================== */}
        {mode === 'signup' && (
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Business Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-field pl-9 text-sm"
                    placeholder="E.g., Verma Stores"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Owner Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="input-field pl-9 text-sm"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Mobile Phone</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field pl-10"
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="sharma@stores.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-9"
                  placeholder="Create password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary mt-4">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Register Business'}
            </button>
          </form>
        )}

        {/* ==================== 3. OTP AUTHENTICATION MODE ==================== */}
        {mode === 'otp' && (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Mobile Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field pl-11"
                      placeholder="Enter 10-digit number"
                      required
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary">
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Send OTP verification'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {/* Simulated OTP Helper Display Box */}
                {otpMockCode && (
                  <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-500 flex flex-col gap-1">
                    <span>📱 OTP SIMULATOR ALERT:</span>
                    <span>Verification code: <strong className="text-sm tracking-widest">{otpMockCode}</strong> (Pre-fills on click)</span>
                    <button
                      type="button"
                      onClick={() => setOtp(otpMockCode)}
                      className="text-left underline mt-1 text-emerald-600 font-bold"
                    >
                      Fill OTP code automatically
                    </button>
                  </div>
                )}

                {/* Additional Register inputs if new OTP account */}
                {isNewOtpUser && (
                  <div className="space-y-3 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <h4 className="text-xs font-bold text-slate-600">Register New Account</h4>
                    <input
                      type="text"
                      placeholder="Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="input-field text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Owner Name"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="input-field text-sm"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field text-sm"
                      required
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">6-Digit Passcode OTP</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="input-field pl-11 tracking-widest text-center text-lg font-black"
                      placeholder="123456"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                      setIsNewOtpUser(false);
                    }}
                    className="btn-secondary flex-1"
                  >
                    Edit Phone
                  </button>
                  <button type="submit" disabled={loading} className="btn-primary flex-[2]">
                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Confirm & Login'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ==================== 4. FORGOT PASSWORD MODE ==================== */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">Register Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="name@business.com"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="btn-secondary flex-1 text-sm"
              >
                Back to Login
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 text-sm">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Reset Password'}
              </button>
            </div>
          </form>
        )}

        {/* Panel Switcher footer */}
        <div className="pt-6 border-t border-slate-50 dark:border-dark-850 flex flex-col gap-3 text-center text-xs font-semibold text-slate-500 dark:text-dark-400">
          {mode === 'login' && (
            <>
              <div>
                Don't have a ledger account?{' '}
                <button onClick={() => setMode('signup')} className="text-emerald-600 hover:underline">
                  Sign Up
                </button>
              </div>
              <div>
                Prefer instant login?{' '}
                <button onClick={() => setMode('otp')} className="text-emerald-600 hover:underline">
                  Login via OTP Code
                </button>
              </div>
            </>
          )}

          {mode === 'signup' && (
            <div>
              Already using Nahid Group?{' '}
              <button onClick={() => setMode('login')} className="text-emerald-600 hover:underline">
                Sign In
              </button>
            </div>
          )}

          {mode === 'otp' && (
            <div>
              Back to{' '}
              <button onClick={() => setMode('login')} className="text-emerald-600 hover:underline">
                Password Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
