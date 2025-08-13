class SkipListNode {
    constructor(key, level) {
      this.key = key;
      this.forward = new Array(level + 1).fill(null);
    }
  }
  
  class SkipList {
    constructor(maxLevel = 4, p = 0.5) {
      this.maxLevel = maxLevel;
      this.p = p;
      this.header = new SkipListNode(null, maxLevel);
      this.level = 0;
    }
  
    randomLevel() {
      let lvl = 0;
      while (Math.random() < this.p && lvl < this.maxLevel) lvl++;
      return lvl;
    }
  
    insert(key) {
      const update = new Array(this.maxLevel + 1);
      let current = this.header;
      for (let i = this.level; i >= 0; i--) {
        while (current.forward[i] && current.forward[i].key < key) {
          current = current.forward[i];
        }
        update[i] = current;
      }
      current = current.forward[0];
      if (!current || current.key !== key) {
        const lvl = this.randomLevel();
        if (lvl > this.level) {
          for (let i = this.level + 1; i <= lvl; i++) update[i] = this.header;
          this.level = lvl;
        }
        const newNode = new SkipListNode(key, lvl);
        for (let i = 0; i <= lvl; i++) {
          newNode.forward[i] = update[i].forward[i];
          update[i].forward[i] = newNode;
        }
      }
    }
  
    search(key) {
      let current = this.header;
      for (let i = this.level; i >= 0; i--) {
        while (current.forward[i] && current.forward[i].key < key) {
          current = current.forward[i];
        }
      }
      current = current.forward[0];
      return current && current.key === key;
    }
  }