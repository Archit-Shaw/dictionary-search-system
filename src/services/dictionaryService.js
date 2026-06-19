const Trie = require("../models/Trie");
const seedWords = require("../data/seedWords");
/*
 * Trie handles efficient prefix-based lookups.
 * Map stores word frequencies for O(1) access.
 */
const trie = new Trie();
const frequencyMap = new Map();

seedWords.forEach(word => {
  trie.insert(word);
  frequencyMap.set(word, 1);
});

const normalize = word => word.trim().toLowerCase();

const addWord = word => {
  word = normalize(word);

  if (frequencyMap.has(word)) {
    return { message: "already exists" };
  }

  trie.insert(word);
  frequencyMap.set(word, 1);

return {
    message: "Word added successfully",
    word,
    frequency: 1
};
};
/*
 * Frequency is incremented only when a word is searched.
 * Adding a word does not affect its frequency.
 */
const searchWord = (word) => {

    word = normalize(word);

    if (!frequencyMap.has(word)) {
        return {
            status: "NOT FOUND"
        };
    }

    frequencyMap.set(
        word,
        frequencyMap.get(word) + 1
    );

    return {
        status: "FOUND",
        frequency: frequencyMap.get(word)
    };
};

const suggestWords = (prefix, k) => {
  prefix = normalize(prefix);

  const matches = trie.getWordsWithPrefix(prefix);
/*
 * Suggestions are sorted by:
 * 1. Higher frequency first
 * 2. Lexicographical order for equal frequencies
 */
  return matches
    .map(word => ({
      word,
      frequency: frequencyMap.get(word)
    }))
    .sort((a, b) => {
      if (b.frequency !== a.frequency) {
        return b.frequency - a.frequency;
      }

      return a.word.localeCompare(b.word);
    })
    .slice(0, k)
    // .map(item => item.word);
};

module.exports = {
  addWord,
  searchWord,
  suggestWords
};