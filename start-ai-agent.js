const http = require('http');

// Start AI Agent and verify it's working
async function startAIAgent() {
  console.log('🤖 Starting AI Agent...\n');
  
  try {
    // 1. Check current status
    console.log('1️⃣ Checking current AI Agent status...');
    const statusResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/ai-agent/status',
      method: 'GET'
    });
    
    if (statusResponse.statusCode === 200) {
      const statusData = JSON.parse(statusResponse.body);
      console.log(`Current status: ${statusData.data.isRunning ? 'Running' : 'Stopped'}`);
    }
    
    // 2. Start AI Agent if not running
    console.log('\n2️⃣ Starting AI Agent...');
    const startResponse = await makeRequest({
      hostname: 'localhost',
      port: 4002,
      path: '/api/ai-agent/start',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Start response: ${startResponse.statusCode}`);
    if (startResponse.statusCode === 200) {
      const startData = JSON.parse(startResponse.body);
      console.log('✅ SUCCESS: AI Agent started');
      console.log('Message:', startData.message);
    } else {
      console.log('❌ FAILED: Could not start AI Agent');
      console.log('Response:', startResponse.body);
    }
    
    // 3. Verify it's running
    console.log('\n3️⃣ Verifying AI Agent is running...');
    setTimeout(async () => {
      const verifyResponse = await makeRequest({
        hostname: 'localhost',
        port: 4002,
        path: '/api/ai-agent/status',
        method: 'GET'
      });
      
      if (verifyResponse.statusCode === 200) {
        const verifyData = JSON.parse(verifyResponse.body);
        console.log(`✅ Verification: AI Agent is ${verifyData.data.isRunning ? 'Running' : 'Stopped'}`);
        console.log(`Uptime: ${verifyData.data.uptime}`);
        console.log(`Last check: ${verifyData.data.lastCheck}`);
      }
    }, 2000);
    
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

startAIAgent();
