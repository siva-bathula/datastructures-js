class SplayNode {
    constructor(key) { this.key = key; this.left = null; this.right = null; }
  }
  
  class SplayTree {
    rightRotate(x) { let y = x.left; x.left = y.right; y.right = x; return y; }
    leftRotate(x) { let y = x.right; x.right = y.left; y.left = x; return y; }
  
    splay(root, key) {
      if (!root || root.key === key) return root;
      if (key < root.key) {
        if (!root.left) return root;
        if (key < root.left.key) {
          root.left.left = this.splay(root.left.left, key);
          root = this.rightRotate(root);
        } else if (key > root.left.key) {
          root.left.right = this.splay(root.left.right, key);
          if (root.left.right) root.left = this.leftRotate(root.left);
        }
        return root.left ? this.rightRotate(root) : root;
      } else {
        if (!root.right) return root;
        if (key > root.right.key) {
          root.right.right = this.splay(root.right.right, key);
          root = this.leftRotate(root);
        } else if (key < root.right.key) {
          root.right.left = this.splay(root.right.left, key);
          if (root.right.left) root.right = this.rightRotate(root.right);
        }
        return root.right ? this.leftRotate(root) : root;
      }
    }
  
    insert(root, key) {
      if (!root) return new SplayNode(key);
      root = this.splay(root, key);
      if (root.key === key) return root;
      let node = new SplayNode(key);
      if (key < root.key) { node.right = root; node.left = root.left; root.left = null; }
      else { node.left = root; node.right = root.right; root.right = null; }
      return node;
    }
  }