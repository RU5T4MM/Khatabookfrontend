import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useSync } from '../context/SyncContext';
import {
  Users,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  FileImage,
  Trash2,
  Send,
  MessageCircle,
  X,
  UserPlus
} from 'lucide-react';

const CustomerLedger = () => {
  const { fetchWithAuth, t, addNotification, customers, setCustomers, language } = useApp();
  const { isOnline, saveTransaction, getCachedCustomers, cacheCustomersOffline } = useSync();

  const [loading, setLoading] = useState(true);
  const [selectedCust, setSelectedCust] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals Toggles
  const [showAddCust, setShowAddCust] = useState(false);
  const [showAddTx, setShowAddTx] = useState(false);
  const [txType, setTxType] = useState('give'); // 'give' | 'got'
  const [previewBillUrl, setPreviewBillUrl] = useState('');

  // Form Fields
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');

  const [txAmount, setTxAmount] = useState('');
  const [txDesc, setTxDesc] = useState('');
  const [txDate, setTxDate] = useState('');
  const [txFile, setTxFile] = useState(null);

  const fileInputRef = useRef(null);

  // Fetch customer records
  const loadCustomers = async () => {
    try {
      if (isOnline) {
        const res = await fetchWithAuth('/api/customers');
        if (res.ok) {
          const list = await res.json();
          setCustomers(list);
          cacheCustomersOffline(list);
        }
      } else {
        const cached = await getCachedCustomers();
        setCustomers(cached);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [isOnline]);

  // Load Transactions when customer selection changes
  useEffect(() => {
    const loadTxHistory = async () => {
      if (!selectedCust) return;
      try {
        if (isOnline) {
          const res = await fetchWithAuth(`/api/ledger/customer/${selectedCust._id}`);
          if (res.ok) {
            const data = await res.json();
            setTransactions(data);
          }
        } else {
          // Mock offline transaction view (could read from indexedDB if cached)
          setTransactions([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadTxHistory();
  }, [selectedCust, isOnline]);

  // Add customer handler
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!custName || !custPhone) return;

    try {
      const res = await fetchWithAuth('/api/customers', {
        method: 'POST',
        body: JSON.stringify({ name: custName, phone: custPhone, email: custEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add customer');

      setCustomers(prev => [data, ...prev].sort((a, b) => a.name.localeCompare(b.name)));
      addNotification('Customer added successfully!', 'success');
      
      // Reset forms
      setCustName('');
      setCustPhone('');
      setCustEmail('');
      setShowAddCust(false);
      setSelectedCust(data);
    } catch (err) {
      addNotification(err.message, 'error');
    }
  };

  // Add Transaction Entry (Give / Got)
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!txAmount || isNaN(txAmount)) {
      addNotification('Please enter a valid amount', 'warning');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('customerId', selectedCust._id);
      formData.append('type', txType);
      formData.append('amount', txAmount);
      formData.append('description', txDesc);
      if (txDate) formData.append('date', txDate);
      if (txFile) formData.append('billImage', txFile);

      const result = await saveTransaction(formData, selectedCust._id, selectedCust.phone, selectedCust.name);

      // Update customer balance on local view
      setSelectedCust(prev => ({
        ...prev,
        totalBalance: result.customerBalance
      }));

      // Update customer list balances
      setCustomers(prev => prev.map(c => c._id === selectedCust._id ? { ...c, totalBalance: result.customerBalance } : c));

      // Append transaction list (if online)
      if (!result.offline) {
        setTransactions(prev => [result.transaction, ...prev]);
        addNotification('Transaction recorded successfully!', 'success');
      }

      // Reset fields
      setTxAmount('');
      setTxDesc('');
      setTxDate('');
      setTxFile(null);
      setShowAddTx(false);
    } catch (err) {
      addNotification(err.message, 'error');
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (txId) => {
    if (!window.confirm('Are you sure you want to delete this ledger entry?')) return;
    try {
      const res = await fetchWithAuth(`/api/ledger/${txId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete transaction');

      // Filter local lists
      setTransactions(prev => prev.filter(t => t._id !== txId));
      setSelectedCust(prev => ({ ...prev, totalBalance: data.customerBalance }));
      setCustomers(prev => prev.map(c => c._id === selectedCust._id ? { ...c, totalBalance: data.customerBalance } : c));
      addNotification('Ledger entry deleted, balance updated.', 'success');
    } catch (err) {
      addNotification(err.message, 'error');
    }
  };

  // Generate WhatsApp Reminder Link
  const getWhatsAppReminderUrl = (customer) => {
    if (!customer) return '';
    const balance = customer.totalBalance;
    if (balance <= 0) return '#';
    
    const message = `Hello ${customer.name}, this is a friendly reminder that you have a pending balance of ₹${balance.toLocaleString('en-IN')} with our business. Please settle it soon. Thank you!`;
    return `https://wa.me/91${customer.phone}?text=${encodeURIComponent(message)}`;
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="h-[80vh] flex gap-6 animate-fade-in relative">
      
      {/* ==================== LEFT Roster PANE: Customers list ==================== */}
      <div className={`w-full lg:w-80 flex flex-col bg-white border border-slate-100 dark:bg-dark-900 dark:border-dark-800 rounded-3xl overflow-hidden ${
        selectedCust ? 'hidden lg:flex' : 'flex'
      }`}>
        {/* Search header */}
        <div className="p-4 border-b border-slate-50 dark:border-dark-850 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 py-2 text-xs"
              placeholder={t.searchCustomer}
            />
          </div>
          <button
            onClick={() => setShowAddCust(true)}
            className="w-full btn-primary py-2 text-xs font-bold"
          >
            <UserPlus className="w-4 h-4" />
            {t.addCustomer}
          </button>
        </div>

        {/* Customer item lists */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-dark-850">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400 font-semibold uppercase">No customers found</div>
          ) : (
            filteredCustomers.map(c => {
              const owesMoney = c.totalBalance > 0;
              return (
                <button
                  key={c._id}
                  onClick={() => setSelectedCust(c)}
                  className={`w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-dark-850 transition-colors ${
                    selectedCust?._id === c._id ? 'bg-slate-50 dark:bg-dark-850/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl premium-gradient text-white flex items-center justify-center font-bold text-sm">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-dark-100 text-sm">{c.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{c.phone}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-black block ${
                      c.totalBalance === 0 ? 'text-slate-400' : owesMoney ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-500'
                    }`}>
                      ₹{Math.abs(c.totalBalance).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium block">
                      {c.totalBalance === 0 ? 'Settle' : owesMoney ? 'Get' : 'Give'}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ==================== RIGHT DETAIL PANE: Selected Ledger ==================== */}
      <div className={`flex-1 flex flex-col bg-white border border-slate-100 dark:bg-dark-900 dark:border-dark-800 rounded-3xl overflow-hidden ${
        selectedCust ? 'flex' : 'hidden lg:flex items-center justify-center bg-slate-50/30'
      }`}>
        {selectedCust ? (
          <>
            {/* Ledger Header */}
            <div className="p-6 border-b border-slate-50 dark:border-dark-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 dark:bg-dark-850/20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCust(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 lg:hidden text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  {selectedCust.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 dark:text-dark-50 text-base">{selectedCust.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{selectedCust.phone} • {selectedCust.email || 'No email'}</p>
                </div>
              </div>

              {/* Balances and WhatsApp Reminders */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Outstanding Balance</span>
                  <span className={`text-lg font-black ${
                    selectedCust.totalBalance >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-500'
                  }`}>
                    ₹{selectedCust.totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {selectedCust.totalBalance > 0 && (
                  <a
                    href={getWhatsAppReminderUrl(selectedCust)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center p-3 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all dark:bg-emerald-950/30 dark:text-emerald-500"
                    title="Send WhatsApp Payment Reminder"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </a>
                )}
              </div>
            </div>

            {/* Transactions items list */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {transactions.length === 0 ? (
                <div className="text-center py-20 text-xs text-slate-400 font-semibold uppercase">No transaction logs listed</div>
              ) : (
                transactions.map(t => {
                  const isGive = t.type === 'give'; // gave debit, got credit
                  return (
                    <div
                      key={t._id}
                      className={`p-4 border rounded-2xl flex items-center justify-between transition-all ${
                        isGive
                          ? 'border-rose-100 bg-rose-500/[0.01] dark:border-rose-950/20'
                          : 'border-emerald-100 bg-emerald-500/[0.01] dark:border-emerald-950/20'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(t.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800 dark:text-dark-100">{t.description || 'Ledger Entry'}</p>
                        
                        {/* Bill Thumbnail link */}
                        {t.billImage && (
                          <button
                            onClick={() => setPreviewBillUrl(t.billImage)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg border border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-dark-800 dark:bg-dark-850 dark:text-dark-350"
                          >
                            <FileImage className="w-3.5 h-3.5" />
                            View Receipt
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className={`text-base font-black block ${isGive ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
                            ₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-[9px] text-slate-400 font-semibold uppercase block">
                            {isGive ? 'You Gave' : 'You Got'}
                          </span>
                        </div>

                        {isOnline && (
                          <button
                            onClick={() => handleDeleteTransaction(t._id)}
                            className="p-2 text-slate-350 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all"
                            title="Delete Ledger Log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sticky red/green actions footer */}
            <div className="p-4 border-t border-slate-50 dark:border-dark-850 grid grid-cols-2 gap-4 bg-slate-50/30">
              <button
                onClick={() => {
                  setTxType('give');
                  setShowAddTx(true);
                }}
                className="py-3 px-5 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/10"
              >
                <ArrowDownLeft className="w-5 h-5" />
                YOU GAVE (DEBIT)
              </button>

              <button
                onClick={() => {
                  setTxType('got');
                  setShowAddTx(true);
                }}
                className="py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10"
              >
                <ArrowUpRight className="w-5 h-5" />
                YOU GOT (CREDIT)
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-2">
            <Users className="w-12 h-12 text-slate-300 dark:text-dark-700 mx-auto" />
            <h4 className="font-bold text-slate-500 text-sm">No Customer Selected</h4>
            <p className="text-xs text-slate-400">Select a merchant client on the left grid to check ledger logs.</p>
          </div>
        )}
      </div>

      {/* ==================== 1. MODAL: ADD CUSTOMER ==================== */}
      {showAddCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-dark-900 border border-slate-100 dark:border-dark-800 rounded-3xl p-6 max-w-sm w-full space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-800 dark:text-dark-50 text-base">{t.addCustomer}</h3>
              <button onClick={() => setShowAddCust(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.customerName}</label>
                <input
                  type="text"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="input-field text-sm"
                  placeholder="Ramesh Verma"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.phoneNumber}</label>
                <input
                  type="tel"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  className="input-field text-sm"
                  placeholder="9876543210"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.emailAddress}</label>
                <input
                  type="email"
                  value={custEmail}
                  onChange={(e) => setCustEmail(e.target.value)}
                  className="input-field text-sm"
                  placeholder="customer@email.com"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Add to ledger
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== 2. MODAL: ADD TRANSACTION ==================== */}
      {showAddTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-dark-900 border border-slate-100 dark:border-dark-800 rounded-3xl p-6 max-w-sm w-full space-y-4 animate-scale-in">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-800 dark:text-dark-50 text-base">
                {txType === 'give' ? 'Record Debited Udhaar' : 'Record Received Payment'}
              </h3>
              <button onClick={() => setShowAddTx(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.amount} (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  className="input-field text-lg font-black text-slate-900 dark:text-dark-50"
                  placeholder="0.00"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">{t.description}</label>
                <input
                  type="text"
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  className="input-field text-sm"
                  placeholder="E.g., 2kg Sugar box, cash payment..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Transaction Date</label>
                <input
                  type="date"
                  value={txDate}
                  onChange={(e) => setTxDate(e.target.value)}
                  className="input-field text-sm text-slate-500"
                />
              </div>

              {/* Bill Attachment field */}
              {txType === 'give' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">{t.attachBill}</label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => setTxFile(e.target.files[0])}
                      className="hidden"
                      accept="image/*,application/pdf"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      {txFile ? txFile.name.substring(0, 15) : 'Select File'}
                    </button>
                    {txFile && (
                      <button
                        type="button"
                        onClick={() => setTxFile(null)}
                        className="p-2 border rounded-xl hover:text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-2.5 rounded-xl font-bold text-white shadow-lg ${
                  txType === 'give' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/10' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10'
                }`}
              >
                Log to Ledger
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== 3. MODAL: RECEIPT IMAGE PREVIEW ==================== */}
      {previewBillUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setPreviewBillUrl('')}
        >
          <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <img src={previewBillUrl} alt="Bill receipt scan" className="w-full h-auto max-h-[80vh] object-contain" />
            <button
              onClick={() => setPreviewBillUrl('')}
              className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerLedger;
