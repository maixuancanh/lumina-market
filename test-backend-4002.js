const http = require('http');

// Test backend on port 4002
async function testBackend() {
  console.log('🔍 Testing backend on port 4002...\n');
  
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
        console.log('\n📊 Sample strategy:');
        const sampleStrategy = data.data[0];
        console.log(`Name: ${sampleStrategy.name}`);
        console.log(`Pool: ${sampleStrategy.logic?.actions?.[0]?.target_pool}`);
        console.log(`Risk: ${sampleStrategy.riskLevel}`);
        console.log(`Active: ${sampleStrategy.isActive}`);
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

testBackend();
