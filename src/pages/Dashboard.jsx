import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSync } from '../context/SyncContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  IndianRupee,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  Plus,
  Receipt,
  FileText,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const Dashboard = () => {
  const { fetchWithAuth, t, language, addNotification, user } = useApp();
  const { isOnline, getCachedCustomers, cacheCustomersOffline } = useSync();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    youWillGet: 0,
    youWillGive: 0,
    netBalance: 0,
    totalCustomers: 0
  });
  const [recentTx, setRecentTx] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);

  // Fetch dashboard summary
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        if (isOnline) {
          const res = await fetchWithAuth('/api/dashboard/summary');
          if (res.ok) {
            const data = await res.json();
            setStats({
              youWillGet: data.totalCredit,
              youWillGive: data.totalDebit,
              netBalance: data.netBalance,
              totalCustomers: data.totalCustomers
            });
            setRecentTx(data.recentTransactions || []);
            setRecentCustomers(data.recentCustomers || []);
            setChartData(data.chartData || []);
            
            // Cache locally
            localStorage.setItem('kb_dashboard_cache', JSON.stringify(data));
          }
        } else {
          // Read cached
          const cached = localStorage.getItem('kb_dashboard_cache');
          if (cached) {
            const data = JSON.parse(cached);
            setStats({
              youWillGet: data.totalCredit,
              youWillGive: data.totalDebit,
              netBalance: data.netBalance,
              totalCustomers: data.totalCustomers
            });
            setRecentTx(data.recentTransactions || []);
            setRecentCustomers(data.recentCustomers || []);
            setChartData(data.chartData || []);
          }
        }
      } catch (err) {
        console.error('Dashboard loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [isOnline]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-dark-50">{t.dashboard}</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            {user?.businessName} • Welcome back, {user?.ownerName}
          </p>
        </div>

        {/* Action Button Links */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/customers')}
            className="btn-primary py-2 px-4 text-xs font-bold"
          >
            <Plus className="w-4 h-4" />
            {t.addCustomer}
          </button>
          <button
            onClick={() => navigate('/invoices')}
            className="btn-secondary py-2 px-4 text-xs font-bold"
          >
            <FileText className="w-4 h-4 text-slate-500 dark:text-dark-400" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Grid Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Customers Card */}
        <div className="glass-card p-6 bg-slate-50/40 dark:bg-dark-900/40 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Customers</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-slate-800 dark:text-dark-50">
              {stats.totalCustomers || 0}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Registered business clients</p>
          </div>
        </div>

        {/* Net Balance Card */}
        <div className="glass-card p-6 bg-gradient-to-br from-white to-slate-50/50 dark:from-dark-900 dark:to-dark-900/40 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.totalBalance}</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-500">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className={`text-3xl font-black ${
              stats.netBalance >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-500'
            }`}>
              ₹{stats.netBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Net outstanding ledger balance</p>
          </div>
        </div>

        {/* You Will Get Card */}
        <div className="glass-card p-6 border-emerald-100 bg-emerald-500/[0.02] dark:border-emerald-950/30 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">{t.youWillGet}</span>
            <div className="p-2 rounded-xl bg-emerald-100/50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-500">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-500">
              ₹{stats.youWillGet.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Credited Udhaar amount to collect</p>
          </div>
        </div>

        {/* You Will Give Card */}
        <div className="glass-card p-6 border-rose-100 bg-rose-500/[0.02] dark:border-rose-950/30 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-rose-600 dark:text-rose-500 uppercase tracking-widest">{t.youWillGive}</span>
            <div className="p-2 rounded-xl bg-rose-100/50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-500">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-rose-500 dark:text-rose-450">
              ₹{stats.youWillGive.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Customer advances / Debit to payback</p>
          </div>
        </div>

      </div>

      {/* Main Charts & Shortcut grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Cash Flow Chart Card */}
        <div className="glass-card p-6 lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-dark-50 text-base">Weekly Cash Analytics</h3>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Cash In vs Cash Out trends</p>
            </div>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-dark-800" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="CashIn" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIn)" />
                <Area type="monotone" dataKey="CashOut" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOut)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shortcuts / Quick Actions List */}
        <div className="glass-card p-6 space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-dark-50 text-base">Business Shortcuts</h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Manage other records</p>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <Link
              to="/expenses"
              className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all dark:border-dark-850 dark:hover:bg-dark-850"
            >
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-xl">
                <Receipt className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-800 dark:text-dark-100 text-sm">Expenses Management</h4>
                <p className="text-[10px] text-slate-400">Track operations and rent payments</p>
              </div>
            </Link>

            <Link
              to="/invoices"
              className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all dark:border-dark-850 dark:hover:bg-dark-850"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-500 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-800 dark:text-dark-100 text-sm">GST Billing System</h4>
                <p className="text-[10px] text-slate-400">Generate, Print, and share invoices</p>
              </div>
            </Link>

            <Link
              to="/reports"
              className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all dark:border-dark-850 dark:hover:bg-dark-850"
            >
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-800 dark:text-dark-100 text-sm">Business Statements</h4>
                <p className="text-[10px] text-slate-400">Export PDF/Excel ledger reports</p>
              </div>
            </Link>
          </div>
        </div>

      </div>

      {/* SECTION 2: Recent Transactions Activity & Recent Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions Table */}
        <div className="glass-card p-6 lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-dark-50 text-base">Recent Ledger Activity</h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Latest recorded client entries</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-dark-850 bg-slate-50/30 dark:bg-dark-850/10 text-slate-400 font-black uppercase tracking-wider">
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-dark-850">
                {recentTx.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-slate-400 font-semibold uppercase">No recent entries</td>
                  </tr>
                ) : (
                  recentTx.map(tx => {
                    const isGive = tx.type === 'give';
                    return (
                      <tr key={tx._id} className="text-slate-700 dark:text-dark-200">
                        <td className="p-3 font-medium">{new Date(tx.date).toLocaleDateString()}</td>
                        <td className="p-3 font-bold text-slate-800 dark:text-dark-50">{tx.customerId?.name || 'Deleted Client'}</td>
                        <td className="p-3 italic text-slate-400">{tx.description || 'Ledger Log'}</td>
                        <td className={`p-3 text-right font-black ${isGive ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
                          {isGive ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Customers List */}
        <div className="glass-card p-6 space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-dark-50 text-base">Newly Added Clients</h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Latest customers in directory</p>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-dark-850 max-h-[260px] overflow-y-auto">
            {recentCustomers.length === 0 ? (
              <div className="text-center py-6 text-slate-400 font-semibold uppercase text-xs">No customer registers</div>
            ) : (
              recentCustomers.map(cust => {
                const bal = cust.totalBalance;
                return (
                  <Link
                    key={cust._id}
                    to="/customers"
                    className="flex items-center justify-between py-2.5 hover:bg-slate-50/50 dark:hover:bg-dark-850/30 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-500 flex items-center justify-center font-bold text-xs">
                        {cust.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-dark-50 text-xs">{cust.name}</h4>
                        <p className="text-[9px] text-slate-450 dark:text-dark-400 font-semibold">{cust.phone}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-black ${bal === 0 ? 'text-slate-400' : bal > 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-500'}`}>
                      ₹{Math.abs(bal).toLocaleString('en-IN')}
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
