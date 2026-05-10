"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Wand2,
  LayoutDashboard,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Wallet,
  BarChart3,
} from "lucide-react";

/**
 * FeatureCard Component
 * Renders a value proposition card with an icon, title, and description.
 */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 group">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/30">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/**
 * WorkflowStep Component
 * Renders a step in the process flow.
 */
function WorkflowStep({
  number,
  title,
  desc,
  icon,
}: {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative group">
      <div className="text-5xl font-black text-slate-100 dark:text-slate-800 absolute top-4 right-4 group-hover:text-blue-100 dark:group-hover:text-blue-900/30 transition-colors">
        {number}
      </div>
      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center mb-4 relative z-10">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 relative z-10 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-600 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-[-10%] w-[30%] h-[50%] bg-indigo-600 blur-[100px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8">
            <Zap className="w-4 h-4" />
            <span>The Future of Liquidity Intelligence</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
            Don't just provide <span className="text-blue-600">liquidity</span>,
            <br />
            trade the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              intelligence.
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed px-4">
            Lumina Market is the first decentralized exchange for{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              AI LP Strategies
            </span>
            . Convert your trading intuition into autonomous agents that execute
            Zaps in real-time, backed by on-chain Proof of Profit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
            <Link
              href="/marketplace"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group"
            >
              Explore Marketplace
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/builder"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Wand2 className="w-5 h-5 text-blue-600" />
              Build a Strategy
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 px-6 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Lumina Market?
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Bridging the gap between quantitative insight and automated
              execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cpu className="w-6 h-6" />}
              title="Natural Language to JSON"
              description="No more complex coding. Describe your strategy in plain English, and our AI translates it into a precise, executable blueprint."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Proof of Profit"
              description="Transparent backtesting using real LP Agent endpoints. Every strategy comes with historical PnL and drawdown metrics."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Autonomous Execution"
              description="AI Agents monitor pool volume, APY, and volatility 24/7, executing Zap in/out operations without manual intervention."
            />
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How it Works
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              A seamless cycle from insight to profit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <WorkflowStep
              number="01"
              title="Strategize"
              desc="A trader defines a liquidity strategy using the AI Builder."
              icon={<Wand2 />}
            />
            <WorkflowStep
              number="02"
              title="Tokenize"
              desc="The strategy is packaged as an NFT, creating a tradable asset."
              icon={<Zap />}
            />
            <WorkflowStep
              number="03"
              title="Invest"
              desc="Investors buy or subscribe to the strategy and allocate capital."
              icon={<Wallet />}
            />
            <WorkflowStep
              number="04"
              title="Execute"
              desc="The AI Agent runs the logic, managing funds via LP Agent Zap APIs."
              icon={<TrendingUp />}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 blur-3xl rounded-full -z-10 translate-y-1/2" />
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">
            Ready to trade <span className="text-blue-600">intelligence?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/marketplace"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              Enter the Marketplace
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5" />
              Investor Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
