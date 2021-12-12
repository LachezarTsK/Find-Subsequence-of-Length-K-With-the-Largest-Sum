
import java.util.PriorityQueue;

class Solution {

    //-Math.pow(10,5) <= nums[i] <= Math.pow(10,5) 
    int markAsNotApllicableValue = (int) Math.pow(10, 5) + 1;

    public int[] maxSubsequence(int[] nums, int k) {

        int size = nums.length;
        if (k == size || size == 1) {
            return nums;
        }

        //Data in 'minHeap': new int[] {value, index}
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((x, y) -> x[0] - y[0]);
        for (int i = 0; i < k; i++) {
            minHeap.add(new int[]{nums[i], i});
        }

        for (int i = k; i < size; i++) {
            if (nums[i] > minHeap.peek()[0]) {
                nums[minHeap.poll()[1]] = markAsNotApllicableValue;
                minHeap.add(new int[]{nums[i], i});
            } else {
                nums[i] = markAsNotApllicableValue;
            }
        }

        return fillArray_subsequenceWithLargestSum(nums, k, size);
    }

    public int[] fillArray_subsequenceWithLargestSum(int[] nums, int k, int size) {

        int[] subsequenceWithLargestSum = new int[k];
        int index_k = 0;

        for (int i = 0; i < size; i++) {
            if (nums[i] != markAsNotApllicableValue) {
                subsequenceWithLargestSum[index_k] = nums[i];
                if (++index_k == k) {
                    break;
                }
            }
        }
        return subsequenceWithLargestSum;
    }
}
