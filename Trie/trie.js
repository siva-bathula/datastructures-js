class TrieNode {
    constructor() { this.children = {}; this.isWord = false; }
  }
  class Trie {
    constructor() { this.root = new TrieNode(); }
    insert(word) {
      let node = this.root;
      for (let ch of word) {
        if (!node.children[ch]) node.children[ch] = new TrieNode();
        node = node.children[ch];
      }
      node.isWord = true;
    }
    search(word) {
      let node = this.root;
      for (let ch of word) {
        if (!node.children[ch]) return false;
        node = node.children[ch];
      }
      return node.isWord;
    }
  }