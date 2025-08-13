class BTreeNode {
    constructor(t, leaf = false) {
      this.t = t;            // Minimum degree (defines range for keys)
      this.leaf = leaf;      // Is true when node is leaf
      this.keys = [];        // Keys in node
      this.children = [];    // Child pointers
    }
  
    // Traverse all keys in the subtree rooted with this node
    traverse() {
      let i;
      for (i = 0; i < this.keys.length; i++) {
        // If this is not leaf, before printing key[i], traverse the subtree rooted at child children[i].
        if (!this.leaf) this.children[i].traverse();
        console.log(this.keys[i]);
      }
      // Print the subtree rooted with last child
      if (!this.leaf) this.children[i].traverse();
    }
  
    // Search a key k in the subtree rooted with this node
    search(k) {
      let i = 0;
      while (i < this.keys.length && k > this.keys[i]) i++;
      if (i < this.keys.length && this.keys[i] === k) return this;
      if (this.leaf) return null;
      return this.children[i].search(k);
    }
  
    // Insert a new key in this node assuming it is not full
    insertNonFull(k) {
      let i = this.keys.length - 1;
      if (this.leaf) {
        // If leaf, insert key in correct position
        while (i >= 0 && this.keys[i] > k) {
          this.keys[i + 1] = this.keys[i];
          i--;
        }
        this.keys[i + 1] = k;
      } else {
        // Find child to recurse into
        while (i >= 0 && this.keys[i] > k) i--;
        i++;
        // If the child is full, split it first
        if (this.children[i].keys.length === 2 * this.t - 1) {
          this.splitChild(i, this.children[i]);
          if (this.keys[i] < k) i++;
        }
        this.children[i].insertNonFull(k);
      }
    }
  
    // Split the child y of this node at index i
    splitChild(i, y) {
      const t = this.t;
      const z = new BTreeNode(t, y.leaf);
      // Give z the last t-1 keys of y
      for (let j = 0; j < t - 1; j++) {
        z.keys[j] = y.keys[j + t];
      }
      // If y is not leaf, give z last t children
      if (!y.leaf) {
        for (let j = 0; j < t; j++) {
          z.children[j] = y.children[j + t];
        }
      }
  
      // Reduce key count of y
      y.keys.length = t - 1;
      y.children.length = y.leaf ? y.children.length : t;
  
      // Insert z as a child of this node
      this.children.splice(i + 1, 0, z);
      // Move middle key of y up to this node
      this.keys.splice(i, 0, y.keys[t - 1]);
      y.keys.length = t - 1;
    }
  }
  
  class BTree {
    constructor(t) {
      this.t = t;
      this.root = null;
    }
  
    traverse() {
      if (this.root !== null) this.root.traverse();
    }
  
    search(k) {
      return this.root === null ? null : this.root.search(k);
    }
  
    insert(k) {
      if (this.root === null) {
        this.root = new BTreeNode(this.t, true);
        this.root.keys[0] = k;
      } else {
        if (this.root.keys.length === 2 * this.t - 1) {
          const s = new BTreeNode(this.t, false);
          s.children[0] = this.root;
          s.splitChild(0, this.root);
  
          let i = 0;
          if (s.keys[0] < k) i++;
          s.children[i].insertNonFull(k);
  
          this.root = s;
        } else {
          this.root.insertNonFull(k);
        }
      }
    }
  }