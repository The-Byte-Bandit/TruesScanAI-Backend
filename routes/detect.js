// // const express = require('express');
// // const router = express.Router();
// // const fs = require('fs');

// // const { extractText } = require('../utils/ocr');
// // const { searchArticles } = require('../utils/search');
// // const { analyzeClaim } = require('../utils/analyzer');
// // const { gradeTruthfulness } = require('../utils/grader');

// // router.post('/', async (req, res) => {
// //     try {
// //         let inputText = req.body.text || '';
        
// //         if (req.file) {
// //             const extractedText = await extractText(req.file.path);
// //             inputText = extractedText;
// //             fs.unlinkSync(req.file.path); // Clean up uploaded file
// //         }

// //         if (!inputText.trim()) {
// //             return res.status(400).json({ error: 'No text provided.' });
// //         }

// //         const articles = await searchArticles(inputText);
// //         const analysis = await analyzeClaim(inputText, articles);
// //         const score = gradeTruthfulness(inputText, articles);

// //         let responseMessage = {
// //             input_text: inputText,
// //             truth_score: score,
// //             analysis: analysis.summary,
// //             bias_warning: analysis.bias,
// //             sources: analysis.sources
// //         };

// //         // Handle the fake news response
// //         if (score <= 3) { // Fake news detected
// //             responseMessage.fake_news_alert = "Warning: This news seems to be **fake**. Here's why:";
// //             responseMessage.analysis += "\nThis news may contain misleading or false information.";
// //         }

// //         // Handle the bias warning
// //         if (analysis.bias === 'high') {
// //             responseMessage.bias_warning += "\nThis news might be biased. Please approach it critically.";
// //         }

// //         res.json(responseMessage);

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });

// // module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const axios = require('axios');
// const path = require('path');

// dotenv.config();

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route for detecting fake news
// app.post('/detect', upload.single('image'), async (req, res) => {
//     try {
//         let inputText = req.body.text || '';
        
//         if (req.file) {
//             // If an image is uploaded, extract text
//             const extractedText = await extractTextFromImage(req.file.path);
//             inputText = extractedText;
//             fs.unlinkSync(req.file.path); // Clean up uploaded file
//         }

//         if (!inputText.trim()) {
//             return res.status(400).json({ error: 'No text provided.' });
//         }

//         // Step 1: Send input to Hugging Face for analysis
//         const analysis = await analyzeClaimWithHuggingFace(inputText);

//         // Step 2: Process the result (Example: classification, sentiment, etc.)
//         const responseMessage = {
//             input_text: inputText,
//             analysis: analysis,  // Include the output from Hugging Face
//         };

//         res.json(responseMessage);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


const express = require('express');
const router = express.Router();
const { analyzeClaim } = require('../utils/analyzer');
const { searchArticles } = require('../utils/search');
const { gradeTruthfulness } = require('../utils/grader');
const { extractText } = require('../utils/ocr');

router.post('/', async (req, res) => {
  try {
    let inputText = req.body.text || '';

    if (req.file) {
      const extractedText = await extractText(req.file.path);
      inputText = extractedText;
    }

    if (!inputText.trim()) {
      return res.status(400).json({ error: 'No text provided.' });
    }

    const articles = await searchArticles(inputText);
    const analysis = await analyzeClaim(inputText, articles);
    const score = gradeTruthfulness(inputText, articles);

    res.json({
      input_text: inputText,
      truth_score: score,
      analysis: analysis.summary,
      bias_warning: analysis.bias,
      sources: analysis.sources,
      articles: articles
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
