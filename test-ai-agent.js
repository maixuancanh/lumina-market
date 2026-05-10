const http = require('http');

// Test AI Agent endpoints on port 4002
async function testAIAgent() {
  console.log('🤖 Testing AI Agent endpoints...\n');
  
  // Test 1: Check AI Agent status
  console.log('1️⃣ Testing GET /api/ai-agent/status');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/ai-agent/status',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: Got AI Agent status');
      console.log('Status:', data);
    } else {
      console.log('❌ FAILED: Status endpoint failed');
      console.log('Response:', response.body);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }

  // Test 2: Start AI Agent
  console.log('\n2️⃣ Testing POST /api/ai-agent/start');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/ai-agent/start',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: AI Agent started');
      console.log('Response:', data);
    } else {
      console.log('❌ FAILED: Start endpoint failed');
      console.log('Response:', response.body);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }

  // Test 3: Stop AI Agent
  console.log('\n3️⃣ Testing POST /api/ai-agent/stop');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/ai-agent/stop',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: AI Agent stopped');
      console.log('Response:', data);
    } else {
      console.log('❌ FAILED: Stop endpoint failed');
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

testAIAgent();
