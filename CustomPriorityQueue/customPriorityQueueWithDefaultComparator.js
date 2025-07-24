class CustomPriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }

    size() {
        return this._heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    peek() {
        return this._heap[0];
    }

    push(...values) {
        for (let value of values) {
            this._heap.push(value);
            this._siftUp();
        }
    }

    pop() {
        const poppedValue = this._heap[0];
        const bottom = this.size() - 1;
        if (bottom > 0) {
            this._swap(0, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }

    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }

    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    _siftUp() {
        let node = this.size() - 1;
        while (node > 0 && this._greater(Math.floor((node - 1) / 2), node)) {
            this._swap(node, Math.floor((node - 1) / 2));
            node = Math.floor((node - 1) / 2);
        }
    }

    _siftDown() {
        let node = 0;
        while (
            (2 * node + 1 < this.size() && this._greater(node, 2 * node + 1)) ||
            (2 * node + 2 < this.size() && this._greater(node, 2 * node + 2))
        ) {
            let maxChild = 2 * node + 1;
            if (
                2 * node + 2 < this.size() &&
                this._greater(2 * node + 1, 2 * node + 2)
            ) {
                maxChild = 2 * node + 2;
            }
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}