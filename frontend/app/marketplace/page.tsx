"use client";

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import StrategyCard from '@/components/StrategyCard';
import { Search, Filter, TrendingUp, Wallet } from 'lucide-react';

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

export default function MarketplacePage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadStrategies();
  }, []);

  async function loadStrategies() {
    try {
      setLoading(true);
      const response = await api.strategies.list();
      setStrategies(response.data);
    } catch (error: any) {
      showNotification(`Failed to load strategies: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }

  function showNotification(message: string, type: 'success' | 'error') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }

  async function handleInvest(strategyId: string) {
    setIsInvesting(true);
    try {
      // In a real app, we would prompt the user to connect their wallet here.
      // For the hackathon demo, we use a mock address.
      const mockUserAddress = "Soli_Whale_0x123456789";

      const result = await api.execution.run(strategyId, mockUserAddress);

      if (result.status === 'executed') {
        showNotification('AI Agent deployed! Strategy is now executing Zaps.', 'success');
      } else {
        showNotification('Strategy conditions not yet met. AI Agent is monitoring...', 'success');
      }
    } catch (error: any) {
      showNotification(`Investment failed: ${error.message}`, 'error');
    } finally {
      setIsInvesting(false);
    }
  }

  const filteredStrategies = strategies.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-12">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 ${
          notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Lumina <span className="text-blue-600">Market</span>
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
              Don't just provide liquidity, trade the intelligence.
              Browse and invest in AI-driven LP strategies backed by on-chain Proof of Profit.
            </p>
          </div>

          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search strategies by name or logic..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Strategies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filteredStrategies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStrategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                onInvest={handleInvest}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-slate-100 dark:bg-slate-900 rounded-full mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No strategies found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search query or filter settings.</p>
          </div>
        )}

        {/* Loading Overlay for Investment */}
        {isInvesting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl text-center max-w-xs w-full mx-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Agent Deploying</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Connecting to Solana and initializing your strategy execution...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
