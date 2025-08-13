class FenwickTree {
    constructor(size) {
      this.n = size;
      this.tree = new Array(size + 1).fill(0); // 1-based indexing
    }
  
    // Adds value 'delta' at index 'i'
    update(i, delta) {
      while (i <= this.n) {
        this.tree[i] += delta;
        i += i & -i;
      }
    }
  
    // Returns prefix sum from 1 to i
    query(i) {
      let sum = 0;
      while (i > 0) {
        sum += this.tree[i];
        i -= i & -i;
      }
      return sum;
    }
  
    // Returns sum in range [l, r] (inclusive)
    rangeQuery(l, r) {
      return this.query(r) - this.query(l - 1);
    }
  }