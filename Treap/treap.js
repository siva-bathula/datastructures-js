class TreapNode {
    constructor(key, priority = Math.random()) {
      this.key = key;
      this.priority = priority;
      this.left = null;
      this.right = null;
    }
  }
  
  class Treap {
    rotateRight(y) {
      const x = y.left;
      y.left = x.right;
      x.right = y;
      return x;
    }
  
    rotateLeft(x) {
      const y = x.right;
      x.right = y.left;
      y.left = x;
      return y;
    }
  
    insert(root, key, priority = Math.random()) {
      if (!root) return new TreapNode(key, priority);
      if (key < root.key) {
        root.left = this.insert(root.left, key, priority);
        if (root.left.priority > root.priority) root = this.rotateRight(root);
      } else if (key > root.key) {
        root.right = this.insert(root.right, key, priority);
        if (root.right.priority > root.priority) root = this.rotateLeft(root);
      }
      return root;
    }
  
    search(root, key) {
      if (!root) return null;
      if (key === root.key) return root;
      if (key < root.key) return this.search(root.left, key);
      return this.search(root.right, key);
    }
  }