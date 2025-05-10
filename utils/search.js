// require('dotenv').config();

// const axios = require('axios');

// async function searchArticles(query) {
//     const apiKey = process.env.SERPAPI_API_KEY;
//     const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}&num=5`;

//     const config = {
//         timeout: 10000,
//       };

//     const response = await axios.get(url,config);
//     const results = response.data.organic_results || [];
//     console.log('====================================');
//     console.log(results);
//     console.log('====================================');

//     return results.map(r => ({
//         title: r.title,
//         link: r.link,
//         snippet: r.snippet
//     }));
// }

// module.exports = { searchArticles };

const axios = require('axios');
const axiosRetry = require('axios-retry'); // Import axios-retry

// Apply the retry logic using the correct syntax for axios-retry v3.x.x
axiosRetry.default(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

async function searchArticles(query) {
  const apiKey = process.env.SERPAPI_API_KEY;
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}&num=5`;

  try {
    const response = await axios.get(url);
    const results = response.data.organic_results || [];

    return results.map(r => ({
      title: r.title,
      link: r.link,
      snippet: r.snippet
    }));
  } catch (error) {
    console.error('Error fetching data from SerpAPI:', error);
    return [];
  }
}

module.exports = { searchArticles };