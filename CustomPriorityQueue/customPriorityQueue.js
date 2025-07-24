class CustomPriorityQueue {
    constructor(compareFunction) {
        this.compare = compareFunction;
        this.data = [];
    }

    leftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    rightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    parentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    hasLeftChild(index) {
        return this.leftChildIndex(index) < this.data.length;
    }

    hasRightChild(index) {
        return this.rightChildIndex(index) < this.data.length;
    }

    hasParent(index) {
        return this.parentIndex(index) >= 0;
    }

    leftChild(index) {
        return this.data[this.leftChildIndex(index)];
    }

    rightChild(index) {
        return this.data[this.rightChildIndex(index)];
    }

    parent(index) {
        return this.data[this.parentIndex(index)];
    }

    swap(indexOne, indexTwo) {
        let temp = this.data[indexOne];
        this.data[indexOne] = this.data[indexTwo];
        this.data[indexTwo] = temp;
    }

    heapifyUp() {
        let index = this.data.length - 1;
        while (this.hasParent(index) && this.compare(this.parent(index), this.data[index]) > 0) {
            this.swap(this.parentIndex(index), index);
            index = this.parentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.leftChildIndex(index);
            if (this.hasRightChild(index) && this.compare(this.rightChild(index), this.leftChild(index)) < 0) {
                smallerChildIndex = this.rightChildIndex(index);
            }

            if (this.compare(this.data[index], this.data[smallerChildIndex]) < 0) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }

    isEmpty() {
        return this.data.length === 0;
    }

    peek() {
        if (this.data.length === 0) return undefined;
        return this.data[0];
    }

    push(value) {
        this.data.push(value);
        this.heapifyUp();
    }

    pop() {
        if (this.data.length === 0) return undefined;
        if (this.data.length === 1) return this.data.pop();

        const item = this.data[0];
        this.data[0] = this.data.pop();
        this.heapifyDown();
        return item;
    }

    size() {
        return this.data.length;
    }
}