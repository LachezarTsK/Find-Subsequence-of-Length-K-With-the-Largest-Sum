
class MinHeap {
    constructor() {
        this.list = [];
    }
    comparatorValue(index) {
        return  this.list[index][0];
    }
    minHeapify(index) {
        let min = index;
        let index_leftSubNode = 2 * index + 1;
        let index_rightSubNode = 2 * index + 2;

        if (index_leftSubNode < this.list.length && this.comparatorValue(min) > this.comparatorValue(index_leftSubNode)) {
            min = index_leftSubNode;
        }
        if (index_rightSubNode < this.list.length && this.comparatorValue(min) > this.comparatorValue(index_rightSubNode)) {
            min = index_rightSubNode;
        }
        if (min !== index) {
            let temp = this.list[index];
            this.list[index] = this.list[min];
            this.list[min] = temp;
            this.minHeapify(min);
        }

    }

    push(value) {

        if (this.size === 0) {
            this.list[0] = value;
        } else {
            this.list[this.list.length] = value;
            for (let i = Math.floor((this.list.length - 1) / 2); i >= 0; i--) {
                this.minHeapify(i);
            }
        }
    }

    pop() {
        let top = this.list[0];
        this.list[0] = this.list[this.list.length - 1];
        this.list.length--;
        for (let i = Math.floor((this.list.length - 1) / 2); i >= 0; i--) {
            this.minHeapify(i);
        }
        return top;
    }

    peek() {
        return this.list[0];
    }
}


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var maxSubsequence = function (nums, k) {

    //-Math.pow(10,5) <= nums[i] <= Math.pow(10,5) 
    let markAsNotApllicableValue = Math.pow(10, 5) + 1;

    let size = nums.length;
    if (k === size || size === 1) {
        return nums;
    }

    //Data in 'minHeap': [value, index]
    const minHeap = new MinHeap();
    for (let i = 0; i < k; i++) {
        minHeap.push([nums[i], i]);
    }

    for (let i = k; i < size; i++) {
        if (nums[i] > minHeap.peek()[0]) {
            nums[minHeap.pop()[1]] = markAsNotApllicableValue;
            minHeap.push([nums[i], i]);
        } else {
            nums[i] = markAsNotApllicableValue;
        }
    }

    return fillArray_subsequenceWithLargestSum(nums, k, size, markAsNotApllicableValue);

};


function fillArray_subsequenceWithLargestSum(nums, k, size, markAsNotApllicableValue) {

    const subsequenceWithLargestSum = [];
    let index_k = 0;

    for (let i = 0; i < size; i++) {
        if (nums[i] !== markAsNotApllicableValue) {
            subsequenceWithLargestSum[index_k] = nums[i];
            if (++index_k === k) {
                break;
            }
        }
    }
    return subsequenceWithLargestSum;
}
