const http = require('http');

// Simple test to check execution endpoint
async function testExecution() {
  console.log('🔍 Testing execution endpoint with hardcoded strategy ID...\n');
  
  try {
    // First get a strategy ID
    const listResponse = await makeRequest({
      hostname: 'localhost',
      port: 4001,
      path: '/api/strategies',
      method: 'GET'
    });
    
    if (listResponse.statusCode !== 200) {
      console.log('❌ Backend not responding correctly');
      return;
    }
    
    const strategies = JSON.parse(listResponse.body);
    if (!strategies.data || strategies.data.length === 0) {
      console.log('❌ No strategies found');
      return;
    }
    
    const strategyId = strategies.data[0].id;
    console.log(`📋 Using strategy ID: ${strategyId}`);
    
    // Test execution with exact same data as frontend
    const execData = {
      strategyId: strategyId,
      userAddress: "Soli_Whale_0x123456789"
    };
    
    console.log(`📤 Sending execution request:`, JSON.stringify(execData, null, 2));
    
    const execResponse = await makeRequest({
      hostname: 'localhost',
      port: 4001,
      path: '/api/execution/run',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, execData);
    
    console.log(`📥 Response status: ${execResponse.statusCode}`);
    console.log(`📥 Response body: ${execResponse.body}`);
    
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

testExecution();
