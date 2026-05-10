const http = require('http');

// Test frontend connection to backend
async function testFrontendConnection() {
  console.log('🔍 Testing frontend connection to backend...\n');
  
  // Test connection to port 4001 (old)
  console.log('1️⃣ Testing connection to port 4001 (old)');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 4001,
      path: '/api/strategies',
      method: 'GET'
    });
    
    console.log(`Status: ${response.statusCode}`);
  } catch (error) {
    console.log('❌ Port 4001 not accessible (expected)');
  }

  // Test connection to port 4002 (new)
  console.log('\n2️⃣ Testing connection to port 4002 (new)');
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
      console.log('✅ SUCCESS: Frontend can connect to port 4002');
      console.log(`Strategies available: ${data.data ? data.data.length : 0}`);
    } else {
      console.log('❌ Port 4002 returned error');
    }
  } catch (error) {
    console.error('❌ ERROR connecting to port 4002:', error.message);
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
    req.setTimeout(3000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

testFrontendConnection();
