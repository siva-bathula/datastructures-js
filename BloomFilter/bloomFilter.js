class BloomFilter {
    constructor(size = 100) {
      this.bits = new Array(size).fill(0);
      this.size = size;
    }
    _hashes(item) {
      let hash1 = item.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % this.size;
      let hash2 = item.split('').reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % this.size;
      return [hash1, hash2];
    }
    add(item) {
      for (let h of this._hashes(item)) this.bits[h] = 1;
    }
    contains(item) {
      return this._hashes(item).every(h => this.bits[h] === 1);
    }
  }

  class BloomFilter2 {
    constructor(size = 1000) {
      this.size = size;
      this.bits = new Array(size).fill(0);
    }
  
    _hashes(item) {
      let hash1 = 5381;
      let hash2 = 0;
      for (let i = 0; i < item.length; i++) {
        hash1 = ((hash1 << 5) + hash1) + item.charCodeAt(i);
        hash2 = (hash2 << 3) ^ item.charCodeAt(i);
      }
      return [Math.abs(hash1) % this.size, Math.abs(hash2) % this.size];
    }
  
    add(item) {
      for (const h of this._hashes(item)) this.bits[h] = 1;
    }
  
    contains(item) {
      return this._hashes(item).every(h => this.bits[h] === 1);
    }
  }