// Correct way to import and configure OpenAI API (for newer versions)
require('dotenv').config();

const { OpenAI } = require('openai');  // Update this line

// Initialize OpenAI with API key and configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeClaim(text, articles) {
    const sourcesSummary = articles.map(a => `${a.title}: ${a.snippet}`).join('\n');

    const prompt = `
You are a fact-checking expert.
Analyze this claim: "${text}"
Based on the following news snippets:

${sourcesSummary}

Please respond in JSON with fields: "summary", "bias", "sources".
and if claim and snippet isnt news based, dont fat check it, and if it is appears to be nonsensical or incorrectly formatted, containing a mixture of programming terms and random characters. extract and use any sequence of characters that make sense and is news related
    `;

    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
    });

    // const response = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',  // Change this if you don't have access to GPT-4
    //     messages: [{ role: 'user', content: prompt }],
    // });
    

    const reply = response.choices[0].message.content;
    console.log('====================================');
    console.log(reply);
    console.log('====================================');

    try {
        return JSON.parse(reply);
    } catch (error) {
        console.error('Failed to parse OpenAI response:', error);
        return { summary: 'Could not generate analysis.', bias: '', sources: [] };
    }
}

module.exports = { analyzeClaim };
