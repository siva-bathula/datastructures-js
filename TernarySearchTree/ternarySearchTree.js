class TSTNode {
    constructor(char) {
      this.char = char;
      this.left = null;
      this.eq = null;
      this.right = null;
      this.isEnd = false;
    }
  }
  
  class TernarySearchTree {
    constructor() {
      this.root = null;
    }
  
    insert(word) {
      this.root = this._insert(this.root, word, 0);
    }
  
    _insert(node, word, index) {
      const char = word[index];
      if (!node) node = new TSTNode(char);
  
      if (char < node.char) node.left = this._insert(node.left, word, index);
      else if (char > node.char) node.right = this._insert(node.right, word, index);
      else {
        if (index + 1 === word.length) node.isEnd = true;
        else node.eq = this._insert(node.eq, word, index + 1);
      }
      return node;
    }
  
    search(word) {
      return this._search(this.root, word, 0);
    }
  
    _search(node, word, index) {
      if (!node) return false;
      const char = word[index];
      if (char < node.char) return this._search(node.left, word, index);
      else if (char > node.char) return this._search(node.right, word, index);
      else {
        if (index === word.length - 1) return node.isEnd;
        return this._search(node.eq, word, index + 1);
      }
    }
  }