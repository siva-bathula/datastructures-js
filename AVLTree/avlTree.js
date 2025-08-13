class AVLNode {
    constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
      this.height = 1;
    }
  }
  
  class AVLTree {
    getHeight(node) { return node ? node.height : 0; }
    getBalance(node) { return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0; }
  
    rightRotate(y) {
      let x = y.left, T2 = x.right;
      x.right = y; y.left = T2;
      y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
      x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
      return x;
    }
  
    leftRotate(x) {
      let y = x.right, T2 = y.left;
      y.left = x; x.right = T2;
      x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
      y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
      return y;
    }
  
    insert(node, key) {
      if (!node) return new AVLNode(key);
      if (key < node.key) node.left = this.insert(node.left, key);
      else if (key > node.key) node.right = this.insert(node.right, key);
      else return node;
  
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
      let balance = this.getBalance(node);
  
      if (balance > 1 && key < node.left.key) return this.rightRotate(node);
      if (balance < -1 && key > node.right.key) return this.leftRotate(node);
      if (balance > 1 && key > node.left.key) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
      if (balance < -1 && key < node.right.key) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
      return node;
    }
  }