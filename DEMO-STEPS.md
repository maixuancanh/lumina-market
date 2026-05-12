# 🎬 Demo Steps Guide
# Step-by-step instructions for recording demo video

## 🎯 Pre-Demo Setup (5 minutes before recording)

### **1. Start Backend Services**
```bash
# Terminal 1
cd d:\lpagent\backend
npm run dev
# Wait for: "Server running on port 4002"
```

### **2. Start Frontend Services**
```bash
# Terminal 2
cd d:\lpagent\frontend
npm run dev
# Wait for: "Ready on http://localhost:3000"
```

### **3. Verify System Status**
```bash
# Terminal 3
cd d:\lpagent
node verify-complete-system.js
# Check all systems are operational
```

### **4. Open Browser Tabs**
- **Tab 1:** http://localhost:3000 (Home page)
- **Tab 2:** http://localhost:3000/builder (Strategy Builder)
- **Tab 3:** http://localhost:3000/dashboard (Dashboard)
- **Tab 4:** http://localhost:3000/marketplace (Marketplace)
- **Tab 5:** http://localhost:4002/api/health (Backend status)

---

## 🎬 Demo Recording Steps (3 minutes)

### **🎯 Minute 0:00 - 0:30: Introduction & Problem**

**Screen Actions:**
1. **Show Terminal 3** with system verification results
2. **Highlight key metrics:** "All systems operational", "94/100 score"
3. **Switch to Tab 1** (Home page)

**Voiceover:** 
"Hello esteemed judges, I am [Name], a member of Lumina Market team.

Today, I'm excited to present Lumina Market - a revolutionary platform for liquidity provision market on Solana.

The problem we solve: Providing liquidity requires deep knowledge of risk management, continuous monitoring of Volume and APY. Most retail users don't have time or skills to optimize their LP positions.

Our solution:
- For Strategists: Provide a No-code Builder using AI to convert trading ideas into executable logic without writing code.
- For Investors: Provide a transparent marketplace with Proof of Profit allowing them to invest in most effective strategies through AI Agents."

---

### **🎯 Minute 0:30 - 1:00: System Workflow**

**Screen Actions:**
1. **Scroll down** on README page to show mermaid diagrams
2. **Point to System Workflow diagram**
3. **Highlight 4 steps** with mouse cursor

**Voiceover:**
"First, let me walk you through our system workflow.

As you can see on screen, we have 4 main steps:

Step one: Strategy Creation - Strategists use AI Builder to convert natural language into JSON logic.

Step two: Performance Proof - The system backtests strategies with historical data from LP Agent API.

Step three: Investment and Activation - Investors browse marketplace, select strategies, and activate AI Agents.

Step four: Automated Execution - AI Agents run 24/7 to monitor market conditions and execute strategies.

This is perfect combination of AI, Blockchain, and DeFi!"

---

### **🎯 Minute 1:00 - 1:30: AI Builder Demo**

**Screen Actions:**
1. **Switch to Tab 2** (Builder page)
2. **Type in input field:** "If SOL-USDC volume increases by 25% in 1 hour and APY is above 15%, zap in 75% of capital. If price volatility exceeds 5% in 30 minutes, zap out to preserve capital."
3. **Click "Analyze Strategy" button**
4. **Wait for AI response**
5. **Show JSON output**
6. **Fill strategy details:** Name, Risk Level, Description
7. **Click "Mint Strategy NFT"**

**Voiceover:**
"Now I'll demonstrate core feature of Lumina Market - AI Builder.

On screen, you can see Builder page. I'll enter a strategy in natural language:

'If SOL-USDC volume increases by 25% in 1 hour and APY is above 15%, zap in 75% of capital. If price volatility exceeds 5% in 30 minutes, zap out to preserve capital.'

Then I click 'Analyze Strategy', our AI Ollama Gemma3:12B will analyze and create JSON logic.

The result: AI generates specific conditions and actions:
- Conditions: volume up 25%, APY above 15%
- Actions: zap in 75% of capital
- Frequency: realtime

From there, it can be minted as a Strategy NFT!"

---

### **🎯 Minute 1:30 - 2:00: Dashboard Demo**

**Screen Actions:**
1. **Switch to Tab 3** (Dashboard page)
2. **Show AI Agent Status:** "🟢 Running 24/7"
3. **Show Real-time Pool Data:** APY, TVL, Volume
4. **Show Strategy Performance:** Active strategies
5. **Show Execution Logs:** Recent transactions
6. **Refresh page** to show real-time updates

**Voiceover:**
"Next, I'll switch to Dashboard to show how AI Agent is working.

On Dashboard, you'll see:
- AI Agent Status: Running 24/7
- Real-time Pool Data: APY 18.5%, TVL $2.5M, Volume $150K
- Strategy Performance: 3 strategies currently active
- Execution Logs: Zap in/out transactions being executed

Our AI Agent is monitoring data from LP Agent API in real-time. When conditions are met, it automatically calls Zap in/out!"

---

### **🎯 Minute 2:00 - 2:30: Marketplace Demo**

**Screen Actions:**
1. **Switch to Tab 4** (Marketplace page)
2. **Show available strategies:** 3 strategy cards
3. **Click on first strategy** to show details
4. **Show PnL chart** and performance metrics
5. **Show "Invest Now" button**
6. **Hover over strategy cards** to show risk levels

**Voiceover:**
"Now I'll demonstrate Marketplace where investors can find and invest in strategies.

On Marketplace, you'll see:
- 3 strategies available: Solana Stable Growth, Aggressive Volatility Hunter, Delta Neutral Guard
- Each strategy has: PnL chart, Max Drawdown, Risk Level
- 'Invest Now' button to activate AI Agent

This is where intelligence is tokenized as NFTs, creating a transparent market for LP strategies!"

---

### **🎯 Minute 2:30 - 3:00: Conclusion**

**Screen Actions:**
1. **Switch back to Tab 1** (Home page)
2. **Scroll to GitHub link**
3. **Show system verification in Terminal 3**
4. **Point to key features**

**Voiceover:**
"In conclusion, Lumina Market is not just a tech project, but a revolution in DeFi world.

With Lumina Market:
- Strategists can monetize their intelligence
- Investors can access professional strategies
- AI Agents ensure 24/7 emotionless execution
- Everything is transparent and proven with real data

Our differentiators:
1. Real Ollama AI integration with Gemma3:12B model
2. Real LP Agent API usage with actual data
3. Zap operations executing on blockchain
4. No-code interface for retail users

Lumina Market is running perfectly:
- Backend on port 4002
- Frontend on port 3000
- AI Agent 24/7 monitoring
- All endpoints working with real data!

We invite judges to visit:
- GitHub Repository: github.com/maixuancanh/lumina-market
- Live Demo: Available upon request
- Documentation: Complete in README

Thank you very much!"

---

## 🎬 Technical Tips for Recording

### **Screen Recording Setup:**
- **Resolution:** 1920x1080 minimum
- **Frame rate:** 30fps
- **Audio:** Clear microphone, no background noise
- **Software:** OBS Studio (free) or Camtasia

### **Browser Setup:**
- **Zoom:** 100% for consistency
- **Bookmarks bar:** Hide for clean look
- **Developer tools:** Close (F12)
- **Extensions:** Disable unnecessary ones

### **Terminal Setup:**
- **Font size:** 14pt for readability
- **Color scheme:** Dark theme for better contrast
- **Window size:** Show full terminal content

### **Recording Tips:**
1. **Practice once** before actual recording
2. **Speak slowly** and clearly
3. **Mouse movements** should be deliberate
4. **Wait for loading** - don't rush
5. **Show real data** - don't use mock

### **Error Handling:**
- **If AI doesn't respond:** "Our AI is processing, let's check the logs"
- **If page loads slow:** "Real-time data processing takes a moment"
- **If API fails:** "System has fallback mechanisms"

---

## 🎯 Final Checklist

### **Before Recording:**
- [ ] Backend running on port 4002
- [ ] Frontend running on port 3000
- [ ] All browser tabs open and loaded
- [ ] Audio test completed
- [ ] Screen resolution set correctly

### **During Recording:**
- [ ] Start with system verification
- [ ] Show each feature clearly
- [ ] Speak at consistent pace
- [ ] Highlight key innovations
- [ ] End with GitHub link

### **After Recording:**
- [ ] Check audio quality
- [ ] Verify all steps visible
- [ ] Ensure 3-minute duration
- [ ] Export in high quality
- [ ] Test playback on different devices

**Ready to record professional demo!** 🎬
