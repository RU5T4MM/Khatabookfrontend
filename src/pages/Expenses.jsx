import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Receipt,
  Plus,
  Trash2,
  Calendar,
  Filter,
  PieChart as PieIcon,
  IndianRupee,
  Lock,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444'];

const Expenses = () => {
  const { user, fetchWithAuth, t, addNotification } = useApp();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [showAddModal, setShowAddModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Rent');
  const [description, setDescription] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');
  const [date, setDate] = useState('');

  // Filters
  const [filterCategory, setFilterCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const loadExpenseData = async () => {
    if (user?.subscription?.plan !== 'premium') {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      // Fetch list
      let queryParams = '';
      if (startDate) queryParams += `&startDate=${startDate}`;
      if (endDate) queryParams += `&endDate=${endDate}`;
      if (filterCategory) queryParams += `&category=${filterCategory}`;

      const listRes = await fetchWithAuth(`/api/expenses?${queryParams}`);
      if (listRes.ok) {
        const list = await listRes.json();
        setExpenses(list);
      }

      // Fetch grouped stats
      const statsRes = await fetchWithAuth('/api/expenses/summary');
      if (statsRes.ok) {
        const stats = await statsRes.json();
        const formatted = stats.map(item => ({
          name: item.category,
          value: item.totalAmount
        }));
        setSummaryData(formatted);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenseData();
  }, [filterCategory, startDate, endDate, user]);

  // Block page if Free tier
  if (user?.subscription?.plan !== 'premium') {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 dark:text-dark-50">Expense Analysis is Premium</h2>
          <p className="text-sm text-slate-500 dark:text-dark-400">
            Track business operating costs, organize overheads by category, and access visual graphs by upgrading to Premium Pro.
          </p>
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="btn-primary mx-auto flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          View Subscription Plans
        </button>
      </div>
    );
  }

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      addNotification('Please enter a valid amount', 'warning');
      return;
    }

    try {
      const res = await fetchWithAuth('/api/expenses', {
        method: 'POST',
        body: JSON.stringify({ amount, category, description, paymentMode, date })
      });

      if (res.ok) {
        addNotification('Expense logged successfully!', 'success');
        
        // Reset
        setAmount('');
        setDescription('');
        setCategory('Rent');
        setPaymentMode('cash');
        setDate('');
        setShowAddModal(false);

        loadExpenseData();
      }
    } catch (err) {
      addNotification(err.message, 'error');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Delete this expense log?')) return;
    try {
      const res = await fetchWithAuth(`/api/expenses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addNotification('Expense log removed', 'success');
        loadExpenseData();
      }
    } catch (err) {
      addNotification(err.message, 'error');
    }
  };

  const totalOverhead = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-dark-50">{t.expenses}</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase">Log operations and rent overheads</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary py-2 px-4 text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
          {t.addExpense}
        </button>
      </div>

      {/* Grid: Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Filter form + lists */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Filters card */}
          <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input-field text-xs py-1.5 px-3 w-32 border border-slate-100"
              >
                <option value="">All Categories</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Inventory">Inventory</option>
                <option value="Utilities">Utilities</option>
                <option value="Others">Others</option>
              </select>

              <div className="flex items-center gap-2 text-xs">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field py-1 px-2 border border-slate-100 w-32 text-slate-500"
                  placeholder="Start"
                />
                <span className="text-slate-400 font-bold">to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-field py-1 px-2 border border-slate-100 w-32 text-slate-500"
                  placeholder="End"
                />
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 block uppercase">Total Overhead</span>
              <strong className="text-slate-800 dark:text-dark-50 text-sm">₹{totalOverhead.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Expense Logs table */}
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-slate-50/50 dark:bg-dark-850/20 text-left text-xs font-black text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Date</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4 text-right">Amount</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-dark-850 text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      </td>
                    </tr>
                  ) : expenses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400 font-semibold uppercase">
                        No expense logs recorded
                      </td>
                    </tr>
                  ) : (
                    expenses.map(exp => (
                      <tr key={exp._id} className="text-slate-700 dark:text-dark-200">
                        <td className="p-4 font-medium">{new Date(exp.date).toLocaleDateString()}</td>
                        <td className="p-4 font-bold text-slate-800 dark:text-dark-100">{exp.category}</td>
                        <td className="p-4 font-medium max-w-[150px] truncate">{exp.description || 'N/A'}</td>
                        <td className="p-4 font-bold uppercase">{exp.paymentMode}</td>
                        <td className="p-4 text-right font-black text-rose-500">₹{exp.amount.toLocaleString('en-IN')}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteExpense(exp._id)}
                            className="p-1 text-slate-350 hover:text-rose-500 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Side: Charts distributions */}
        <div className="glass-card p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-dark-50 text-base">Expense Structure</h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Grouped Overhead ratios</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center text-xs mt-4">
            {summaryData.length === 0 ? (
              <span className="text-xs text-slate-400 font-bold uppercase">No data to display</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summaryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {summaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* ==================== MODAL: ADD EXPENSE ==================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-dark-900 border border-slate-100 dark:border-dark-800 rounded-3xl p-6 max-w-sm w-full space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-800 dark:text-dark-50 text-base">{t.addExpense}</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <Trash2 className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.amount} (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field text-lg font-black text-slate-900 dark:text-dark-50"
                  placeholder="0.00"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.category}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="Rent">Rent</option>
                  <option value="Salary">Salary</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.paymentMode}</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="input-field text-sm font-semibold"
                >
                  <option value="cash">Cash Payment</option>
                  <option value="online">UPI / Net Banking</option>
                  <option value="card">Debit/Credit Card</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Expense Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field text-sm text-slate-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.description}</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field text-sm"
                  placeholder="E.g., Office water cans, staff tea..."
                />
              </div>

              <button type="submit" className="w-full btn-primary py-2.5">
                Log Expense Log
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Expenses;
