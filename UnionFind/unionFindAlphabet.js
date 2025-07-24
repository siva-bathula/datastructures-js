class UnionFindAlphabet {
    constructor() {
        this.parent = Array.from({ length: 26 }).map((_, i) => i);
    }

    find(index) {
        if (this.parent[index] === index) {
            return index;
        }
        this.parent[index] = this.find(this.parent[index]);
        return this.parent[index];
    }

    union(index1, index2) {
        this.parent[this.find(index1)] = this.find(index2);
    }
}