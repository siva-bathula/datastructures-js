class SuffixTreeNode {
    constructor() {
      this.children = new Map();
      this.indexes = [];
    }
  }
  
  class SuffixTree {
    constructor() {
      this.root = new SuffixTreeNode();
    }
  
    insertSuffix(suffix, index) {
      let node = this.root;
      for (const ch of suffix) {
        if (!node.children.has(ch)) node.children.set(ch, new SuffixTreeNode());
        node = node.children.get(ch);
        node.indexes.push(index);
      }
    }
  
    build(str) {
      for (let i = 0; i < str.length; i++) {
        this.insertSuffix(str.substring(i), i);
      }
    }
  }