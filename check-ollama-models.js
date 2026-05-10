const https = require('https');

// Check available models on Ollama Cloud
async function checkOllamaModels() {
  console.log('🔍 Checking available models on Ollama Cloud...\n');
  
  const apiKey = 'f9bf8fd42ab04cd08ff8a04a24a1efae.ZJ-8GvF-4xBQZbBHtmtlQgtr';
  
  try {
    const response = await makeRequest({
      hostname: 'ollama.com',
      port: 443,
      path: '/api/tags',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ Available models on Ollama Cloud:');
      console.log(JSON.stringify(data, null, 2));
      
      if (data.models && data.models.length > 0) {
        console.log('\n🎯 Model list:');
        data.models.forEach((model, index) => {
          console.log(`${index + 1}. ${model.name} (${model.digest?.substring(0, 12)}...)`);
        });
        
        // Test with first available model
        const firstModel = data.models[0].name;
        console.log(`\n🧪 Testing with model: ${firstModel}`);
        await testWithModel(firstModel, apiKey);
      }
    } else {
      console.log('❌ Failed to get models');
      console.log('Response:', response.body);
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

async function testWithModel(modelName, apiKey) {
  try {
    const testData = {
      model: modelName,
      messages: [
        {
          role: 'system',
          content: 'You are an expert DeFi strategist. Return only JSON.'
        },
        {
          role: 'user',
          content: 'Convert "If volume increases 25% in 1h, zap in 75%" to JSON format with conditions, actions, and frequency'
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0,
      stream: false,
    };
    
    const response = await makeRequest({
      hostname: 'ollama.com',
      port: 443,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    }, JSON.stringify(testData));
    
    console.log(`\nTest Status: ${response.statusCode}`);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ SUCCESS: Model works!');
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Test failed');
      console.log('Response:', response.body);
    }
    
  } catch (error) {
    console.error('❌ Test ERROR:', error.message);
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

checkOllamaModels();
