class UnionFind {
    constructor(size) {
      this.root = Array.from({ length: size }, (_, i) => i);
      this.rank = Array(size).fill(1);
    }
    find(x) {
      if (this.root[x] !== x) {
        this.root[x] = this.find(this.root[x]);
      }
      return this.root[x];
    }
    union(x, y) {
      let rootX = this.find(x);
      let rootY = this.find(y);
      if (rootX !== rootY) {
        if (this.rank[rootX] < this.rank[rootY]) {
          this.root[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
          this.root[rootY] = rootX;
        } else {
          this.root[rootY] = rootX;
          this.rank[rootX] += 1;
        }
      }
    }
  }