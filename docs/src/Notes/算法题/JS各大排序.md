## 冒泡排序
```js
Array.prototype._bubbleSort = function () {
  for (let i = 0; i < this.length - 1; ++i) {
    for (let j = 0; j < this.length - 1 - i; ++j) {
      if (this[j] > this[j + i])
        [this[j], this[j + i]] = [this[j + i], this[j]];
    }
  }
};
```

## 归并排序
```js
Array.prototype._mergeSort = function () {
  const helper = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2),
      leftArr = arr.slice(0, mid),
      rightArr = arr.slice(mid);
    const leftOrder = helper(leftArr),
      rightOrder = helper(rightArr);
    const res = [];
    while (leftOrder.length || rightOrder.length) {
      if (leftOrder.length && rightOrder.length)
        res.push(
          leftOrder[0] < rightOrder[0] ? leftOrder.shift() : rightOrder.shift()
        );
      else res.push(leftOrder.length ? leftOrder.shift() : rightOrder.shift());
    }
    return res;
  };
  const sorted = helper(this);
  this.length = 0;
  this.push(...sorted);
  return this;
};
const arr = [8, 7, 6, 5, 4, 3, 2, 1];
console.log(arr._mergeSort());
```

## 快速排序
```js
Array.prototype._quickSort = function () {
  const helper = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [],
      right = [];
    for (let i = 0; i < arr.length - 1; ++i) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
    return [...helper(left), pivot, ...helper(right)];
  };
  const res = helper(this);
  for (let i = 0; i < res.length; ++i) this[i] = res[i];
};
```

- 时间复杂度：最好/平均情况 -> O(n log n) 即递归深度 log(n) \* 各层分割 O(n) ，最坏情况 -> O(n²) + 选取基准为最小或最大元素
* 空间复杂度：最好/平均情况 -> O(n log n) 即递归深度 log(n) \* 各层空间 O(n)，最坏情况 -> O(n²)


## 插入排序

```js
Array.prototype._insertSort = function () {
  for (let i = 1; i < this.length; ++i) {
    let temp = this[i];
    let j = i - 1;
    while (j >= 0 && this[j] > temp) {
      this[j + 1] = this[j];
      --j;
    }
    this[j + 1] = temp;
  }
};
```


## 树的dfs和bfs
```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
  addChild(child) {
    this.children.add(child);
  }
}

const dfs = (node) => {
  if (!node) return;
  console.log(node);
  for (const child of node.children) dfs(child);
};

const bfs = (node) => {
  if (!node) return;
  const queue = [node];
  while (queue.length) {
    const cur = queue.shift();
    console.log(cur);
    for (const child of cur.children) queue.push(child);
  }
};
```