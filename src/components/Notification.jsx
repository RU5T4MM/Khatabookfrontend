import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const Notification = () => {
  const { notifications } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        let bgClass = 'bg-white border-slate-200 dark:bg-dark-900 dark:border-dark-800';
        let icon = <Info className="w-5 h-5 text-blue-500" />;

        if (n.type === 'success') {
          bgClass = 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30';
          icon = <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />;
        } else if (n.type === 'warning') {
          bgClass = 'bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30';
          icon = <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500" />;
        } else if (n.type === 'error') {
          bgClass = 'bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30';
          icon = <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-500" />;
        }

        return (
          <div
            key={n.id}
            className={`flex items-center gap-3 p-4 rounded-2xl border shadow-lg ${bgClass} animate-fade-in pointer-events-auto`}
          >
            {icon}
            <span className="text-sm font-medium text-slate-700 dark:text-dark-200 flex-1">
              {n.message}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
