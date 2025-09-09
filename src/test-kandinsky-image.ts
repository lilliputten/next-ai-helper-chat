import fs from 'fs';

// Kandinsky API configuration
const KANDINSKY_API_URL = 'https://api-key.fusionbrain.ai/';
const API_KEY = process.env.KANDINSKY_API_KEY; // Add to your .env
const SECRET_KEY = process.env.KANDINSKY_SECRET_KEY; // Add to your .env

async function generateImageWithKandinsky() {
  try {
    if (!API_KEY || !SECRET_KEY) {
      throw new Error('KANDINSKY_API_KEY and KANDINSKY_SECRET_KEY required in .env');
    }

    // Step 1: Get available models
    const modelsResponse = await fetch(`${KANDINSKY_API_URL}key/api/v1/models`, {
      headers: {
        'X-Key': `Key ${API_KEY}`,
        'X-Secret': `Secret ${SECRET_KEY}`,
      },
    });
    
    const models = await modelsResponse.json();
    console.log('Available models:', models);
    
    const modelId = models[0]?.id; // Use first available model
    
    // Step 2: Generate image
    const generateResponse = await fetch(`${KANDINSKY_API_URL}key/api/v1/text2image/run`, {
      method: 'POST',
      headers: {
        'X-Key': `Key ${API_KEY}`,
        'X-Secret': `Secret ${SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'GENERATE',
        numImages: 1,
        width: 1024,
        height: 1024,
        generateParams: {
          query: 'Pink cat sitting on a windowsill, cute, detailed, digital art',
        },
      }),
    });
    
    const generateResult = await generateResponse.json();
    const uuid = generateResult.uuid;
    
    console.log('Generation started, UUID:', uuid);
    
    // Step 3: Check status and get result
    let attempts = 0;
    while (attempts < 60) { // Wait up to 5 minutes
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`${KANDINSKY_API_URL}key/api/v1/text2image/status/${uuid}`, {
        headers: {
          'X-Key': `Key ${API_KEY}`,
          'X-Secret': `Secret ${SECRET_KEY}`,
        },
      });
      
      const status = await statusResponse.json();
      console.log('Status:', status.status);
      
      if (status.status === 'DONE') {
        // Save image
        const imageData = Buffer.from(status.images[0], 'base64');
        fs.writeFileSync('generated-cat.png', imageData);
        console.log('✅ Image saved as generated-cat.png');
        break;
      }
      
      if (status.status === 'FAIL') {
        throw new Error('Image generation failed');
      }
      
      attempts++;
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateImageWithKandinsky();