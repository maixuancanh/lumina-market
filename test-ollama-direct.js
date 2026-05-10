const https = require('https');

// Test direct Ollama API call to understand correct format
async function testOllamaDirect() {
  console.log('🔍 Testing Direct Ollama API...\n');
  
  const apiKey = 'f9bf8fd42ab04cd08ff8a04a24a1efae.ZJ-8GvF-4xBQZbBHtmtlQgtr';
  const baseURL = 'https://api.ollama.com/v1';
  
  try {
    // Test 1: Check available models
    console.log('1️⃣ Testing available models...');
    const modelsResponse = await makeRequest({
      hostname: 'api.ollama.com',
      port: 443,
      path: '/v1/models',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`Models Status: ${modelsResponse.statusCode}`);
    if (modelsResponse.statusCode === 200) {
      const modelsData = JSON.parse(modelsResponse.body);
      console.log('✅ Available models:');
      console.log(JSON.stringify(modelsData.data, null, 2));
    } else {
      console.log('❌ Models check failed');
      console.log('Response:', modelsResponse.body);
    }
    
    // Test 2: Try chat completion
    console.log('\n2️⃣ Testing chat completion...');
    const chatData = {
      model: 'llama3.1:8b',
      messages: [
        {
          role: 'system',
          content: 'You are an expert DeFi strategist. Return only JSON.'
        },
        {
          role: 'user',
          content: 'Convert "If volume increases 25% in 1h, zap in 75%" to JSON format'
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0,
    };
    
    const chatResponse = await makeRequest({
      hostname: 'api.ollama.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    }, JSON.stringify(chatData));
    
    console.log(`Chat Status: ${chatResponse.statusCode}`);
    if (chatResponse.statusCode === 200) {
      const chatData = JSON.parse(chatResponse.body);
      console.log('✅ Chat completion successful!');
      console.log('Response:', JSON.stringify(chatData, null, 2));
    } else {
      console.log('❌ Chat completion failed');
      console.log('Response:', chatResponse.body);
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: responseBody
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

testOllamaDirect();
