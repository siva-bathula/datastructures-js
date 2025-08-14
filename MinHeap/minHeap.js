class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(val) {
        this.heap.push(val);
        this._bubbleUp();
    }
    pop() {
        if (this.size() === 0) return null;
        this._swap(0, this.heap.length - 1);
        const val = this.heap.pop();
        this._bubbleDown();
        return val;
    }
    peek() {
        return this.heap[0] || null;
    }
    size() {
        return this.heap.length;
    }
    _bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2);
            if (this.heap[idx] >= this.heap[parent]) break;
            this._swap(idx, parent);
            idx = parent;
        }
    }
    _bubbleDown() {
        let idx = 0, len = this.heap.length;
        while (true) {
            let left = 2 * idx + 1, right = 2 * idx + 2, smallest = idx;
            if (left < len && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < len && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === idx) break;
            this._swap(idx, smallest);
            idx = smallest;
        }
    }
    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}