const RED = 0, BLACK = 1;
class RBNode {
  constructor(key) {
    this.key = key;
    this.color = RED;
    this.left = this.right = this.parent = null;
  }
}

class RBTree {
  constructor() { this.root = null; }

  rotateLeft(x) {
    let y = x.right;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y; else x.parent.right = y;
    y.left = x; x.parent = y;
  }

  rotateRight(y) {
    let x = y.left;
    y.left = x.right;
    if (x.right) x.right.parent = y;
    x.parent = y.parent;
    if (!y.parent) this.root = x;
    else if (y === y.parent.left) y.parent.left = x; else y.parent.right = x;
    x.right = y; y.parent = x;
  }

  insert(key) {
    let node = new RBNode(key), y = null, x = this.root;
    while (x) { y = x; x = node.key < x.key ? x.left : x.right; }
    node.parent = y;
    if (!y) this.root = node;
    else if (node.key < y.key) y.left = node; else y.right = node;

    this.fixInsert(node);
  }

  fixInsert(k) {
    while (k.parent && k.parent.color === RED) {
      if (k.parent === k.parent.parent.left) {
        let u = k.parent.parent.right;
        if (u && u.color === RED) {
          k.parent.color = BLACK; u.color = BLACK; k.parent.parent.color = RED; k = k.parent.parent;
        } else {
          if (k === k.parent.right) { k = k.parent; this.rotateLeft(k); }
          k.parent.color = BLACK; k.parent.parent.color = RED; this.rotateRight(k.parent.parent);
        }
      } else {
        let u = k.parent.parent.left;
        if (u && u.color === RED) {
          k.parent.color = BLACK; u.color = BLACK; k.parent.parent.color = RED; k = k.parent.parent;
        } else {
          if (k === k.parent.left) { k = k.parent; this.rotateRight(k); }
          k.parent.color = BLACK; k.parent.parent.color = RED; this.rotateLeft(k.parent.parent);
        }
      }
    }
    this.root.color = BLACK;
  }
}