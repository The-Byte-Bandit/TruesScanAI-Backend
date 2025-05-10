const stringSimilarity = require('string-similarity'); // Import string-similarity

function gradeTruthfulness(claim, articles) {
  if (!articles.length) return 1;

  const similarities = articles.map(article => {
    const ratio = stringSimilarity.compareTwoStrings(claim.toLowerCase(), article.snippet.toLowerCase());
    return ratio;
  });

  const avg = similarities.reduce((acc, cur) => acc + cur, 0) / similarities.length;
  const grade = Math.min(10, Math.max(1, Math.round(avg * 10)));

  return grade;
}

module.exports = { gradeTruthfulness };
