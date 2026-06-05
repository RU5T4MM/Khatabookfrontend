import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, RefreshCw, MessageSquare, Download, Check } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto rounded-b-2xl shadow-sm">
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl premium-gradient text-white font-bold text-xl shadow-md shadow-emerald-500/20">N</div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-800">Nahid Group</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-emerald-600 transition-colors">Success Stories</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="px-5 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-sm">
            Sign In
          </Link>
          <Link to="/login" className="btn-primary text-sm">
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-20 pb-28 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Now supporting Offline Khata & GST Billing
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Manage Business accounts with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">100% Security</span>
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            Ditch your traditional paper ledger registers. Record customer credits/payments (Udhaar), track monthly expenses, generate GST bills, and collect pending balances via automatic WhatsApp reminders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/login" className="btn-primary px-8 py-4 text-base w-full sm:w-auto">
              Start Your Digital Khata
            </Link>
            <a href="#features" className="btn-secondary px-8 py-4 text-base w-full sm:w-auto">
              Explore Features
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">5M+</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Merchants</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.9%</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Uptime Sync</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</h3>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Secure Backup</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Preview */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none animate-fade-in">
          <div className="relative p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/5 rounded-3xl border border-emerald-500/10 shadow-2xl">
            {/* Visual mock card resembling dashboard */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Sharma General Store</h4>
                  <p className="text-[10px] text-slate-400">Merchant Dashboard</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Premium Active</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl">
                  <span className="text-[10px] font-semibold text-emerald-700 block">YOU WILL GET</span>
                  <span className="text-lg font-black text-emerald-600">₹48,250.00</span>
                </div>
                <div className="p-4 bg-rose-50/50 border border-rose-100/50 rounded-2xl">
                  <span className="text-[10px] font-semibold text-rose-700 block">YOU WILL GIVE</span>
                  <span className="text-lg font-black text-rose-600">₹12,400.00</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-500">Recent Customers</h5>
                <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">RK</div>
                    <div>
                      <h6 className="text-xs font-bold text-slate-800">Ramesh Kumar</h6>
                      <p className="text-[9px] text-slate-400">Updated 2 mins ago</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600">+₹1,200.00</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">AS</div>
                    <div>
                      <h6 className="text-xs font-bold text-slate-800">Amit Singh</h6>
                      <p className="text-[9px] text-slate-400">Updated 1 hr ago</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-rose-600">-₹4,500.00</span>
                </div>
              </div>
            </div>
            {/* Background design elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-white border-y border-slate-100 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to automate bookkeeping
            </h2>
            <p className="text-slate-500 font-medium">
              Eliminate errors and bad debts with comprehensive digital ledger tools built directly into one central platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl hover:shadow-md transition-all space-y-4 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><BookOpen className="w-6 h-6" /></div>
              <h3 className="font-bold text-slate-800 text-lg">Digital Khata</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Add transactions with 1-click. Maintain date-wise logs, ledger attachments, and invoices.</p>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-2xl hover:shadow-md transition-all space-y-4 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><MessageSquare className="w-6 h-6" /></div>
              <h3 className="font-bold text-slate-800 text-lg">WhatsApp Alerts</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Send pre-formatted payment alerts to customers. Speed up collections by up to 3x.</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl hover:shadow-md transition-all space-y-4 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><RefreshCw className="w-6 h-6" /></div>
              <h3 className="font-bold text-slate-800 text-lg">Auto Cloud Sync</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Runs offline natively. Once connection is restored, transactions sync instantly to the cloud.</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl hover:shadow-md transition-all space-y-4 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><ShieldCheck className="w-6 h-6" /></div>
              <h3 className="font-bold text-slate-800 text-lg">100% Secure</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Automatic daily data backups, encrypted passwords, and multi-factor OTP logging validation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Simple Transparent Pricing</h2>
          <p className="text-slate-500 font-medium">Choose the tier that matches your business scale. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Card */}
          <div className="p-8 bg-white border border-slate-150 rounded-3xl space-y-6 flex flex-col">
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-slate-800">Basic Free</h3>
              <p className="text-xs text-slate-400 font-semibold">Perfect for small merchants getting started.</p>
              <div className="pt-4"><span className="text-4xl font-extrabold text-slate-900">₹0</span><span className="text-sm text-slate-400">/forever</span></div>
            </div>
            
            <ul className="space-y-3.5 text-sm text-slate-600 flex-1">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-500" /> Unlimited Customers</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-500" /> Cloud Sync & Offline Mode</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-500" /> WhatsApp Sharing Reminders</li>
              <li className="flex items-center gap-2.5 text-slate-350"><Check className="w-4 h-4 text-slate-200" /> GST Invoicing (PDF Download)</li>
            </ul>

            <Link to="/login" className="w-full btn-secondary text-center">Start Free</Link>
          </div>

          {/* Premium Card */}
          <div className="p-8 bg-gradient-to-br from-slate-900 to-dark-950 text-white rounded-3xl space-y-6 flex flex-col relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Most Popular</div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-xl">Premium Pro</h3>
              <p className="text-xs text-slate-400 font-semibold">For stores requiring GST Billing & automated reminders.</p>
              <div className="pt-4"><span className="text-4xl font-extrabold">₹499</span><span className="text-sm text-slate-400">/month</span></div>
            </div>
            
            <ul className="space-y-3.5 text-sm text-slate-300 flex-1">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Everything in Free</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> GST Invoice Builder (Print & PDF)</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Expense Tracker & Recharts Analytics</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Premium Dashboard & Priority SMS Alerting</li>
            </ul>

            <Link to="/login" className="w-full btn-primary border-none shadow-none text-center">Get Premium Pro</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center font-bold text-white text-sm">N</div>
            <span className="font-bold text-white text-lg">Nahid Group</span>
          </div>
          
          <p className="text-xs">© 2026 Nahid Group. All rights reserved. Secured by AES-256 cloud sync standards.</p>
          
          <div className="flex flex-col sm:flex-row gap-2 text-xs font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="hover:text-white transition-colors">Call 7860799398</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
