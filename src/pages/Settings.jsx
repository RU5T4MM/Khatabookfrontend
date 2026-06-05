import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Globe,
  Sun,
  Moon,
  Sparkles,
  Save
} from 'lucide-react';

const Settings = () => {
  const { user, updateProfile, t, theme, setTheme, language, setLanguage, addNotification } = useApp();
  const navigate = useNavigate();

  // Form Fields
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [ownerName, setOwnerName] = useState(user?.ownerName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!businessName || !ownerName || !phone || !email) {
      addNotification('All fields are required', 'warning');
      return;
    }
    setLoading(true);
    try {
      await updateProfile({ businessName, ownerName, phone, email });
      addNotification('Business profile updated successfully!', 'success');
    } catch (err) {
      addNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (lang) => {
    try {
      setLanguage(lang);
      // Save to profile database
      await updateProfile({ language: lang });
      addNotification(`Language updated to ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Urdu'}`, 'success');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8 animate-fade-in">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-dark-50">{t.settings}</h2>
        <p className="text-xs text-slate-400 font-semibold uppercase">Manage profile configurations and billing details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left column: Quick Preferences */}
        <div className="space-y-6">
          
          {/* Subscription Panel */}
          <div className="glass-card p-5 space-y-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Account Status</span>
            
            {user?.subscription?.plan === 'premium' ? (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-500">Premium Pro Plan</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-dark-400">
                  Active until: <strong className="text-slate-700 dark:text-dark-200">{new Date(user.subscription.expiresAt).toLocaleDateString()}</strong>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-dark-850 rounded-2xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-slate-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-dark-400">Basic Free Tier</span>
                </div>
                <p className="text-[10px] text-slate-400">Upgrade to unlock GST Billing, Expenses & charts.</p>
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full btn-primary text-xs py-2"
                >
                  Upgrade Store
                </button>
              </div>
            )}
          </div>

          {/* Theme & Language control Panel */}
          <div className="glass-card p-5 space-y-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Quick Customization</span>
            
            {/* Theme Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">Theme Preference</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    theme === 'light' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-transparent text-slate-500 border-slate-100 dark:border-dark-800'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    theme === 'dark' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/30' : 'bg-transparent text-slate-500 border-slate-100 dark:border-dark-800'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  Dark
                </button>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">System Language</label>
              <div className="flex flex-col gap-1.5">
                {['en', 'hi', 'ur'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs text-left font-bold flex items-center justify-between border ${
                      language === lang ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/30' : 'bg-transparent text-slate-600 border-slate-100 dark:border-dark-800'
                    }`}
                  >
                    <span>{lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी (Hindi)' : 'اردو (Urdu)'}</span>
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right columns: Profile edit form */}
        <div className="md:col-span-2">
          <form onSubmit={handleUpdateProfile} className="glass-card p-6 space-y-6">
            <h3 className="font-extrabold text-slate-800 dark:text-dark-50 text-base">Business Profile Settings</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Business Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-field pl-9 text-xs"
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
                    className="input-field pl-9 text-xs"
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
                  className="input-field pl-10 text-xs"
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
                  className="input-field pl-10 text-xs"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-2.5 text-xs font-bold">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Preferences
                </>
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default Settings;
