const express = require("express");

const {
  addWord,
  searchWord,
  suggestWords
} = require("../controllers/dictionaryController");

const router = express.Router();

router.post("/words", addWord);
router.get("/search/:word", searchWord);
router.get("/suggest", suggestWords);

module.exports = router;