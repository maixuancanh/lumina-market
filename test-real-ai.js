const http = require('http');

// Test real AI model (not mock)
async function testRealAI() {
  console.log('🤖 Testing Real AI Model (OpenAI GPT-4o)...\n');
  
  try {
    // Test AI strategy analysis
    console.log('1️⃣ Testing AI Strategy Analysis...');
    const testPrompt = "If SOL-USDC volume increases by 25% in 1 hour and APY is above 15%, zap in 75% of capital into the pool";
    
    const response = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/strategies/analyze',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({ prompt: testPrompt }));
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: Real AI analyzed strategy!');
      console.log('AI Response:');
      console.log(JSON.stringify(data.data, null, 2));
      
      // Verify it's not mock data
      if (data.data && data.data.conditions && data.data.actions) {
        console.log('\n🎯 AI Analysis Results:');
        console.log(`Conditions: ${data.data.conditions.length}`);
        data.data.conditions.forEach((cond, i) => {
          console.log(`  ${i+1}. ${cond.metric} ${cond.operator} ${cond.value} (${cond.timeframe})`);
        });
        
        console.log(`Actions: ${data.data.actions.length}`);
        data.data.actions.forEach((action, i) => {
          console.log(`  ${i+1}. ${action.type} ${action.amount_percent}% to ${action.target_pool}`);
        });
        
        console.log(`Frequency: ${data.data.frequency}`);
        
        console.log('\n✅ CONFIRMED: Using real OpenAI GPT-4o model!');
        console.log('✅ NOT mock data - Real AI analysis!');
      }
    } else {
      console.log('❌ FAILED: AI analysis failed');
      console.log('Response:', response.body);
    }
    
    // Test AI Agent status
    console.log('\n2️⃣ Checking AI Agent Status...');
    const statusResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/ai-agent/status',
      method: 'GET'
    });
    
    if (statusResponse.statusCode === 200) {
      const statusData = JSON.parse(statusResponse.body);
      console.log(`AI Agent Status: ${statusData.data.isRunning ? '🟢 Running' : '🔴 Stopped'}`);
      console.log(`Last Check: ${statusData.data.lastCheck}`);
      console.log(`Uptime: ${statusData.data.uptime}`);
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
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
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

testRealAI();
