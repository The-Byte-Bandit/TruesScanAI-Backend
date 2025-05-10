// const axios = require('axios');

// async function analyzeClaimWithHuggingFace(text) {
//     const apiKey = process.env.HUGGINGFACE_API_KEY;
//     const model = 'bert-base-uncased';  // Example model
    
//     const url = `https://api-inference.huggingface.co/models/${model}`;

//     const headers = {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//     };

//     const data = {
//         inputs: text,
//     };

//     try {
//         const response = await axios.post(url, data, { headers });
//         return response.data;
//     } catch (error) {
//         console.error('Error calling Hugging Face API:', error);
//         return { error: 'Failed to get analysis from Hugging Face.' };
//     }
// }

// module.exports = { analyzeClaimWithHuggingFace };
