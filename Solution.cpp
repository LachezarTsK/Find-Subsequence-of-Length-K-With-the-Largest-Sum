
#include <queue>
#include <vector>

using namespace std;

struct Element {
	int value, index;
	Element(int v, int i) {
		value = v;
		index = i;
	}
};
class CompareValue {
public:
	int operator() (Element& a, Element& b) {
		return a.value > b.value;
	}
};



class Solution {
public:

	//-Math.pow(10,5) <= nums[i] <= Math.pow(10,5) 
	int markAsNotApllicableValue = pow(10, 5) + 1;

	vector<int> maxSubsequence(vector<int>& nums, int k) {

		int size = nums.size();
		if (k == size || size == 1) {
			return nums;
		}

		priority_queue<Element, vector<Element>, CompareValue> minHeap;
		for (int i = 0; i < k; i++) {
			minHeap.push(Element(nums[i], i));
		}

		for (int i = k; i < size; i++) {
			if (nums[i] > minHeap.top().value) {
				nums[minHeap.top().index] = markAsNotApllicableValue;
				minHeap.push(Element(nums[i], i));
				minHeap.pop();
			}
			else {
				nums[i] = markAsNotApllicableValue;
			}
		}

		return fillArray_subsequenceWithLargestSum(nums, k, size);
	}

	vector<int> fillArray_subsequenceWithLargestSum(vector<int>& nums, const int k, int size) {

		vector<int> subsequenceWithLargestSum;
		int index_k = 0;

		for (int i = 0; i < size; i++) {
			if (nums[i] != markAsNotApllicableValue) {
				subsequenceWithLargestSum.push_back(nums[i]);
				if (++index_k == k) {
					break;
				}
			}
		}
		return subsequenceWithLargestSum;
	}
};
