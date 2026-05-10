"use client";

import React, { useEffect, useState } from 'react';
import {
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  LayoutDashboard,
  Clock,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Brain,
  Play,
  Square
} from 'lucide-react';

interface StrategyInstance {
  id: string;
  name: string;
  amountUSD: number;
  apy: number;
  status: 'running' | 'monitoring' | 'paused';
  lastAction: string;
  lastActionTime: string;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  strategyName: string;
  action: 'ZAP_IN' | 'ZAP_OUT' | 'MONITORING' | 'ALERT';
  message: string;
  status: 'success' | 'pending' | 'info';
}

interface AIAgentStatus {
  isRunning: boolean;
  uptime: string;
  lastCheck: string;
}

function StatCard({ title, value, change, icon, trend }: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral'
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm group transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          trend === 'up' ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' :
          trend === 'down' ? 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400' :
          'text-slate-500 bg-slate-100 dark:bg-slate-800'
        }`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</p>
        <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [agentStatus, setAgentStatus] = useState<AIAgentStatus | null>(null);
  const [activeStrategies, setActiveStrategies] = useState<StrategyInstance[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load AI Agent status and strategies
  useEffect(() => {
    loadAgentStatus();
    loadStrategies();
    
    // Set up real-time polling
    const statusInterval = setInterval(loadAgentStatus, 5000);
    const strategiesInterval = setInterval(loadStrategies, 10000);
    
    return () => {
      clearInterval(statusInterval);
      clearInterval(strategiesInterval);
    };
  }, []);

  async function loadAgentStatus() {
    try {
      const response = await fetch('http://localhost:4002/api/ai-agent/status');
      const data = await response.json();
      setAgentStatus(data.data);
    } catch (error) {
      console.error('Failed to load agent status:', error);
    }
  }

  async function loadStrategies() {
    try {
      const response = await fetch('http://localhost:4002/api/strategies');
      const data = await response.json();
      
      const strategies: StrategyInstance[] = data.data.map((s: any) => ({
        id: s.id,
        name: s.name,
        amountUSD: Math.floor(Math.random() * 20000) + 5000,
        apy: s.performance.totalProfitPercent * 10 + Math.random() * 20,
        status: s.isActive ? 'running' : 'paused',
        lastAction: 'Monitoring',
        lastActionTime: 'Just now',
      }));
      
      setActiveStrategies(strategies);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load strategies:', error);
      setIsLoading(false);
    }
  }

  async function startAgent() {
    try {
      await fetch('http://localhost:4002/api/ai-agent/start', { method: 'POST' });
      await loadAgentStatus();
    } catch (error) {
      console.error('Failed to start agent:', error);
    }
  }

  async function stopAgent() {
    try {
      await fetch('http://localhost:4002/api/ai-agent/stop', { method: 'POST' });
      await loadAgentStatus();
    } catch (error) {
      console.error('Failed to stop agent:', error);
    }
  }

  // Simulate real-time AI activity feed
  useEffect(() => {
    const interval = setInterval(() => {
      const events = [
        {
          name: 'Aggressive Volatility Hunter',
          action: 'ZAP_IN',
          msg: 'Volume Spike Detected (+25%). Executing Zap In for 2,000 USDC.',
          status: 'success' as const
        },
        {
          name: 'Solana Stable Growth',
          action: 'MONITORING',
          msg: 'Re-validating pool health metrics...',
          status: 'info' as const
        },
        {
          name: 'Delta Neutral Guard',
          action: 'ALERT',
          msg: 'Volatility threshold reached. Considering Zap Out to protect capital.',
          status: 'pending' as const
        },
      ];

      const randomEvent = events[Math.floor(Math.random() * events.length)];

      const newLog: ActivityLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        strategyName: randomEvent.name,
        action: randomEvent.action as any,
        message: randomEvent.msg,
        status: randomEvent.status,
      };

      setLogs(prev => [newLog, ...prev.slice(0, 19)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-400 mt-4">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Top Navigation/Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-600 rounded-lg text-white">
                <Brain className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Investor <span className="text-blue-600">Hub</span>
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Monitor your AI Agents and portfolio performance in real-time.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400">
              <div className={`w-2 h-2 rounded-full ${agentStatus?.isRunning ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              AI Agent {agentStatus?.isRunning ? 'Running' : 'Stopped'}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={startAgent}
                disabled={agentStatus?.isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Start
              </button>
              <button
                onClick={stopAgent}
                disabled={!agentStatus?.isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <Square className="w-4 h-4" />
                Stop
              </button>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 text-white font-bold cursor-pointer hover:opacity-90 transition-opacity">
              <Wallet className="w-4 h-4" />
              <span>0x71C...4A21</span>
            </div>
          </div>
        </div>

        {/* Portfolio Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Value Locked"
            value="$17,500.00"
            change="+12.4%"
            icon={<CreditCard className="w-5 h-5" />}
            trend="up"
          />
          <StatCard
            title="Realized Profit"
            value="$2,140.50"
            change="+5.2%"
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
          />
          <StatCard
            title="Average APY"
            value="28.8%"
            change="+2.1%"
            icon={<Zap className="w-5 h-5" />}
            trend="up"
          />
          <StatCard
            title="Active Agents"
            value="2"
            change="Stable"
            icon={<Activity className="w-5 h-5" />}
            trend="neutral"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Active Strategies */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Deployed Strategies</h2>
                <button className="text-sm text-blue-600 font-semibold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
                      <th className="px-6 py-4">Strategy</th>
                      <th className="px-6 py-4">Allocated</th>
                      <th className="px-6 py-4">APY</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {activeStrategies.map((strat) => (
                      <tr key={strat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                              <Zap className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">{strat.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">
                          ${strat.amountUSD.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-green-600 dark:text-green-400 font-bold">+{strat.apy}%</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              strat.status === 'running' ? 'bg-green-500' :
                              strat.status === 'monitoring' ? 'bg-yellow-500' : 'bg-slate-400'
                            }`} />
                            <span className="text-sm capitalize text-slate-600 dark:text-slate-400">{strat.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-900 dark:text-white">{strat.lastAction}</span>
                            <span className="text-xs text-slate-400">{strat.lastActionTime}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Activity Feed */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col h-full max-h-[600px]">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Activity</h2>
                </div>
                <div className="relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                </div>
              </div>

              <div className="overflow-y-auto p-6 space-y-6 flex-1 custom-scrollbar">
                {logs.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No Activity Yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 italic">
                      {agentStatus?.isRunning 
                        ? 'AI Agent is running 24/7 monitoring pool data via LP Agent API'
                        : 'Start AI Agent to begin monitoring strategies.'
                      }
                    </p>
                  </div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800 pb-6 last:pb-0 last:border-0">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                        log.status === 'success' ? 'bg-green-500' :
                        log.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {log.timestamp}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          log.action === 'ZAP_IN' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          log.action === 'ZAP_OUT' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {log.action}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                        {log.strategyName}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {log.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  AI Agents are running 24/7 monitoring pool data via LP Agent API
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
