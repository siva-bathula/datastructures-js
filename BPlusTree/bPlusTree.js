class BPlusTreeNode {
    constructor(order, isLeaf = false) {
      this.order = order;
      this.isLeaf = isLeaf;
      this.keys = [];
      this.values = [];
      this.children = [];
      this.next = null; // for leaf nodes (B+ characteristic)
    }
  }
  
  class BPlusTree {
    constructor(order = 4) {
      this.root = new BPlusTreeNode(order, true);
      this.order = order;
    }
  
    // Find the leaf node where key should be
    _findLeafNode(node, key) {
      while (!node.isLeaf) {
        let idx = 0;
        while (idx < node.keys.length && key >= node.keys[idx]) idx++;
        node = node.children[idx];
      }
      return node;
    }
  
    search(key) {
      let node = this._findLeafNode(this.root, key);
      let idx = node.keys.indexOf(key);
      return idx !== -1 ? node.values[idx] : null;
    }
  
    // Insert and split as needed
    insert(key, value) {
      let node = this._findLeafNode(this.root, key);
      this._insertInLeaf(node, key, value);
      if (node.keys.length === this.order) {
        this._split(node);
      }
    }
  
    _insertInLeaf(node, key, value) {
      let idx = node.keys.findIndex(k => k > key);
      if (idx === -1) {
        node.keys.push(key);
        node.values.push(value);
      } else {
        node.keys.splice(idx, 0, key);
        node.values.splice(idx, 0, value);
      }
    }
  
    _split(node) {
      const mid = Math.floor(this.order / 2);
      let sibling = new BPlusTreeNode(node.order, node.isLeaf);
      sibling.keys = node.keys.splice(mid);
      if (node.isLeaf) {
        sibling.values = node.values.splice(mid);
        sibling.next = node.next;
        node.next = sibling;
      } else {
        sibling.children = node.children.splice(mid + 1);
      }
      let upKey = sibling.keys[0];
      if (node === this.root) {
        let newRoot = new BPlusTreeNode(node.order, false);
        newRoot.keys = [upKey];
        newRoot.children = [node, sibling];
        this.root = newRoot;
      } else {
        let parent = this._findParent(this.root, node);
        this._insertInParent(parent, upKey, sibling);
        if (parent.keys.length === node.order) this._split(parent);
      }
    }
  
    _findParent(node, child) {
      if (node.isLeaf || node.children[0].isLeaf) return null;
      for (let c of node.children) {
        if (c === child) return node;
        let parent = this._findParent(c, child);
        if (parent) return parent;
      }
      return null;
    }
  
    _insertInParent(parent, key, rightNode) {
      let idx = parent.keys.findIndex(k => k > key);
      if (idx === -1) {
        parent.keys.push(key);
        parent.children.push(rightNode);
      } else {
        parent.keys.splice(idx, 0, key);
        parent.children.splice(idx + 1, 0, rightNode);
      }
    }
  
    // In-order traverse, printing keys in order (leaf linked-list for B+)
    traverse() {
      let node = this.root;
      while (!node.isLeaf) node = node.children[0];
      while (node) {
        for (let i = 0; i < node.keys.length; i++) {
          console.log(node.keys[i], '=>', node.values[i]);
        }
        node = node.next;
      }
    }
  }