const http = require('http');

// Test API response structure to match with dashboard
async function testAPIResponse() {
  console.log('🔍 Testing API response structure...\n');
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/strategies',
      method: 'GET'
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: Got strategies from backend');
      console.log(`Total strategies: ${data.data ? data.data.length : 0}`);
      
      if (data.data && data.data.length > 0) {
        console.log('\n📊 Strategy structure:');
        data.data.forEach((strategy, index) => {
          console.log(`\nStrategy ${index + 1}:`);
          console.log(`ID: ${strategy.id}`);
          console.log(`Name: ${strategy.name}`);
          console.log(`Description: ${strategy.description}`);
          console.log(`Risk Level: ${strategy.riskLevel}`);
          console.log(`Active: ${strategy.isActive}`);
          
          if (strategy.performance) {
            console.log(`Performance:`);
            console.log(`  Total Profit %: ${strategy.performance.totalProfitPercent}`);
            console.log(`  Max Drawdown %: ${strategy.performance.maxDrawdownPercent}`);
            console.log(`  History length: ${strategy.performance.history ? strategy.performance.history.length : 0}`);
          }
          
          if (strategy.logic) {
            console.log(`Logic:`);
            console.log(`  Conditions: ${JSON.stringify(strategy.logic.conditions, null, 2)}`);
            console.log(`  Actions: ${JSON.stringify(strategy.logic.actions, null, 2)}`);
            console.log(`  Frequency: ${strategy.logic.frequency}`);
          }
        });
      }
    } else {
      console.log('❌ FAILED: Backend returned error');
      console.log('Response:', response.body);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

function makeRequest(options) {
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
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

testAPIResponse();
