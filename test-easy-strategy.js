const http = require('http');

// Create a strategy with easy conditions
async function createEasyStrategy() {
  console.log('🎯 Creating strategy with easy conditions...\n');
  
  try {
    // Create strategy with low APY requirement (1% instead of 8%)
    const strategyData = {
      name: 'Easy Win Strategy',
      description: 'A strategy with very easy conditions for testing',
      creatorAddress: '0xTester',
      riskLevel: 'Low',
      logic: {
        conditions: [{ 
          metric: 'apy', 
          operator: 'greater_than', 
          value: 1,  // Only 1% APY required
          timeframe: '24h' 
        }],
        actions: [{ 
          type: 'zap_in', 
          amount_percent: 100, 
          target_pool: 'pool_sol_usdc' 
        }],
        frequency: 'daily',
      }
    };
    
    const createResponse = await makeRequest({
      hostname: 'localhost',
      port: 4001,
      path: '/api/strategies',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, strategyData);
    
    console.log(`Create Strategy Status: ${createResponse.statusCode}`);
    console.log(`Create Strategy Body: ${createResponse.body}\n`);
    
    if (createResponse.statusCode === 201) {
      const createdStrategy = JSON.parse(createResponse.body);
      console.log(`✅ Created strategy: ${createdStrategy.data.name} (ID: ${createdStrategy.data.id})`);
      
      // Test execution with the new strategy
      const execResponse = await makeRequest({
        hostname: 'localhost',
        port: 4001,
        path: '/api/execution/run',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }, {
        strategyId: createdStrategy.data.id,
        userAddress: "Soli_Whale_0x123456789"
      });
      
      console.log(`\n📥 Execution Status: ${execResponse.statusCode}`);
      console.log(`📥 Execution Body: ${execResponse.body}`);
      
      const execResult = JSON.parse(execResponse.body);
      if (execResult.status === 'executed') {
        console.log(`\n🎉 SUCCESS! Strategy executed successfully!`);
        console.log(`📊 Execution logs:`, execResult.executionLogs);
      } else {
        console.log(`\n⏳ Strategy conditions not met, but this is normal behavior.`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: body
        });
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

createEasyStrategy();
