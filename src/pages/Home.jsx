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
      <section className="relative overflow-hidden px-6 pt-24 pb-28 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Dotted Grid Pattern Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"></div>
        
        {/* Soft background light glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse-subtle"></div>

        <div className="flex-1 text-center lg:text-left space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/80 backdrop-blur-sm text-emerald-700 border border-emerald-100 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Now supporting Offline Khata & GST Billing
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Manage Business accounts with <span className="text-gradient-emerald">100% Security</span>
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Ditch your traditional paper ledger registers. Record customer credits/payments (Udhaar), track monthly expenses, generate GST bills, and collect pending balances via automatic WhatsApp reminders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/login" className="btn-primary px-8 py-4 text-base w-full sm:w-auto shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all">
              Start Your Digital Khata
            </Link>
            <a href="#features" className="btn-secondary px-8 py-4 text-base w-full sm:w-auto hover:bg-slate-200 hover:scale-[1.02] active:scale-95 transition-all">
              Explore Features
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">5M+</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Merchants</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">99.9%</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Uptime Sync</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">100%</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Secure Backup</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Preview: Overlapping Double Mobile App Mockups */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-rose-100/50 via-rose-50/30 to-rose-100/40 rounded-[48px] border border-rose-200/40 shadow-inner relative overflow-hidden min-h-[580px] animate-fade-in">
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose-300/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute top-8 left-8 w-8 h-8 bg-rose-300/40 rounded-full blur-md pointer-events-none -z-10"></div>

          {/* ==================== LEFT PHONE: Customers View ==================== */}
          <div className="relative w-[275px] h-[520px] rounded-[42px] bg-black border-[7px] border-slate-900 shadow-2xl overflow-hidden flex flex-col font-sans text-slate-800 rotate-[-6deg] hover:rotate-0 hover:scale-[1.04] transition-all duration-500 z-10 shrink-0">
            {/* Dynamic Island camera notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30"></div>
            {/* Status bar */}
            <div className="h-6.5 bg-[#c23b3b] text-white flex justify-between items-center px-6 text-[8px] font-bold z-20 pt-1 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1 text-[7px] opacity-90">
                <span>📶</span>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* App Top Header bar */}
            <div className="bg-[#c23b3b] text-white pt-1 pb-2 px-4 rounded-b-2xl space-y-1.5 shrink-0 z-10 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-[10.5px] tracking-tight">Nahid Group ˅</span>
                <div className="flex items-center gap-4 text-[9px] font-semibold opacity-90">
                  <span>Suppliers</span>
                </div>
              </div>
              <div className="flex justify-between text-[9px] font-bold pt-1.5 border-t border-white/10">
                <span className="border-b-2 border-white pb-0.5 px-3 cursor-pointer">Customers</span>
                <span className="opacity-75 cursor-pointer">Suppliers</span>
              </div>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative pb-10">
              
              {/* Summary Credit/Debit Card */}
              <div className="m-2.5 bg-white rounded-xl shadow-sm border border-slate-100 p-2.5 space-y-2 shrink-0">
                <div className="grid grid-cols-2 divide-x divide-slate-100 text-center">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-extrabold text-slate-900">₹ 15,000</span>
                    <span className="text-[7.5px] text-slate-400 font-semibold uppercase block tracking-wider">You will give</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-extrabold text-emerald-600">₹ 5,000</span>
                    <span className="text-[7.5px] text-slate-400 font-semibold uppercase block tracking-wider">You will get</span>
                  </div>
                </div>
                <div className="border-t border-slate-50 pt-1 text-center">
                  <span className="text-[8.5px] font-extrabold text-[#c23b3b] hover:underline cursor-pointer flex items-center justify-center gap-0.5">
                    View Report &gt;
                  </span>
                </div>
              </div>

              {/* Action grid links icons */}
              <div className="grid grid-cols-5 gap-1 px-2.5 pb-1 text-center shrink-0">
                <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 text-xs font-bold shadow-sm">📞</div>
                  <span className="text-[6.5px] text-slate-500 font-semibold scale-90 leading-tight">Call Reminders</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xs font-bold shadow-sm">📇</div>
                  <span className="text-[6.5px] text-slate-500 font-semibold scale-90 leading-tight">Business Card</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-xs font-bold shadow-sm">💰</div>
                  <span className="text-[6.5px] text-slate-500 font-semibold scale-90 leading-tight">Earn Money</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xs font-bold shadow-sm">📖</div>
                  <span className="text-[6.5px] text-slate-500 font-semibold scale-90 leading-tight">Cash Book</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-xs font-bold shadow-sm">🔳</div>
                  <span className="text-[6.5px] text-slate-500 font-semibold scale-90 leading-tight">Order QR</span>
                </div>
              </div>

              {/* Search customer box */}
              <div className="mx-2.5 my-1.5 px-3 py-1 bg-white border border-slate-200/80 rounded-lg flex items-center gap-2 shrink-0">
                <span className="text-[9px] text-slate-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search Customer"
                  className="bg-transparent text-[8.5px] outline-none text-slate-700 w-full font-semibold"
                  disabled
                />
              </div>

              {/* Roster ledger list */}
              <div className="flex-1 overflow-y-auto px-2.5 pb-2 space-y-1.5">
                
                {/* Customer item 1 */}
                <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[9px] text-slate-655 uppercase">ED</div>
                    <div>
                      <h4 className="font-extrabold text-[9px] text-slate-800">Ehsaan Davi</h4>
                      <p className="text-[7px] text-slate-400 font-medium">2 Months ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-extrabold text-emerald-600 block">₹ 500</span>
                    <span className="text-[6.5px] text-slate-405 font-bold uppercase block">You will get</span>
                  </div>
                </div>

                {/* Customer item 2 */}
                <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#fce7f3] text-pink-700 flex items-center justify-center font-bold text-[9px] uppercase">UM</div>
                    <div>
                      <h4 className="font-extrabold text-[9px] text-slate-800">Uma Mathur</h4>
                      <p className="text-[7px] text-slate-400 font-medium">1 Months ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-extrabold text-rose-500 block">₹ 3500</span>
                    <span className="text-[6.5px] text-slate-405 font-bold uppercase block">You will give</span>
                  </div>
                </div>

                {/* Customer item 3 */}
                <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-150 flex items-center justify-center font-bold text-[9px] text-slate-600 uppercase">ST</div>
                    <div>
                      <h4 className="font-extrabold text-[9px] text-slate-800">Shivani Tara</h4>
                      <p className="text-[7px] text-slate-400 font-medium">6 Months ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-extrabold text-emerald-600 block">₹ 2500</span>
                    <span className="text-[6.5px] text-slate-405 font-bold uppercase block">You will get</span>
                  </div>
                </div>

                {/* Customer item 4 */}
                <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[9px] text-slate-600 uppercase">NG</div>
                    <div>
                      <h4 className="font-extrabold text-[9px] text-slate-800">Nilima Ghose</h4>
                      <p className="text-[7px] text-slate-400 font-medium">4 Days ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-extrabold text-emerald-600 block">₹ 50</span>
                    <span className="text-[6.5px] text-slate-405 font-bold uppercase block">You will get</span>
                  </div>
                </div>

              </div>

              {/* Floating button */}
              <div className="absolute bottom-11 left-1/2 -translate-x-1/2 px-3.5 py-1.5 bg-[#c23b3b] hover:bg-[#a62c2c] transition-colors rounded-full text-white text-[8px] font-extrabold shadow-md flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider">
                <span>➕</span>
                <span>Add Customer</span>
              </div>
            </div>

            {/* Bottom navigations */}
            <div className="h-9.5 border-t bg-white flex justify-around items-center text-[7.5px] text-slate-400 font-bold shrink-0">
              <span className="text-[#c23b3b] cursor-pointer">🏠 Home</span>
              <span className="cursor-pointer">🪙 Money</span>
              <span className="cursor-pointer">⬜ More</span>
            </div>
          </div>


          {/* ==================== RIGHT PHONE: Suppliers View (Tilted back) ==================== */}
          <div className="relative w-[260px] h-[490px] rounded-[42px] bg-black border-[7px] border-slate-900 shadow-2xl overflow-hidden flex flex-col font-sans text-slate-800 rotate-[7deg] -translate-x-6 translate-y-6 z-0 opacity-95 shrink-0 hidden sm:flex hover:rotate-0 hover:scale-[1.04] transition-all duration-500">
            {/* Dynamic Island notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30"></div>
            {/* Status bar */}
            <div className="h-6.5 bg-[#c23b3b] text-white flex justify-between items-center px-6 text-[8px] font-bold z-20 pt-1 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1 text-[7px] opacity-90">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* App Top Header bar */}
            <div className="bg-[#c23b3b] text-white pt-1.5 pb-2 px-4 rounded-b-2xl space-y-1.5 shrink-0 z-10 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-[10px] tracking-tight">Nahid Group ˅</span>
              </div>
              <div className="flex justify-around text-[8.5px] font-bold pt-1.5 border-t border-white/10">
                <span className="opacity-75 cursor-pointer">Customers</span>
                <span className="border-b-2 border-white pb-0.5 px-3 cursor-pointer">Suppliers</span>
              </div>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative pb-10">
              
              {/* Total Purchase Card */}
              <div className="m-2.5 bg-white rounded-xl shadow-sm border border-slate-100 p-2.5 shrink-0 flex items-center justify-between">
                <div>
                  <span className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider block">Total purchase</span>
                  <span className="text-sm font-black text-slate-900 block mt-0.5">₹ 25000</span>
                </div>
                <div className="px-2.5 py-1 bg-rose-50 border border-rose-100 rounded-lg text-right">
                  <span className="text-[7.5px] text-rose-500 font-bold uppercase block tracking-wider">You'll Give</span>
                  <span className="text-[8.5px] font-black text-rose-600 block mt-0.5">₹ 25000</span>
                </div>
              </div>

              {/* Search suppliers box */}
              <div className="mx-2.5 my-1 px-3 py-1 bg-white border border-slate-200/80 rounded-lg flex items-center gap-2 shrink-0">
                <span className="text-[9px] text-slate-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search Customer"
                  className="bg-transparent text-[8.5px] outline-none text-slate-700 w-full font-semibold"
                  disabled
                />
              </div>

              {/* Roster ledger list */}
              <div className="flex-1 overflow-y-auto px-2.5 pb-2 space-y-1.5">
                
                {/* Supplier item 1 */}
                <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#fce7f3] text-pink-700 flex items-center justify-center font-bold text-[9px] uppercase">UM</div>
                    <div>
                      <h4 className="font-extrabold text-[9px] text-slate-800">Uma Mathur</h4>
                      <p className="text-[7px] text-slate-400 font-medium">Months ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-extrabold text-rose-500 block">₹ 8700</span>
                    <span className="text-[6.5px] text-slate-405 font-bold uppercase block">You will give</span>
                  </div>
                </div>

                {/* Supplier item 2 */}
                <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[9px] text-slate-600 uppercase">NG</div>
                    <div>
                      <h4 className="font-extrabold text-[9px] text-slate-800">Nilima Ghose</h4>
                      <p className="text-[7px] text-slate-400 font-medium">Months ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-extrabold text-rose-500 block">₹ 350</span>
                    <span className="text-[6.5px] text-slate-405 font-bold uppercase block">You will give</span>
                  </div>
                </div>

                {/* Supplier item 3 */}
                <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-150 flex items-center justify-center font-bold text-[9px] text-slate-600 uppercase">ED</div>
                    <div>
                      <h4 className="font-extrabold text-[9px] text-slate-800">Ehsaan Davi</h4>
                      <p className="text-[7px] text-slate-400 font-medium">Weeks ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-extrabold text-emerald-600 block">₹ 800</span>
                    <span className="text-[6.5px] text-slate-405 font-bold uppercase block">Advance</span>
                  </div>
                </div>

                {/* Supplier item 4 */}
                <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[9px] text-slate-655 uppercase">ST</div>
                    <div>
                      <h4 className="font-extrabold text-[9px] text-slate-800">Shivani Tara</h4>
                      <p className="text-[7px] text-slate-400 font-medium">Days ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-extrabold text-emerald-600 block">₹ 5500</span>
                    <span className="text-[6.5px] text-slate-405 font-bold uppercase block">Advance</span>
                  </div>
                </div>

              </div>

              {/* Floating button */}
              <div className="absolute bottom-11 left-1/2 -translate-x-1/2 px-3.5 py-1.5 bg-[#c23b3b] hover:bg-[#a62c2c] transition-colors rounded-full text-white text-[8px] font-extrabold shadow-md flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider">
                <span>➕</span>
                <span>Add Supplier</span>
              </div>
            </div>

            {/* Bottom navigations */}
            <div className="h-9.5 border-t bg-white flex justify-around items-center text-[7.5px] text-slate-400 font-bold shrink-0">
              <span className="cursor-pointer">🏠 Home</span>
              <span className="cursor-pointer">🪙 Money</span>
              <span className="cursor-pointer">⬜ More</span>
            </div>
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
            <div className="p-8 bg-white dark:bg-dark-900 rounded-[24px] border border-slate-100/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 text-emerald-700 flex items-center justify-center shadow-inner"><BookOpen className="w-6 h-6" /></div>
              <h3 className="font-extrabold text-slate-800 dark:text-dark-100 text-lg">Digital Khata</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Add transactions with 1-click. Maintain date-wise logs, ledger attachments, and invoices.</p>
            </div>
            
            <div className="p-8 bg-white dark:bg-dark-900 rounded-[24px] border border-slate-100/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 text-emerald-700 flex items-center justify-center shadow-inner"><MessageSquare className="w-6 h-6" /></div>
              <h3 className="font-extrabold text-slate-800 dark:text-dark-100 text-lg">WhatsApp Alerts</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Send pre-formatted payment alerts to customers. Speed up collections by up to 3x.</p>
            </div>

            <div className="p-8 bg-white dark:bg-dark-900 rounded-[24px] border border-slate-100/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 text-emerald-700 flex items-center justify-center shadow-inner"><RefreshCw className="w-6 h-6" /></div>
              <h3 className="font-extrabold text-slate-800 dark:text-dark-100 text-lg">Auto Cloud Sync</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Runs offline natively. Once connection is restored, transactions sync instantly to the cloud.</p>
            </div>

            <div className="p-8 bg-white dark:bg-dark-900 rounded-[24px] border border-slate-100/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 text-emerald-700 flex items-center justify-center shadow-inner"><ShieldCheck className="w-6 h-6" /></div>
              <h3 className="font-extrabold text-slate-800 dark:text-dark-100 text-lg">100% Secure</h3>
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
          <div className="p-10 bg-white dark:bg-dark-900 border border-slate-150/80 rounded-[32px] space-y-6 flex flex-col hover:shadow-lg transition-shadow duration-350">
            <div className="space-y-2">
              <h3 className="font-extrabold text-2xl text-slate-800 dark:text-dark-100">Basic Free</h3>
              <p className="text-xs text-slate-400 font-semibold uppercase">Perfect for small merchants getting started.</p>
              <div className="pt-4"><span className="text-5xl font-black text-slate-900 dark:text-dark-50">₹0</span><span className="text-sm text-slate-400 font-semibold"> / forever</span></div>
            </div>
            
            <ul className="space-y-4 text-sm text-slate-600 dark:text-dark-350 flex-1">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Unlimited Customers</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Cloud Sync & Offline Mode</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> WhatsApp Sharing Reminders</li>
              <li className="flex items-center gap-3 text-slate-300 dark:text-dark-750"><Check className="w-5 h-5 text-slate-200 dark:text-dark-800 shrink-0" /> GST Invoicing (PDF Download)</li>
            </ul>

            <Link to="/login" className="w-full btn-secondary text-center py-3.5 hover:bg-slate-200">Start Free</Link>
          </div>

          {/* Premium Card */}
          <div className="p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-[32px] space-y-6 flex flex-col relative overflow-hidden shadow-2xl shadow-emerald-500/5 border border-emerald-500/30 group">
            {/* Glowing neon background badge */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-350"></div>
            
            <div className="absolute top-6 right-6 bg-emerald-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">Most Popular</div>
            
            <div className="space-y-2">
              <h3 className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Premium Pro</h3>
              <p className="text-xs text-slate-450 font-semibold uppercase">For stores requiring GST Billing & automated reminders.</p>
              <div className="pt-4"><span className="text-5xl font-black">₹499</span><span className="text-sm text-slate-400 font-semibold"> / month</span></div>
            </div>
            
            <ul className="space-y-4 text-sm text-slate-300 flex-1">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0" /> Everything in Free</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0" /> GST Invoice Builder (Print & PDF)</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0" /> Expense Tracker & Recharts Analytics</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0" /> Premium Dashboard & Priority SMS Alerting</li>
            </ul>

            <Link to="/login" className="w-full btn-primary border-none shadow-lg shadow-emerald-500/20 text-center py-3.5 hover:scale-[1.02] active:scale-95 transition-all">Get Premium Pro</Link>
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
