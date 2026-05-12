import React from 'react';
import { TrendingUp, AlertTriangle, Zap, ShieldCheck } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  pnl: number;
  maxDrawdown: number;
  totalValueLocked: number;
  isActive: boolean;
  performance: {
    totalProfitPercent: number;
    maxDrawdownPercent: number;
  };
}

interface RiskLevel {
  level: 'Low' | 'Medium' | 'High';
  color: string;
  description: string;
}

interface StrategyCardProps {
  strategy: Strategy;
  onInvest: (id: string) => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onInvest }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-500 bg-green-500/10';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'High': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {strategy.name}
          </h3>
          <div className={`inline-block px-2 py-1 rounded-md text-xs font-semibold mt-2 ${getRiskColor(strategy.riskLevel)}`}>
            {strategy.riskLevel} Risk
          </div>
        </div>
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <Zap className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 h-10">
        {strategy.description || "No description provided for this AI strategy."}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
            <TrendingUp className="w-3 h-3" />
            <span>Expected PnL</span>
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            +{strategy.performance.totalProfitPercent.toFixed(2)}%
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Max Drawdown</span>
          </div>
          <div className="text-lg font-bold text-red-500 dark:text-red-400">
            -{strategy.performance.maxDrawdownPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <ShieldCheck className="w-3 h-3" />
          <span>Verified by LP Agent</span>
        </div>
        <button
          onClick={() => onInvest(strategy.id)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all active:scale-95"
        >
          Invest
        </button>
      </div>
    </div>
  );
};

export default StrategyCard;
