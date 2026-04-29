import { Post, Tag } from "./types";

// Danh sách tag mẫu về CTDL & Giải thuật
export const defaultTags: Tag[] = [
  { id: "t1", name: "Array" },
  { id: "t2", name: "Linked List" },
  { id: "t3", name: "Stack" },
  { id: "t4", name: "Queue" },
  { id: "t5", name: "Tree" },
  { id: "t6", name: "Graph" },
  { id: "t7", name: "Sorting" },
  { id: "t8", name: "Searching" },
  { id: "t9", name: "Dynamic Programming" },
  { id: "t10", name: "Recursion" },
  { id: "t11", name: "Hash Table" },
  { id: "t12", name: "Heap" },
];

// Danh sách bài viết mẫu
export const defaultPosts: Post[] = [
  {
    id: "p1",
    title: "Array - Mảng: Cấu trúc dữ liệu cơ bản nhất",
    slug: "array-mang-co-ban",
    summary:
      "Tìm hiểu về mảng - cấu trúc dữ liệu đơn giản nhất nhưng cực kỳ quan trọng trong lập trình. Cách khai báo, truy cập và các thao tác phổ biến trên mảng.",
    content: `# Array - Mảng

## Mảng là gì?

Mảng (Array) là cấu trúc dữ liệu lưu trữ các phần tử có **cùng kiểu dữ liệu** tại các vị trí bộ nhớ liên tiếp nhau.

## Đặc điểm

- Truy cập phần tử theo **chỉ số (index)** bắt đầu từ 0
- Kích thước **cố định** (với mảng tĩnh)
- Truy cập ngẫu nhiên với độ phức tạp **O(1)**

## Ví dụ trong TypeScript

\`\`\`typescript
// Khai báo mảng
const arr: number[] = [1, 2, 3, 4, 5];

// Truy cập phần tử
console.log(arr[0]); // 1
console.log(arr[4]); // 5

// Duyệt mảng
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// Duyệt bằng for...of
for (const item of arr) {
  console.log(item);
}
\`\`\`

## Độ phức tạp thời gian

| Thao tác | Độ phức tạp |
|----------|------------|
| Truy cập | O(1) |
| Tìm kiếm | O(n) |
| Chèn đầu | O(n) |
| Chèn cuối | O(1) |
| Xóa đầu  | O(n) |
| Xóa cuối  | O(1) |

## Các bài toán phổ biến

1. **Tìm phần tử lớn nhất / nhỏ nhất**
2. **Đảo ngược mảng**
3. **Tìm tổng mảng con lớn nhất (Kadane's Algorithm)**

\`\`\`typescript
// Tìm phần tử lớn nhất
function findMax(arr: number[]): number {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// Đảo ngược mảng
function reverse(arr: number[]): number[] {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}
\`\`\`

## Kết luận

Mảng là nền tảng của hầu hết các cấu trúc dữ liệu khác. Hãy nắm vững thao tác trên mảng trước khi học các cấu trúc phức tạp hơn.
`,
    tags: ["t1"],
    status: "published",
    views: 142,
    createdAt: "2024-01-10T08:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p2",
    title: "Linked List - Danh sách liên kết đơn",
    slug: "linked-list-danh-sach-lien-ket-don",
    summary:
      "Danh sách liên kết đơn là gì? Cách xây dựng và thao tác: thêm, xóa, tìm kiếm node trên danh sách liên kết đơn bằng TypeScript.",
    content: `# Linked List - Danh sách liên kết đơn

## Định nghĩa

Danh sách liên kết đơn (Singly Linked List) là cấu trúc dữ liệu gồm các **node** liên kết với nhau. Mỗi node chứa:
- **data**: giá trị lưu trữ
- **next**: con trỏ trỏ đến node tiếp theo

## Ưu và nhược điểm

**Ưu điểm:**
- Chèn/xóa đầu danh sách: O(1)
- Kích thước động, không cần khai báo trước

**Nhược điểm:**
- Truy cập ngẫu nhiên: O(n)
- Tốn thêm bộ nhớ cho con trỏ next

## Cài đặt bằng TypeScript

\`\`\`typescript
class Node {
  data: number;
  next: Node | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head: Node | null;

  constructor() {
    this.head = null;
  }

  // Thêm vào đầu
  addFirst(data: number) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Thêm vào cuối
  addLast(data: number) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Xóa node đầu
  removeFirst() {
    if (!this.head) return;
    this.head = this.head.next;
  }

  // In danh sách
  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}
\`\`\`

## Độ phức tạp

| Thao tác | Độ phức tạp |
|----------|------------|
| Thêm đầu | O(1) |
| Thêm cuối | O(n) |
| Xóa đầu | O(1) |
| Tìm kiếm | O(n) |
`,
    tags: ["t2"],
    status: "published",
    views: 98,
    createdAt: "2024-01-15T09:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p3",
    title: "Stack - Ngăn xếp và ứng dụng",
    slug: "stack-ngan-xep",
    summary:
      "Tìm hiểu Stack (ngăn xếp) - cấu trúc dữ liệu LIFO. Cài đặt Stack bằng mảng và danh sách liên kết, cùng các ứng dụng thực tế.",
    content: `# Stack - Ngăn xếp

## Stack là gì?

Stack (Ngăn xếp) là cấu trúc dữ liệu hoạt động theo nguyên tắc **LIFO** (Last In - First Out): phần tử vào sau sẽ ra trước.

Hãy tưởng tượng chồng đĩa: bạn luôn lấy đĩa trên cùng trước.

## Các thao tác cơ bản

- **push(x)**: Thêm phần tử x vào đỉnh stack
- **pop()**: Lấy và xóa phần tử ở đỉnh stack
- **peek()**: Xem phần tử đỉnh stack (không xóa)
- **isEmpty()**: Kiểm tra stack rỗng

## Cài đặt Stack bằng mảng

\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Sử dụng
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.pop());  // 3
console.log(stack.pop());  // 2
\`\`\`

## Ứng dụng thực tế

1. **Kiểm tra dấu ngoặc hợp lệ**

\`\`\`typescript
function isValidBracket(s: string): boolean {
  const stack = new Stack<string>();
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else {
      if (stack.isEmpty() || stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  return stack.isEmpty();
}

console.log(isValidBracket("()[]{}")); // true
console.log(isValidBracket("(]"));    // false
\`\`\`

2. **Chuyển đổi số sang nhị phân**
3. **Duyệt cây theo chiều sâu (DFS)**
4. **Undo/Redo trong editor**
`,
    tags: ["t3"],
    status: "published",
    views: 210,
    createdAt: "2024-01-20T10:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p4",
    title: "Queue - Hàng đợi và các biến thể",
    slug: "queue-hang-doi",
    summary:
      "Queue (Hàng đợi) hoạt động theo nguyên tắc FIFO. Bài viết giới thiệu Queue thông thường, Circular Queue và Priority Queue.",
    content: `# Queue - Hàng đợi

## Queue là gì?

Queue (Hàng đợi) là cấu trúc dữ liệu hoạt động theo nguyên tắc **FIFO** (First In - First Out): phần tử vào trước sẽ ra trước.

Giống như hàng đợi mua vé: ai xếp hàng trước thì được phục vụ trước.

## Các thao tác cơ bản

- **enqueue(x)**: Thêm phần tử vào cuối hàng đợi
- **dequeue()**: Lấy và xóa phần tử ở đầu hàng đợi
- **front()**: Xem phần tử đầu hàng đợi
- **isEmpty()**: Kiểm tra hàng đợi rỗng

## Cài đặt Queue

\`\`\`typescript
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}
\`\`\`

## Priority Queue (Hàng đợi ưu tiên)

Phần tử có **độ ưu tiên cao hơn** được xử lý trước.

\`\`\`typescript
class PriorityQueue {
  private items: { value: number; priority: number }[] = [];

  enqueue(value: number, priority: number) {
    this.items.push({ value, priority });
    // Sắp xếp theo độ ưu tiên giảm dần
    this.items.sort((a, b) => b.priority - a.priority);
  }

  dequeue() {
    return this.items.shift();
  }
}
\`\`\`

## Ứng dụng

- **BFS** (Duyệt đồ thị theo chiều rộng)
- Quản lý tiến trình trong hệ điều hành
- Hệ thống in ấn (print spooler)
`,
    tags: ["t4"],
    status: "published",
    views: 175,
    createdAt: "2024-01-25T08:30:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p5",
    title: "Binary Search Tree - Cây nhị phân tìm kiếm",
    slug: "binary-search-tree",
    summary:
      "BST là cây nhị phân có tính chất: con trái < cha < con phải. Tìm hiểu cách cài đặt, chèn, xóa và tìm kiếm trên BST.",
    content: `# Binary Search Tree (BST)

## BST là gì?

Cây nhị phân tìm kiếm (BST) là cây nhị phân với tính chất:
- Mọi node ở **cây con trái** có giá trị **nhỏ hơn** node cha
- Mọi node ở **cây con phải** có giá trị **lớn hơn** node cha

## Cài đặt BST

\`\`\`typescript
class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  root: TreeNode | null = null;

  // Chèn node
  insert(value: number) {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: TreeNode | null, value: number): TreeNode {
    if (!node) return new TreeNode(value);
    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }
    return node;
  }

  // Tìm kiếm
  search(value: number): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode | null, value: number): boolean {
    if (!node) return false;
    if (value === node.value) return true;
    if (value < node.value) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  // Duyệt In-order (cho kết quả tăng dần)
  inOrder(node: TreeNode | null = this.root): void {
    if (!node) return;
    this.inOrder(node.left);
    console.log(node.value);
    this.inOrder(node.right);
  }
}
\`\`\`

## Độ phức tạp

| Thao tác | Trung bình | Tệ nhất |
|----------|-----------|---------|
| Tìm kiếm | O(log n) | O(n) |
| Chèn | O(log n) | O(n) |
| Xóa | O(log n) | O(n) |
`,
    tags: ["t5"],
    status: "published",
    views: 320,
    createdAt: "2024-02-01T09:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p6",
    title: "Bubble Sort - Sắp xếp nổi bọt",
    slug: "bubble-sort",
    summary:
      "Bubble Sort là thuật toán sắp xếp đơn giản nhất. Tìm hiểu cách hoạt động, cài đặt và phân tích độ phức tạp.",
    content: `# Bubble Sort - Sắp xếp nổi bọt

## Ý tưởng

Thuật toán so sánh **hai phần tử liền kề** và hoán đổi nếu chúng sai thứ tự. Lặp lại cho đến khi mảng được sắp xếp.

Tên "nổi bọt" vì phần tử lớn nhất "nổi" lên cuối mảng sau mỗi vòng lặp.

## Cài đặt

\`\`\`typescript
function bubbleSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Hoán đổi
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // Nếu không có hoán đổi nào → mảng đã sắp xếp
    if (!swapped) break;
  }

  return arr;
}

// Test
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(arr));
// [11, 12, 22, 25, 34, 64, 90]
\`\`\`

## Độ phức tạp

| Trường hợp | Thời gian |
|-----------|----------|
| Tốt nhất | O(n) |
| Trung bình | O(n²) |
| Tệ nhất | O(n²) |
| Không gian | O(1) |

## Khi nào dùng?

- Chỉ dùng để **học tập**, minh họa khái niệm
- **Không dùng** trong thực tế vì O(n²)
- Với mảng **gần như đã sắp xếp**: O(n) - chấp nhận được
`,
    tags: ["t7"],
    status: "published",
    views: 88,
    createdAt: "2024-02-05T11:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p7",
    title: "Quick Sort - Sắp xếp nhanh",
    slug: "quick-sort",
    summary:
      "Quick Sort là một trong những thuật toán sắp xếp hiệu quả nhất với O(n log n) trung bình. Tìm hiểu chiến lược Chia để trị.",
    content: `# Quick Sort - Sắp xếp nhanh

## Ý tưởng (Chia để trị)

1. Chọn một phần tử làm **pivot**
2. Phân hoạch: đưa các phần tử **nhỏ hơn pivot** về bên trái, **lớn hơn** về bên phải
3. Đệ quy sắp xếp hai phần con

## Cài đặt

\`\`\`typescript
function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]; // Chọn phần tử cuối làm pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Test
const arr = [10, 7, 8, 9, 1, 5];
console.log(quickSort(arr));
// [1, 5, 7, 8, 9, 10]
\`\`\`

## Độ phức tạp

| Trường hợp | Thời gian |
|-----------|----------|
| Tốt nhất | O(n log n) |
| Trung bình | O(n log n) |
| Tệ nhất | O(n²) |
| Không gian | O(log n) |

> **Tệ nhất** xảy ra khi pivot luôn là phần tử nhỏ nhất/lớn nhất (mảng đã sắp xếp). Giải pháp: chọn pivot ngẫu nhiên.
`,
    tags: ["t7", "t10"],
    status: "published",
    views: 265,
    createdAt: "2024-02-10T09:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p8",
    title: "Binary Search - Tìm kiếm nhị phân",
    slug: "binary-search",
    summary:
      "Binary Search là thuật toán tìm kiếm O(log n) trên mảng đã sắp xếp. Cài đặt bằng vòng lặp và đệ quy.",
    content: `# Binary Search - Tìm kiếm nhị phân

## Điều kiện tiên quyết

Mảng phải được **sắp xếp** trước.

## Ý tưởng

1. So sánh target với phần tử **giữa** mảng
2. Nếu bằng → tìm thấy
3. Nếu target < giữa → tìm ở **nửa trái**
4. Nếu target > giữa → tìm ở **nửa phải**
5. Lặp lại cho đến khi tìm thấy hoặc không còn phần tử

## Cài đặt bằng vòng lặp

\`\`\`typescript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1; // Không tìm thấy
}
\`\`\`

## Cài đặt bằng đệ quy

\`\`\`typescript
function binarySearchRecursive(
  arr: number[],
  target: number,
  left: number,
  right: number
): number {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target)
    return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}
\`\`\`

## So sánh với Linear Search

| Thuật toán | Độ phức tạp | Điều kiện |
|-----------|------------|----------|
| Linear Search | O(n) | Không cần sắp xếp |
| Binary Search | O(log n) | Phải sắp xếp trước |
`,
    tags: ["t8"],
    status: "published",
    views: 190,
    createdAt: "2024-02-15T10:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p9",
    title: "Dynamic Programming - Quy hoạch động cơ bản",
    slug: "dynamic-programming-co-ban",
    summary:
      "Giới thiệu quy hoạch động (DP) - kỹ thuật giải các bài toán tối ưu bằng cách chia nhỏ và lưu trữ kết quả trung gian.",
    content: `# Dynamic Programming - Quy hoạch động

## DP là gì?

Quy hoạch động (Dynamic Programming) là kỹ thuật giải bài toán bằng cách:
1. **Chia** bài toán lớn thành các bài toán con nhỏ hơn
2. **Lưu** kết quả các bài toán con (memoization/tabulation)
3. **Tái sử dụng** kết quả đã tính

## Hai cách tiếp cận

### 1. Top-down (Memoization - Ghi nhớ)

\`\`\`typescript
// Fibonacci với memoization
function fib(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;

  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}
\`\`\`

### 2. Bottom-up (Tabulation - Bảng)

\`\`\`typescript
// Fibonacci với tabulation
function fibDP(n: number): number {
  if (n <= 1) return n;

  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
\`\`\`

## Bài toán Knapsack (Ba lô)

\`\`\`typescript
function knapsack(
  weights: number[],
  values: number[],
  capacity: number
): number {
  const n = weights.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Không lấy item i
      dp[i][w] = dp[i - 1][w];
      // Lấy item i nếu đủ sức chứa
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }

  return dp[n][capacity];
}
\`\`\`

## Các dấu hiệu nhận biết bài toán DP

- Bài toán có **tối ưu con**
- Có **bài toán con chồng lặp**
- Hỏi về **max/min/đếm số cách**
`,
    tags: ["t9", "t10"],
    status: "published",
    views: 412,
    createdAt: "2024-02-20T08:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p10",
    title: "Graph - Đồ thị và thuật toán duyệt BFS/DFS",
    slug: "graph-bfs-dfs",
    summary:
      "Đồ thị là cấu trúc dữ liệu quan trọng. Bài viết trình bày biểu diễn đồ thị và hai thuật toán duyệt BFS, DFS.",
    content: `# Graph - Đồ thị

## Định nghĩa

Đồ thị G = (V, E) gồm:
- **V**: tập hợp các đỉnh (vertices)
- **E**: tập hợp các cạnh (edges) nối các đỉnh

## Biểu diễn đồ thị

### Danh sách kề (Adjacency List)

\`\`\`typescript
class Graph {
  private adjList: Map<number, number[]>;

  constructor() {
    this.adjList = new Map();
  }

  addVertex(v: number) {
    if (!this.adjList.has(v)) {
      this.adjList.set(v, []);
    }
  }

  addEdge(u: number, v: number) {
    this.adjList.get(u)?.push(v);
    this.adjList.get(v)?.push(u); // Đồ thị vô hướng
  }

  getNeighbors(v: number): number[] {
    return this.adjList.get(v) || [];
  }
}
\`\`\`

## BFS - Duyệt theo chiều rộng

\`\`\`typescript
function bfs(graph: Graph, start: number): number[] {
  const visited = new Set<number>();
  const queue: number[] = [start];
  const result: number[] = [];

  visited.add(start);

  while (queue.length > 0) {
    const vertex = queue.shift()!;
    result.push(vertex);

    for (const neighbor of graph.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}
\`\`\`

## DFS - Duyệt theo chiều sâu

\`\`\`typescript
function dfs(graph: Graph, start: number): number[] {
  const visited = new Set<number>();
  const result: number[] = [];

  function dfsHelper(vertex: number) {
    visited.add(vertex);
    result.push(vertex);

    for (const neighbor of graph.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor);
      }
    }
  }

  dfsHelper(start);
  return result;
}
\`\`\`

## So sánh BFS và DFS

| Tiêu chí | BFS | DFS |
|---------|-----|-----|
| Cấu trúc dùng | Queue | Stack/Đệ quy |
| Đường đi ngắn nhất | ✅ | ❌ |
| Độ phức tạp | O(V+E) | O(V+E) |
| Dùng khi | Đường ngắn nhất | Tìm chu trình |
`,
    tags: ["t6", "t4", "t3"],
    status: "published",
    views: 387,
    createdAt: "2024-02-25T09:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p11",
    title: "Hash Table - Bảng băm",
    slug: "hash-table",
    summary:
      "Hash Table cho phép tìm kiếm, chèn, xóa với độ phức tạp O(1) trung bình. Tìm hiểu hàm băm và xử lý xung đột.",
    content: `# Hash Table - Bảng băm

## Hash Table là gì?

Bảng băm là cấu trúc dữ liệu dùng **hàm băm (hash function)** để ánh xạ khóa (key) sang vị trí trong mảng.

## Hàm băm đơn giản

\`\`\`typescript
function hashFunction(key: string, size: number): number {
  let hash = 0;
  for (const char of key) {
    hash = (hash + char.charCodeAt(0)) % size;
  }
  return hash;
}
\`\`\`

## Xử lý xung đột - Chaining

\`\`\`typescript
class HashTable<V> {
  private size: number;
  private table: Array<Array<[string, V]>>;

  constructor(size = 53) {
    this.size = size;
    this.table = new Array(size).fill(null).map(() => []);
  }

  private hash(key: string): number {
    let hash = 0;
    for (const char of key) {
      hash = (hash * 31 + char.charCodeAt(0)) % this.size;
    }
    return hash;
  }

  set(key: string, value: V) {
    const index = this.hash(key);
    const bucket = this.table[index];

    const existing = bucket.find(([k]) => k === key);
    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }

  get(key: string): V | undefined {
    const index = this.hash(key);
    const bucket = this.table[index];
    const found = bucket.find(([k]) => k === key);
    return found ? found[1] : undefined;
  }

  delete(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.table[index];
    const idx = bucket.findIndex(([k]) => k === key);
    if (idx === -1) return false;
    bucket.splice(idx, 1);
    return true;
  }
}
\`\`\`

## Độ phức tạp

| Thao tác | Trung bình | Tệ nhất |
|---------|-----------|---------|
| Tìm kiếm | O(1) | O(n) |
| Chèn | O(1) | O(n) |
| Xóa | O(1) | O(n) |

> JavaScript Object và Map đều là Hash Table phía bên dưới!
`,
    tags: ["t11"],
    status: "published",
    views: 156,
    createdAt: "2024-03-01T10:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p12",
    title: "Heap - Đống và Priority Queue",
    slug: "heap-priority-queue",
    summary:
      "Min Heap và Max Heap là các cây nhị phân đặc biệt. Tìm hiểu cách cài đặt và ứng dụng trong Priority Queue.",
    content: `# Heap - Đống nhị phân

## Heap là gì?

Heap là cây nhị phân **hoàn chỉnh** thỏa mãn:
- **Max Heap**: Node cha ≥ Node con
- **Min Heap**: Node cha ≤ Node con

## Cài đặt Min Heap bằng mảng

\`\`\`typescript
class MinHeap {
  private heap: number[] = [];

  private parent(i: number) { return Math.floor((i - 1) / 2); }
  private left(i: number) { return 2 * i + 1; }
  private right(i: number) { return 2 * i + 2; }

  insert(value: number) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(i: number) {
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      const p = this.parent(i);
      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
      i = p;
    }
  }

  extractMin(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return min;
  }

  private siftDown(i: number) {
    let smallest = i;
    const l = this.left(i);
    const r = this.right(i);

    if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;
    if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.siftDown(smallest);
    }
  }

  peek(): number | undefined {
    return this.heap[0];
  }
}
\`\`\`

## Ứng dụng

- **Priority Queue** - Hàng đợi ưu tiên
- **Heap Sort** - Sắp xếp O(n log n)
- **Dijkstra** - Tìm đường đi ngắn nhất
- **Top K elements** - Tìm K phần tử lớn/nhỏ nhất
`,
    tags: ["t12", "t5"],
    status: "published",
    views: 203,
    createdAt: "2024-03-05T09:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p13",
    title: "Merge Sort - Sắp xếp trộn",
    slug: "merge-sort",
    summary:
      "Merge Sort là thuật toán sắp xếp ổn định với O(n log n) ở mọi trường hợp. Tìm hiểu chiến lược Chia để trị.",
    content: `# Merge Sort - Sắp xếp trộn

## Ý tưởng

1. **Chia** mảng thành 2 nửa
2. **Đệ quy** sắp xếp từng nửa
3. **Trộn** hai nửa đã sắp xếp lại

## Cài đặt

\`\`\`typescript
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Test
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]
\`\`\`

## Độ phức tạp

| Trường hợp | Thời gian | Không gian |
|-----------|----------|-----------|
| Tốt nhất | O(n log n) | O(n) |
| Trung bình | O(n log n) | O(n) |
| Tệ nhất | O(n log n) | O(n) |

## So sánh với Quick Sort

| Tiêu chí | Merge Sort | Quick Sort |
|---------|-----------|-----------|
| Thời gian xấu nhất | O(n log n) | O(n²) |
| Không gian | O(n) | O(log n) |
| Ổn định | ✅ | ❌ |
| Dùng cho | Linked List | Array |
`,
    tags: ["t7", "t10"],
    status: "published",
    views: 178,
    createdAt: "2024-03-10T08:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p14",
    title: "Recursion - Đệ quy: Khái niệm và bài toán cổ điển",
    slug: "recursion-de-quy",
    summary:
      "Đệ quy là kỹ thuật hàm tự gọi lại chính nó. Tìm hiểu các bài toán cổ điển: Fibonacci, Factorial, Tháp Hà Nội.",
    content: `# Recursion - Đệ quy

## Đệ quy là gì?

Đệ quy là kỹ thuật hàm **tự gọi lại chính nó** với bài toán con nhỏ hơn, cho đến khi đạt **điều kiện dừng** (base case).

## Cấu trúc hàm đệ quy

\`\`\`typescript
function recursive(params) {
  // 1. Base case - Điều kiện dừng
  if (điều_kiện_dừng) {
    return giá_trị_cơ_sở;
  }

  // 2. Recursive case - Gọi đệ quy với bài toán nhỏ hơn
  return recursive(params_nhỏ_hơn);
}
\`\`\`

## Bài toán Factorial (Giai thừa)

\`\`\`typescript
function factorial(n: number): number {
  if (n === 0) return 1;          // Base case
  return n * factorial(n - 1);   // Recursive case
}

console.log(factorial(5)); // 120 (5 × 4 × 3 × 2 × 1)
\`\`\`

## Fibonacci

\`\`\`typescript
function fib(n: number): number {
  if (n <= 1) return n;                   // Base case
  return fib(n - 1) + fib(n - 2);       // Recursive case
}
\`\`\`

## Tháp Hà Nội

\`\`\`typescript
function hanoi(n: number, from: string, to: string, aux: string) {
  if (n === 1) {
    console.log(\`Chuyển đĩa 1 từ \${from} sang \${to}\`);
    return;
  }

  hanoi(n - 1, from, aux, to);   // Chuyển n-1 đĩa sang cột phụ
  console.log(\`Chuyển đĩa \${n} từ \${from} sang \${to}\`);
  hanoi(n - 1, aux, to, from);   // Chuyển n-1 đĩa từ cột phụ sang đích
}

hanoi(3, 'A', 'C', 'B');
\`\`\`

## Đệ quy vs Vòng lặp

| Tiêu chí | Đệ quy | Vòng lặp |
|---------|--------|---------|
| Dễ đọc | ✅ (nhiều bài toán) | ❌ |
| Hiệu năng | ❌ (call stack) | ✅ |
| Stack overflow | ❌ (có thể xảy ra) | ✅ |
`,
    tags: ["t10"],
    status: "published",
    views: 290,
    createdAt: "2024-03-15T09:00:00Z",
    author: "Nguyễn Dev",
  },
  {
    id: "p15",
    title: "Doubly Linked List - Danh sách liên kết đôi",
    slug: "doubly-linked-list",
    summary:
      "Danh sách liên kết đôi có thêm con trỏ prev, cho phép duyệt hai chiều. So sánh với danh sách liên kết đơn.",
    content: `# Doubly Linked List - Danh sách liên kết đôi

## Khác gì với Singly Linked List?

Mỗi node có **hai con trỏ**:
- **next**: trỏ đến node tiếp theo
- **prev**: trỏ đến node trước đó

## Cài đặt

\`\`\`typescript
class DNode {
  data: number;
  next: DNode | null;
  prev: DNode | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  head: DNode | null = null;
  tail: DNode | null = null;

  addFirst(data: number) {
    const node = new DNode(data);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }

  addLast(data: number) {
    const node = new DNode(data);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
  }

  removeFirst() {
    if (!this.head) return;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
    }
  }

  removeLast() {
    if (!this.tail) return;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
    }
  }
}
\`\`\`

## Ứng dụng

- **Browser history**: nút Back và Forward
- **Undo/Redo** trong trình soạn thảo
- **LRU Cache** (Least Recently Used)
`,
    tags: ["t2"],
    status: "draft",
    views: 45,
    createdAt: "2024-03-20T10:00:00Z",
    author: "Nguyễn Dev",
  },
];