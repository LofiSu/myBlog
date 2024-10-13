“三数之和”问题要求在一个数组中找到三个数，使得它们的和为零，并返回所有符合条件的三元组。每个三元组中的数字应按非降序排列，解集中不能包含重复的三元组。

可以使用双指针法来解决这个问题。手写实现如下：

```javascript
function threeSum(nums) {
    const result = [];
    nums.sort((a, b) => a - b); // 先对数组进行排序

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复元素

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++; // 跳过重复元素
                while (left < right && nums[right] === nums[right - 1]) right--; // 跳过重复元素
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

// 示例使用
const nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums)); // 输出: [[-1, -1, 2], [-1, 0, 1]]
```

### 代码解析：
1. **排序**：首先对数组进行升序排序，以便于后续使用双指针。
2. **遍历数组**：固定一个元素 `nums[i]`，然后使用双指针 `left` 和 `right` 来寻找另外两个元素，使得三个元素的和为零。
3. **去重处理**：为了避免重复的三元组，在遇到相同的元素时（对于 `nums[i]`、`nums[left]` 和 `nums[right]`），需要跳过这些重复的元素。
4. **双指针移动**：根据当前三个元素的和来移动指针，如果和为零，则找到一个解。如果和小于零，说明需要增大和值，因此移动 `left` 向右。如果和大于零，说明需要减小和值，因此移动 `right` 向左。

这样就能高效地解决“三数之和”问题，并且确保不会有重复的三元组出现在结果中。