const dictionaryService = require("../services/dictionaryService");
/*
Controller layer:
 Handles request validation and delegates
 business logic to the service layer.
 */
const addWord = (req, res) => {
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({
      success: false,
      message: "Word is required"
    });
  }

  const result = dictionaryService.addWord(word);

  return res.json(result);
};

const searchWord = (req, res) => {
  const result = dictionaryService.searchWord(req.params.word);

  return res.json(result);
};

const suggestWords = (req, res) => {
  const { prefix, k } = req.query;

  if (!prefix) {
    return res.status(400).json({
      success: false,
      message: "Prefix is required"
    });
  }

  const suggestions =
    dictionaryService.suggestWords(prefix, parseInt(k) || 5);

  return res.json({
    suggestions
  });
};

module.exports = {
  addWord,
  searchWord,
  suggestWords
};