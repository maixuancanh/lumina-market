const https = require('https');

// Test LP Agent API connectivity
async function testLPAgentAPI() {
  console.log('🔍 Testing LP Agent API connectivity...\n');
  
  const apiKey = 'lpagent_881f399cb9e7c2415660a3a877bed58e';
  const baseUrl = 'https://api.lpagent.io';
  
  // Test 1: Get LP positions (from documentation)
  console.log('1️⃣ Testing GET /open-api/v1/lp-positions/opening');
  try {
    const response = await makeRequest({
      hostname: 'api.lpagent.io',
      path: '/open-api/v1/lp-positions/opening?owner=7KHx2Uc5qsqz652eXbu8Qtabi5KLxWJLgxFzcaBzP32i',
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: Got LP positions');
      console.log(`Total positions: ${data.count || 0}`);
      
      if (data.data && data.data.length > 0) {
        console.log('\n📊 Sample pool data:');
        const samplePool = data.data[0];
        console.log(`Pool: ${samplePool.pool}`);
        console.log(`Pair: ${samplePool.pairName}`);
        console.log(`Current Value: ${samplePool.currentValue}`);
        console.log(`APR: ${samplePool.apr}`);
        console.log(`Protocol: ${samplePool.protocol}`);
        
        // Test with this real pool ID
        console.log('\n2️⃣ Testing pool data with real pool ID...');
        await testPoolData(samplePool.pool, apiKey);
      }
    } else {
      console.log('❌ FAILED: API returned error');
      console.log('Response:', response.body);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

async function testPoolData(poolId, apiKey) {
  console.log(`\n3️⃣ Testing GET /pools/${poolId}`);
  try {
    const response = await makeRequest({
      hostname: 'api.lpagent.io',
      path: `/pools/${poolId}`,
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: Got pool data');
      console.log('Pool data:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ FAILED: Pool data not found');
      console.log('Response:', response.body);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

async function testPoolsList(apiKey) {
  console.log('\n4️⃣ Testing GET /pools (list all pools)');
  try {
    const response = await makeRequest({
      hostname: 'api.lpagent.io',
      path: '/pools',
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: Got pools list');
      console.log(`Total pools: ${data.length || data.count || 0}`);
      if (data.length > 0) {
        console.log('Sample pool:', data[0]);
        // Test with this pool ID
        await testPoolData(data[0].id || data[0].poolId, apiKey);
      }
    } else {
      console.log('❌ FAILED: Could not get pools list');
      console.log('Response:', response.body);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

async function testZapIn(poolId, apiKey) {
  console.log('\n5️⃣ Testing POST /pools/zap-in');
  try {
    const body = {
      poolId: poolId,
      amount: 1.0,
      userAddress: '7KHx2Uc5qsqz652eXbu8Qtabi5KLxWJLgxFzcaBzP32i'
    };
    
    const response = await makeRequest({
      hostname: 'api.lpagent.io',
      path: '/pools/zap-in',
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: Zap In initiated');
      console.log('Transaction:', data);
    } else {
      console.log('❌ FAILED: Zap In failed');
      console.log('Response:', response.body);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: body,
          headers: res.headers
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

async function runAllTests() {
  try {
    await testLPAgentAPI();
    await testPoolsList(apiKey);
    await testZapIn('5hbf9JP8k5zdrZp9pokPypFQoBse5mGCmW6nqodurGcd', apiKey);
  } catch (error) {
    console.error('Test suite failed:', error);
  }
}

runAllTests();
