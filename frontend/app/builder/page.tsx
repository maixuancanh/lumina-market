"use client";

import React, { useState } from 'react';
import { api } from '@/lib/api';
import {
  Wand2,
  Save,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
  Trash2,
  Cpu
} from 'lucide-react';

type RiskLevel = 'Low' | 'Medium' | 'High';

export default function BuilderPage() {
  // State for natural language input
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [logic, setLogic] = useState<any | null>(null);

  // State for strategy details
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    riskLevel: 'Medium' as RiskLevel,
    creatorAddress: 'Soli_Whale_0x123456789', // Mock address
  });

  const [isMinting, setIsMinting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function showNotification(message: string, type: 'success' | 'error') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  }

  async function handleAnalyze() {
    if (!prompt.trim()) {
      showNotification('Please enter a strategy description!', 'error');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await api.strategies.analyze(prompt);
      setLogic(response.data);
      showNotification('Strategy logic generated successfully!', 'success');
    } catch (error: any) {
      showNotification(`Analysis failed: ${error.message}`, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleMint() {
    if (!logic) {
      showNotification('Please analyze your strategy first!', 'error');
      return;
    }
    if (!formData.name.trim()) {
      showNotification('Please provide a strategy name!', 'error');
      return;
    }

    setIsMinting(true);
    try {
      const payload = {
        ...formData,
        logic: logic,
      };

      const response = await api.strategies.create(payload);
      showNotification(`Strategy "${response.data.name}" minted successfully!`, 'success');

      // Reset form after success
      setPrompt('');
      setLogic(null);
      setFormData({
        name: '',
        description: '',
        riskLevel: 'Medium',
        creatorAddress: 'Soli_Whale_0x123456789',
      });
    } catch (error: any) {
      showNotification(`Minting failed: ${error.message}`, 'error');
    } finally {
      setIsMinting(false);
    }
  }

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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Strategy <span className="text-blue-600">Builder</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Convert your trading intuition into a deployable AI Agent using natural language.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
            <Cpu className="w-3 h-3" />
            Powered by Ollama AI
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
                <Wand2 className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold">AI Prompt</h2>
              </div>

              <div className="space-y-4">
                <textarea
                  className="w-full h-40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Example: If volume of SOL-USDC increases by 20% in 1 hour and APY is above 10%, zap in 50% of capital. If price volatility exceeds 5% in 30m, zap out to preserve capital."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !prompt.trim()}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {isAnalyzing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      Analyze Strategy
                    </>
                  )}
                </button>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
                <Save className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold">Strategy Details</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Strategy Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Solana Delta Neutral"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                    placeholder="What does this strategy achieve?"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Level</label>
                  <div className="flex gap-2">
                    {(['Low', 'Medium', 'High'] as RiskLevel[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => setFormData({...formData, riskLevel: level})}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.riskLevel === level
                            ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: AI Logic Preview */}
          <div className="space-y-6">
            <div className={`h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all ${!logic ? 'opacity-60 grayscale' : 'opacity-100 grayscale-0'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold">Logic Blueprint</h2>
                </div>
                {logic && (
                  <button
                    onClick={() => setLogic(null)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Clear Logic"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {!logic ? (
                <div className="flex flex-col items-center justify-center h-[500px] text-center p-8">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <Info className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Logic Generated</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                    Enter your strategy prompt and click "Analyze" to see the AI generate the execution logic.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-900 rounded-xl overflow-hidden relative group">
                    <div className="absolute top-2 right-2 px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-mono rounded">JSON</div>
                    <pre className="text-blue-400 font-mono text-xs overflow-x-auto leading-relaxed">
                      {JSON.stringify(logic, null, 2)}
                    </pre>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Logic Breakdown</h4>

                    {/* Conditions List */}
                    <div className="space-y-2">
                      {logic.conditions?.map((cond: any, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                          <div className="mt-1 p-1 bg-blue-100 dark:bg-blue-900/50 rounded text-blue-600">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold text-slate-900 dark:text-white capitalize">{cond.metric}</span>
                            <span className="text-slate-500 mx-1"> {cond.operator.replace(/_/g, ' ')} </span>
                            <span className="font-mono text-blue-600">{cond.value}</span>
                            <span className="text-slate-400 text-xs ml-2">({cond.timeframe})</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions List */}
                    <div className="space-y-2">
                      {logic.actions?.map((action: any, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                          <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/50 rounded text-green-600">
                            <ArrowRight className="w-3 h-3" />
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold text-slate-900 dark:text-white capitalize">{action.type.replace(/_/g, ' ')}</span>
                            <span className="text-slate-500 mx-1"> {action.amount_percent}% of capital</span>
                            {action.target_pool && <span className="block text-xs text-slate-400 mt-1">Pool: {action.target_pool}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={handleMint}
                      disabled={isMinting}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                      {isMinting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Mint Strategy NFT
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Minting creates an on-chain record of this strategy</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
