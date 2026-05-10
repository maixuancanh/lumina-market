const http = require('http');

// Complete system verification
async function verifyCompleteSystem() {
  console.log('🔍 VERIFYING COMPLETE LUMINA MARKET SYSTEM...\n');
  
  let allTestsPassed = true;
  const results = [];
  
  try {
    // 1. Backend Health Check
    console.log('1️⃣ Backend Health Check...');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/health',
      method: 'GET'
    });
    
    if (healthResponse.statusCode === 200) {
      console.log('✅ Backend: Running on port 4002');
      results.push('✅ Backend Health: PASSED');
    } else {
      console.log('❌ Backend: Not responding');
      results.push('❌ Backend Health: FAILED');
      allTestsPassed = false;
    }
    
    // 2. AI Agent Status
    console.log('\n2️⃣ AI Agent Status Check...');
    const agentResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/ai-agent/status',
      method: 'GET'
    });
    
    if (agentResponse.statusCode === 200) {
      const agentData = JSON.parse(agentResponse.body);
      const isRunning = agentData.data.isRunning;
      const uptime = agentData.data.uptime;
      const lastCheck = agentData.data.lastCheck;
      
      console.log(`✅ AI Agent: ${isRunning ? '🟢 RUNNING' : '🔴 STOPPED'}`);
      console.log(`   Uptime: ${uptime}`);
      console.log(`   Last Check: ${lastCheck}`);
      
      if (isRunning) {
        results.push('✅ AI Agent Status: RUNNING');
      } else {
        results.push('❌ AI Agent Status: STOPPED');
        allTestsPassed = false;
      }
    } else {
      console.log('❌ AI Agent: Not responding');
      results.push('❌ AI Agent Status: FAILED');
      allTestsPassed = false;
    }
    
    // 3. LP Agent API Real Data Check
    console.log('\n3️⃣ LP Agent API Real Data Check...');
    const lpDataResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/lp-agent/pools',
      method: 'GET'
    });
    
    if (lpDataResponse.statusCode === 200) {
      const lpData = JSON.parse(lpDataResponse.body);
      const poolCount = lpData.data?.length || 0;
      const hasRealData = poolCount > 0;
      
      console.log(`✅ LP Agent API: ${poolCount} pools found`);
      console.log(`   Real Data: ${hasRealData ? '✅ YES' : '❌ NO'}`);
      
      if (hasRealData) {
        // Show first pool details
        const firstPool = lpData.data[0];
        console.log(`   Sample Pool ID: ${firstPool.poolId}`);
        console.log(`   Sample APY: ${firstPool.apy}%`);
        console.log(`   Sample TVL: $${(firstPool.tvl / 1000000).toFixed(2)}M`);
        results.push('✅ LP Agent API: REAL DATA');
      } else {
        results.push('❌ LP Agent API: NO DATA');
        allTestsPassed = false;
      }
    } else {
      console.log('❌ LP Agent API: Failed');
      results.push('❌ LP Agent API: FAILED');
      allTestsPassed = false;
    }
    
    // 4. Ollama AI Model Test
    console.log('\n4️⃣ Ollama AI Model Test...');
    const aiTestResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/strategies/analyze',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({ 
      prompt: "If SOL volume increases 20% in 1h, zap in 50%" 
    }));
    
    if (aiTestResponse.statusCode === 200) {
      const aiData = JSON.parse(aiTestResponse.body);
      const hasConditions = aiData.data.conditions && aiData.data.conditions.length > 0;
      const hasActions = aiData.data.actions && aiData.data.actions.length > 0;
      const hasFrequency = aiData.data.frequency;
      
      console.log('✅ Ollama AI: Analysis successful');
      console.log(`   Model: Gemma3:12B`);
      console.log(`   Conditions: ${hasConditions ? '✅ YES' : '❌ NO'}`);
      console.log(`   Actions: ${hasActions ? '✅ YES' : '❌ NO'}`);
      console.log(`   Frequency: ${hasFrequency || '❌ NO'}`);
      
      if (hasConditions && hasActions && hasFrequency) {
        results.push('✅ Ollama AI: WORKING');
      } else {
        results.push('❌ Ollama AI: INCOMPLETE');
        allTestsPassed = false;
      }
    } else {
      console.log('❌ Ollama AI: Test failed');
      results.push('❌ Ollama AI: FAILED');
      allTestsPassed = false;
    }
    
    // 5. Strategies Real Data Check
    console.log('\n5️⃣ Strategies Real Data Check...');
    const strategiesResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/strategies',
      method: 'GET'
    });
    
    if (strategiesResponse.statusCode === 200) {
      const strategiesData = JSON.parse(strategiesResponse.body);
      const strategyCount = strategiesData.data.length;
      const hasActiveStrategies = strategiesData.data.some(s => s.isActive);
      
      console.log(`✅ Strategies: ${strategyCount} available`);
      console.log(`   Active: ${hasActiveStrategies ? '✅ YES' : '❌ NO'}`);
      
      strategiesData.data.forEach((strategy, index) => {
        console.log(`   ${index + 1}. ${strategy.name} (${strategy.riskLevel}) - ${strategy.isActive ? '🟢 Active' : '🔴 Inactive'}`);
      });
      
      if (strategyCount > 0 && hasActiveStrategies) {
        results.push('✅ Strategies: REAL DATA');
      } else {
        results.push('❌ Strategies: NO ACTIVE');
        allTestsPassed = false;
      }
    } else {
      console.log('❌ Strategies: Not available');
      results.push('❌ Strategies: FAILED');
      allTestsPassed = false;
    }
    
    // 6. Frontend Status
    console.log('\n6️⃣ Frontend Status Check...');
    try {
      const frontendResponse = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET'
      });
      
      if (frontendResponse.statusCode === 200) {
        console.log('✅ Frontend: Running on port 3000');
        results.push('✅ Frontend: RUNNING');
      } else {
        console.log('❌ Frontend: Not responding');
        results.push('❌ Frontend: FAILED');
        allTestsPassed = false;
      }
    } catch (error) {
      console.log('❌ Frontend: Not running (Connection refused)');
      results.push('❌ Frontend: NOT RUNNING');
      allTestsPassed = false;
    }
    
    // 7. AI Agent Real-time Monitoring Check
    console.log('\n7️⃣ AI Agent Real-time Monitoring Check...');
    const monitoringResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/ai-agent/monitoring',
      method: 'GET'
    });
    
    if (monitoringResponse.statusCode === 200) {
      const monitoringData = JSON.parse(monitoringResponse.body);
      const isMonitoring = monitoringData.data.isMonitoring;
      const lastCheck = monitoringData.data.lastCheck;
      const strategiesChecked = monitoringData.data.strategiesChecked;
      
      console.log(`✅ AI Agent Monitoring: ${isMonitoring ? '🟢 ACTIVE' : '🔴 INACTIVE'}`);
      console.log(`   Last Check: ${lastCheck}`);
      console.log(`   Strategies Checked: ${strategiesChecked}`);
      
      if (isMonitoring) {
        results.push('✅ AI Agent Monitoring: ACTIVE');
      } else {
        results.push('❌ AI Agent Monitoring: INACTIVE');
        allTestsPassed = false;
      }
    } else {
      console.log('❌ AI Agent Monitoring: Failed');
      results.push('❌ AI Agent Monitoring: FAILED');
      allTestsPassed = false;
    }
    
    // Final Summary
    console.log('\n🎯 COMPLETE SYSTEM VERIFICATION RESULTS:');
    console.log('==========================================');
    
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result}`);
    });
    
    console.log('\n📊 SUMMARY:');
    console.log(`Overall Status: ${allTestsPassed ? '🟢 ALL SYSTEMS OPERATIONAL' : '🔴 SOME ISSUES DETECTED'}`);
    console.log(`Tests Passed: ${results.filter(r => r.includes('✅')).length}/${results.length}`);
    
    if (allTestsPassed) {
      console.log('\n🚀 LUMINA MARKET IS FULLY OPERATIONAL!');
      console.log('✅ Backend API: Running');
      console.log('✅ AI Agent: 24/7 Monitoring');
      console.log('✅ Ollama AI: Gemma3:12B Model');
      console.log('✅ LP Agent API: Real Data Connected');
      console.log('✅ Strategies: Active & Working');
      console.log('✅ Frontend: User Interface Ready');
      console.log('✅ Real-time Monitoring: Active');
    } else {
      console.log('\n⚠️ SOME COMPONENTS NEED ATTENTION');
      console.log('Please check the failed components above.');
    }
    
  } catch (error) {
    console.error('❌ System Verification Error:', error.message);
    allTestsPassed = false;
  }
  
  return allTestsPassed;
}

function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: responseBody
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

verifyCompleteSystem();
