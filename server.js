// const express = require('express');
// const multer = require('multer');
// const dotenv = require('dotenv');
// const path = require('path');

// const detectRoute = require('./routes/detect');

// dotenv.config();
// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Route
// app.use('/detect', upload.single('image'), detectRoute);

// app.get('/', (req, res) => {
//   res.send({ message: 'Fake News Detector API is running 🚀' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




// const express = require('express');
// const multer = require('multer');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const { analyzeClaimWithHuggingFace } = require('./utils/analyzeClaim');
// const { extractTextFromImage } = require('./utils/extractText');

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
//             const extractedText = await extractTextFromImage(req.file.path);
//             inputText = extractedText;
//             fs.unlinkSync(req.file.path); // Clean up uploaded file
//         }

//         if (!inputText.trim()) {
//             return res.status(400).json({ error: 'No text provided.' });
//         }

//         // Step 1: Send input to Hugging Face for analysis
//         const analysis = await analyzeClaimWithHuggingFace(inputText);

//         // Step 2: Process the result
//         const responseMessage = {
//             input_text: inputText,
//             analysis: analysis,
//         };

//         res.json(responseMessage);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Route for basic health check
// app.get('/', (req, res) => {
//     res.send({ message: 'Fake News Detector API is running 🚀' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const express = require('express');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const detectRoute = require('./routes/detect');

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

// Use CORS to allow cross-origin requests
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure that `detectRoute` is a valid route handler.
app.use('/detect', upload.single('image'), detectRoute);

app.get('/', (req, res) => {
  res.send({ message: 'Fake News Detector API is running 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
