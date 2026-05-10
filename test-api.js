const http = require('http');

// Test function to make HTTP requests
function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing Lumina Market API...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 4001,
      path: '/health',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`Status: ${healthResponse.statusCode}`);
    console.log(`Body: ${healthResponse.body}\n`);
    
    // Test 2: List strategies
    console.log('2. Testing list strategies endpoint...');
    const listResponse = await makeRequest({
      hostname: 'localhost',
      port: 4001,
      path: '/api/strategies',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`Status: ${listResponse.statusCode}`);
    console.log(`Body: ${listResponse.body}\n`);
    
    // Test 3: Parse strategies to get first ID
    const strategiesData = JSON.parse(listResponse.body);
    if (strategiesData.data && strategiesData.data.length > 0) {
      const firstStrategy = strategiesData.data[0];
      console.log(`3. Found strategy: ${firstStrategy.name} (ID: ${firstStrategy.id})`);
      
      // Test 4: Get specific strategy
      console.log('\n4. Testing get specific strategy...');
      const getResponse = await makeRequest({
        hostname: 'localhost',
        port: 4001,
        path: `/api/strategies/${firstStrategy.id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`Status: ${getResponse.statusCode}`);
      console.log(`Body: ${getResponse.body}\n`);
      
      // Test 5: Execute strategy
      console.log('5. Testing execution endpoint...');
      const execResponse = await makeRequest({
        hostname: 'localhost',
        port: 4001,
        path: '/api/execution/run',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }, {
        strategyId: firstStrategy.id,
        userAddress: 'Soli_Whale_0x123456789'
      });
      console.log(`Status: ${execResponse.statusCode}`);
      console.log(`Body: ${execResponse.body}\n`);
      
    } else {
      console.log('❌ No strategies found!');
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('💡 Make sure the backend is running on port 4001');
  }
}

testAPI();
