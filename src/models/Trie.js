const TrieNode = require("./TrieNode");

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }

      node = node.children[char];
    }

    node.isEnd = true;
  }

  search(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) {
        return false;
      }

      node = node.children[char];
    }

    return node.isEnd;
  }

  getWordsWithPrefix(prefix) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children[char]) {
        return [];
      }

      node = node.children[char];
    }

    const words = [];
/*
 * DFS traversal collects all words
 * that share the requested prefix.
 */
    const dfs = (currentNode, currentWord) => {
      if (currentNode.isEnd) {
        words.push(currentWord);
      }

      for (const char in currentNode.children) {
        dfs(currentNode.children[char], currentWord + char);
      }
    };

    dfs(node, prefix);

    return words;
  }
}

module.exports = Trie;