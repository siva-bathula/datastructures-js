class ScapegoatNode {
    constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
    }
  }
  
  class ScapegoatTree {
    constructor(alpha = 0.57) {
      this.root = null;
      this.size = 0;
      this.maxSize = 0;
      this.alpha = alpha; // Balance parameter
    }
  
    _size(node) {
      if (!node) return 0;
      return 1 + this._size(node.left) + this._size(node.right);
    }
  
    _flatten(node, arr) {
      if (!node) return;
      this._flatten(node.left, arr);
      arr.push(node);
      this._flatten(node.right, arr);
    }
  
    _buildBalanced(arr, start, end) {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = arr[mid];
      node.left = this._buildBalanced(arr, start, mid - 1);
      node.right = this._buildBalanced(arr, mid + 1, end);
      return node;
    }
  
    _rebuild(nodeRef) {
      const nodes = [];
      this._flatten(nodeRef.node, nodes);
      nodeRef.node = this._buildBalanced(nodes, 0, nodes.length - 1);
    }
  
    _insert(node, key, path = []) {
      if (!node) return new ScapegoatNode(key);
      path.push(node);
      if (key < node.key) node.left = this._insert(node.left, key, path);
      else node.right = this._insert(node.right, key, path);
      return node;
    }
  
    insert(key) {
      const path = [];
      this.root = this._insert(this.root, key, path);
      this.size++;
      this.maxSize = Math.max(this.size, this.maxSize);
  
      for (let i = path.length - 1; i >= 0; i--) {
        const node = path[i];
        const leftSize = this._size(node.left);
        const rightSize = this._size(node.right);
        const nodeSize = leftSize + rightSize + 1;
  
        if (leftSize > this.alpha * nodeSize || rightSize > this.alpha * nodeSize) {
          // Rebuild unbalanced subtree
          let parent = i > 0 ? path[i - 1] : null;
          const nodeRef = { node };
          this._rebuild(nodeRef);
          if (!parent) this.root = nodeRef.node;
          else if (parent.left === node) parent.left = nodeRef.node;
          else parent.right = nodeRef.node;
          break;
        }
      }
    }
  }
