class SegmentTree {
    constructor(arr) {
      this.n = arr.length;
      this.tree = Array(this.n * 2).fill(0);
      for (let i = 0; i < this.n; i++) this.tree[this.n + i] = arr[i];
      for (let i = this.n - 1; i > 0; --i) this.tree[i] = this.tree[i << 1] + this.tree[i << 1 | 1];
    }
    update(index, value) {
      let i = index + this.n;
      this.tree[i] = value;
      while (i > 1) {
        i >>= 1;
        this.tree[i] = this.tree[i << 1] + this.tree[i << 1 | 1];
      }
    }
    query(l, r) { // [l, r)
      l += this.n; r += this.n;
      let res = 0;
      while (l < r) {
        if (l & 1) res += this.tree[l++];
        if (r & 1) res += this.tree[--r];
        l >>= 1; r >>= 1;
      }
      return res;
    }
  }