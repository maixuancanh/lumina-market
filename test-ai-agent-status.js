const http = require('http');

// Check AI Agent status
async function checkAIAgentStatus() {
  console.log('🤖 Checking AI Agent Status...\n');
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 4001,
      path: '/api/ai-agent/status',
      method: 'GET'
    });
    
    console.log(`Status Code: ${response.statusCode}`);
    console.log(`Response: ${response.body}`);
    
    const status = JSON.parse(response.body);
    if (status.success) {
      console.log('\n📊 AI Agent Status:');
      console.log(`- Running: ${status.data.isRunning ? '✅ YES' : '❌ NO'}`);
      console.log(`- Uptime: ${status.data.uptime}`);
      console.log(`- Last Check: ${status.data.lastCheck}`);
      
      if (status.data.isRunning) {
        console.log('\n🎉 AI Agent is running AUTOMATICALLY 24/7!');
        console.log('📝 It will check strategies every 30 seconds and execute when conditions are met.');
      } else {
        console.log('\n⚠️ AI Agent is stopped. Start it with POST /api/ai-agent/start');
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking AI Agent status:', error.message);
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
    req.end();
  });
}

checkAIAgentStatus();
