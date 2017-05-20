const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Definition for singly-linked list.
//      function Node(data){
//        this.data = data
//        this.next = null
//      }


//param A : head node of linked list
//return the head node in the linked list
function deleteDuplicates(A){
    if(!A) return;
    if(!A.next) return A;
    combine(A, A.next);

    function combine(N, M) {
        if(!M) {
          N.next = null;
          return;
        }
        if(N.data == M.data){
            combine(N, M.next);
        }
        else {
            N.next = M;
            combine(M, M.next);
        }
    }
    return A;
}

function createLinkedList(list) {
  if(typeof list != 'string')
    return;
  let elem = list.split(' ');
  let linkedList = [];
  elem.forEach(function(el, i) {
    linkedList.push(new Node(el));
  });
  linkedList.forEach(function(node, i) {
    if(i < linkedList.length) {
      node.next = linkedList[i+1];
    }
  });
  return linkedList;
}

function printList(A, result = '') {
  if(!A) return;
  result += A.data + ' ';
  if(!A.next) {
    console.log('result', result);
    return result;
  }

  if(A.next)
    printList(A.next, result);
}


function Node(data){
  this.data = data
  this.next = null
}

/*
let list1 = createLinkedList('1 2 2 3 4 4 5 6')
printList(list1[0]);
deleteDuplicates(list1[0]);
printList(list1[0]);

let list2 = createLinkedList('1 1 1 1 1 1 1')
printList(list2[0]);
deleteDuplicates(list2[0]);
printList(list2[0]);
*/




// console.log(gdc(11,13));

function singleNumber(arr){
  if(!(arr instanceof Array)) return;
    var obj = {};
    arr.forEach(function(el) {
       if(!obj[el]) obj[el] = 1;
       else
         if(obj[el]) delete obj[el];
    });
    console.log(obj);
    return Object.keys(obj)[0];
}

//console.log(singleNumber([ 723, 256, 668, 723, 140, 360, 597, 233, 128, 845, 737, 804, 986, 701, 906, 512, 845, 510, 510, 227, 430, 701, 366, 946, 464, 619, 946, 627, 209, 771, 424, 555, 959, 711, 530, 937, 716, 261, 505, 658, 706, 140, 511, 277, 396, 233, 819, 196, 475, 906, 583, 261, 147, 658, 517, 197, 196, 702, 944, 711, 128, 555, 149, 483, 530, 291, 716, 258, 430, 464, 601, 749, 149, 415, 802, 573, 627, 771, 660, 601, 360, 986, 291, 51, 415, 51, 227, 258, 937, 366, 923, 669, 33, 517, 417, 702, 475, 706, 110, 417, 275, 804, 500, 473, 746, 973, 669, 275, 973, 147, 817, 657, 277, 923, 144, 660, 197, 511, 793, 893, 944, 505, 322, 817, 586, 512, 322, 668, 33, 424, 962, 597, 144, 746, 345, 753, 345, 269, 819, 483, 368, 802, 573, 962, 583, 615, 208, 209, 269, 749, 256, 657, 619, 893, 959, 473, 753, 299, 396, 299, 500, 368, 586, 110, 793, 737, 615 ]))

/* Given 2 identical DOM trees (but not equal) and one element of the first DOM tree, how would you find this element in the second DOM tree?
== Given two identical DOM tree structures, A and B, and a node from A, find the corresponding node in B.
*/

let dom1 = new JSDOM(`<!DOCTYPE html><div><div><p>Hello</p></div><div><p>Hello</p><div><p id=thisp>Hello</p></div></div></div>`);
let dom2 = new JSDOM(`<!DOCTYPE html><div><div><p>Hello</p></div><div><p>Hello</p><div><p id=thisp>Hello</p></div></div></div>`);

let doc1 = dom1.window.document;
let doc2 = dom2.window.document;


function findNode(node, tree1, tree2) {
  if(!tree1 || !tree2) return;
  if(!node) node == tree1.firstChild;
  if(!node) return;

  let tag = node.tagName.toUpperCase();

  let elems = tree1.getElementsByTagName(tag);
  let indx = Array.prototype.indexOf.call(elems, node);

  let elems2 = tree2.getElementsByTagName(tag);
  return elems2[indx];

}

function findNode2(node, tree1, tree2) {
  if(!tree1 || !tree2) return;
  if(!node) node == tree1.firstChild;
  if(!node) return;

  function getPath(n, root, path=[]) {
    if(!n || !root) return;
    if(n == root) return path;

    let parent = n.parentNode;
    let indx = Array.prototype.indexOf.call(parent.childNodes, n);
    path.push([parent, indx]);
    return getPath(parent, root, path);
  }

  let path = getPath(node, tree1);
  console.log(path);
  let node2;
  for(var i=path.length-1; i >=0; i--) {
    node2 = path[i][0].childNodes[path[i][1]];
  }
  return node2;
}


//let node2 = findNode2(doc1.getElementById('thisp') , doc1, doc2)
//console.log(node2, node2.getAttribute('id'));


/*
You have to write a function which takes as input two sorted arrays A and B each containing n elements. Array A can hold upto 2*n elements where as Array B can hold upto n elements. Merge the elements of array A and array B into array A such that it is sorted. You can’t use any additional data structure, you may only use extra constant memory space.*/

function sortArrays(arr1, arr2) {

  function swap(arr1, arr2, indx) {
    if(indx == arr1.length) {
      for(let i=0; i <arr2.length; i++) {
        arr1.push(arr2[i]);
      }
    }
    else if(arr2[0] > arr1[indx]) {
      swap(arr1, arr2, ++indx);
    }
    else {
      let temp = arr1[indx];
      arr1[indx] = arr2[0];
      let indx2 = 0;
      while(arr2[indx2+1] < temp) {
        arr2[indx2] = arr2[indx2+1];
        indx2++;

      }
      arr2[indx2] = temp;
      swap(arr1, arr2, ++indx);
    }
  }

  swap(arr1, arr2, 0);
  return arr1;
}

let arr1 = [1, 2, 6, 8, 9, 12];
let arr2 = [0, 4, 6, 10, 11];
arr1 = [1, 2, 6, 6, 6, 8, 9, 12];
arr2 = [0, 0, 4, 6, 10, 11];
arr1 = [];
arr2 = [];
arr1 = [];
arr2 = [1];
//sortArrays(arr1, arr2);
//console.log(arr1);


/*
You have to write a function checkRegex() which takes two strings as input, one string represents a regex expression and other is an input string to match with the regex expression passed as the other parameter. Return true if it matches, else false.
Regex may contain characters ‘a-z’, ‘.’ and ‘*’ where ‘.’ matches any character and ‘*’ means 0 or more occurrences of the previous character preceding it.

Examples:
1) a*b matches b,ab,aab
2) a.b matches aab, abb, acb,…, azb
3) .* matches all the valid strings formed by using the lowercase letters

*/

function checkRegex(reg, str) {
  if(reg == str) return true;
  if(!str) return false;

  //checkRegex("a*b","aaab") = checkRegex("b","aaab") OR checkRegex("a*b","aab")

  let choices = [];

  if(reg[1] == '*')
    choices.push([reg.slice(2), str]);
  if(reg[0] == '.')
    choices.push()


  /*if(reg[1] == '*') {
    return checkRegex(reg.slice(2), str) ||
      (reg[0] == '.' ?
        checkRegex(reg, str.slice(1)) :
        checkRegex(
      )
  }*/

  return checkRegex(reg, str);
}

//checkRegex('a*b', 'aaab')

/*
Given a string Sting="ABCSC" Check whether it contains a Substring="ABC"?

1)If no , return "-1".
2)If yes , remove the substring from string and return "SC".
use very simple code and concept(ALGORITHM)..

*/

function substrRemove(str, substr, checked=false) {
  if(!substr) return str;
  if(!str) return -1;
  if(str[0] != substr[0])
    if(!checked)
      return substrRemove(str.substr(1), substr);
    else
      return -1;
  else
    return substrRemove(str.substr(1), substr.substr(1), true);
}


// console.log(substrRemove('xwABSC', 'ABC'))


/*
Alex is standing on the top left cell (1,1) of a n*m table. The table has n rows and m columns. Initially, he is facing its right cell. He moves on the table in the following way:

>He moves one step forward.
>He turns to his right
>While moving forward, if he would go out of the table or reach a visited cell, he turns to his right.

He moves in the table as much as he can. Can you find out the number of cells he visits before he stops?

For example, given a 9x9 grid, the following would be his moves. The number on each cell represents the step he would land on that particular cell.
1 2 55 54 51 50 47 46 45
4 3 56 53 52 49 48 43 44
5 6 57 58 79 78 77 42 41
8 7 60 59 80 75 76 39 40
9 10 61 62 81 74 73 38 37
12 11 64 63 68 69 72 35 36
13 14 65 66 67 70 71 34 33
16 15 20 21 24 25 28 29 32
17 18 19 22 23 26 27 30 31

Input:
The first line of the input contains two integer numbers n and m.
n and m are between 1 and 100.

Output:
Print an integer to the output being the answer of the test.

Sample input #00:
3 3

Sample output #00:
9

Sample input #01:
7 4

Sample output #01:
18



*/

// table = [[1,0,0,..,m],[0,0,0], ...] n*m; table[i][j], table[a][b] ,  nextnmove = 'f' / 'r';
// {x:i, y:j, lx:a, ly:b}, {x:i, y:j, lx: , ly:}

function generateTable(n,m) {
  let table = [[]], i, j;

  for(i=1; i <= n; i++) {
    table.push([]);
    for(j=0; j <= m+1; j++) {
      if(j == 0 || j == m+1)
        table[i].push(1);
      else
        table[i].push(0);
    }
  }
  table.push([]);
  for(i=0; i <= m+1; i++) {
    table[0][i] = 1;
    table[n+1][i] = 1;
  }

  return table;
}

function turtleMoves(n,m) {
  let table = generateTable(n,m), moves = 0;
  table[1][1] = 1;

  function turtleRight(table, pos, noMoves=0 ) {
    if(noMoves == 4) return false;

    if(pos.lx > pos.x) {
      pos.ly = pos.y + 1;
      pos.lx = pos.x;
    }
    else if(pos.lx < pos.x) {
      pos.ly = pos.y - 1;
      pos.lx = pos.x;
    }
    else if(pos.ly < pos.y) {
      pos.ly = pos.y;
      pos.lx = pos.x + 1;
    }
    else {
      pos.ly = pos.y;
      pos.lx = pos.x - 1;
    }

    if(table[pos.ly][pos.lx])
      turtleRight(table, pos, ++noMoves);
    return pos;

  }
  function turtleForward(table, pos) {
    if(table[pos.lx][pos.ly]) {
      pos = turtleRight(table, pos);
      if(!pos) return false;
    }


    if(pos.lx > pos.x) {
      pos.ly = pos.y + 1;
      pos.lx = pos.x;
    }
    else if(pos.lx < pos.x) {
      pos.ly = pos.y - 1;
      pos.lx = pos.x;
    }
    else if(pos.ly < pos.y) {
      pos.ly = pos.y;
      pos.lx = pos.x + 1;
    }
    else {
      pos.ly = pos.y;
      pos.lx = pos.x - 1;
    }

    pos.x = pos.lx;
    pos.y = pos.ly;
    table[pos.y][pos.x] = 1;

  }

  //turtleForward(table, {x: 1, 1], [1, 2], 'f');
  return moves;
}

// console.log(generateTable(2,3));



// Print a tree, level by level.


let tree = {
  name: "R",
  children: [
    {
      name: "K1",
      children: [
        { name: "K11" },
        { name: "K12" }
      ]
    },
    {
      name: "K2",
      children: [
        { name: "K31" },
        { name: "K32" }
      ]
    }
  ]
}

function printTree(tree) {
  let arr;

  function getTree(tree, level, arr=[[]]) {
    //console.log(tree, level, arr);
    if(!tree) return arr;

    arr[level].push(tree.name);
    if(!tree.children) return arr;

    if(!arr[level+1])
      arr[level+1] = [];
    for(let i=0, len = tree.children.length; i < len; i++) {
      arr = getTree(tree.children[i], level+1, arr)
    }

    return arr;
  }

  arr = getTree(tree, 0);
  console.log(arr);
}

//printTree(tree);

// Breadth first traversal
function bfs(tree) {
  let queue = [tree];
  console.log(tree.name);
  while(queue[0]) {
    if(queue[0].children) {
      let kids = queue[0].children;
      for(let i=0, len=kids.length; i<len; i++) {
        console.log(kids[i].name);
        queue.push(kids[i]);
      }
    }
    queue.shift();
  }
}

//bfs(tree);

// ternary search

function binSearch(arr, n) {
  let low = 0, high = arr.length-1;
  while(low <= high) {
    let mid = Math.floor((low + high) / 2);

    if(n < arr[mid]) {
      high = mid - 1;
    }
    else if(n > arr[mid]) {
      low = mid + 1;
    }
    else
      return mid;
  }
}

//console.log(binSearch([0,1,2,3,4,5,7,8,10, 22, 25, 39, 50], 22));

function ternSearch(arr, n, low, high) {
  if(!n || !arr) return -1;
  if(!low) {
    low = 0, high = arr.length -1;
  }

  //console.log(low, '               ', high);
  let slice1 = low + Math.floor((high - low) / 3),
      slice2 = high - Math.floor((high - low) / 3);
  //console.log('     ', slice1,'   ', slice2);
  if(n == arr[slice1]) return slice1;
  if(n == arr[slice2]) return slice2;

  if(n < arr[slice1])
    return ternSearch(arr, n, low, slice1 -1);
  if(n < arr[slice2])
    return ternSearch(arr, n, slice1 + 1, slice2 -1);
  return ternSearch(arr, n, slice2 + 1, high);
}

//console.log(ternSearch([0,1,2,3,4,5,7,8,10, 22, 25, 39, 50], 22));

function mergeSort(arr1) {

  if(arr1.length == 1) {
    return arr1;
  }
  let arrs = split(arr1);
  return merge(mergeSort(arrs[0]), mergeSort(arrs[1]));


  function merge(arr1, arr2) {
    if(!arr1[0] && arr1[0] !== 0) return arr2;
    if(!arr2[0] && arr2[0] !== 0) return arr1;

    let arr = [];
    while((arr1[0] || arr1[0] === 0) && (arr2[0] || arr2[0] === 0)) {
      if(arr1[0] < arr2[0]) {
        arr.push(arr1[0]);
        arr1.shift();
      }
      else {
        arr.push(arr2[0]);
        arr2.shift();
      }
    }

    return arr.concat(arr1).concat(arr2);
  }

  function split(arr1) {
    let len = arr1.length, mid = Math.floor(len/2);
    return [ arr1.slice(0, mid), arr1.slice(mid, len)];
  }


}

//console.log(mergeSort([5,3,0,20,33,40,1,9,6,20,7,10]));


/*
Merge multiple sorted arrays
*/

function mergeMultipleArrays(...args) {
  let arr = [];

  function merge(...arrs) {
    if(!arrs.length) return;

    let minIndx = 0, min = arrs[0][0];
    arrs.forEach(function(a, i) {
      if(a[0] < min) {
        min = a[0];
        minIndx = i;
      }
    });

    arr.push(arrs[minIndx][0]);
    arrs[minIndx].shift();
    if(!arrs[minIndx].length) arrs.splice(minIndx, 1);
    merge(...arrs);
  }
  args.forEach(function(a, i) {
    if(!a.length)
      args.splice(i,1);
  });

  merge(...args);
  return arr;
}


arr1 = [1, 2, 6, 8, 9, 12];
arr2 = [0, 4, 6, 10, 11];
let arr3 = [1, 2, 6, 6, 6, 8, 9, 12];
let arr4 = [];

//console.log('mergeMultipleArrays', mergeMultipleArrays(arr1, arr2, arr3, arr4));





function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

//console.log(k_combinations([1, 2, 3, 6, 8], 3))




// largest Palindrome

function palindrome(str) {
  return str == str.split('').reverse().join('');
}

function bigPalindrome(str) {
  if(!str) return '';
  if(palindrome(str)) return str;

  let palindr = '';
  for(let i=0, len=str.length; i<len-1; i++) {
    for(let j=i+1; j < len; j++) {
      if(str[i] === str[j]) {
        let newstr = str.substring(i,j+1);
        if(palindrome(newstr) && palindr.length < newstr.length) {
          palindr = newstr;
        }
      }
    }
  }
  if(!palindr) return str[0];
  return palindr;
}

//console.log(bigPalindrome('sfrfs'))



// Find all 3 items that sum to 0 in an array.
function sumCombin(arr) {
  let k = 3;

  function combin(arr, k) {
    if(!arr.length || k < 0) return [];

    if(k == 1) {
      let newarr = [];

      for(let i=0, len=arr.length; i < len; i++)
        newarr.push([arr[i]]);
      return newarr;
    }

    let allCombin = [];

    for(let i=0; i< arr.length -k+1; i++) {
      let curr = arr[i];
      let rest = combin(arr.slice(i+1), k-1);

      for(let j = 0; j <rest.length; j++) {
        allCombin.push([curr].concat(rest[j]));
      }
    }
    return allCombin;
  }

  let allCombin = combin(arr, k);

  return allCombin.filter(function(comb) {
    return 0 === comb.reduce(function(a,b) {
      return a+b;
    });
  });
}

//console.log(sumCombin([2,5,7,-2, 0,-3,-4,5,9]));


// Observer pattern

class Observer {
  constructor() {
  }

  update(data) {
    // do whatever
  }
}

class ObserverManager {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    if(typeof observer === 'object')
      observer = this.observers.indexOf(observer);
    this.observers.splice(observer, 1);
  }

  getObserver(ind) {
    return this.observers[i];
  }

  getObservers(){
    return this.observers;
  }
}

class Subject {
  constructor(data) {
    this.observers = new ObserverManager();
    this.data = data;
    this.notify(data);
  }

  addObserver(observer) {
    this.observers.addObserver(observer);
  }

  removeObserver(observer) {
    this.observers.removeObserver(observer);
  }

  setData(newdata) {
    this.data = newdata;
    this.notify();
  }

  notify(data) {
    data = data || this.data;
    this.observers.getObservers().forEach(function(o) {
      o.update(data);
    });
  }
}

// Print all the paths from root to every leaf in a binary tree.

class BinaryTreeNode {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  insertNode(value) {
    let node = new BinaryTreeNode(value);
    if(!this.root) {
      this.root = node;
      return;
    }

    let currentNode = this.root;

    while(currentNode) {
      if(value < currentNode.data) {
        if(!currentNode.left) {
          currentNode.left = node;
          break;
        }
        else
          currentNode = currentNode.left;

      }
      else {
        if(!currentNode.right) {
          currentNode.right = node;
          break;
        }
        else
          currentNode = currentNode.right;
      }
    }
  }
}

function inOrderTraversal(node, callb) {
  if(node.left)
    inOrderTraversal(node.left, callb);
  callb(node.data);
  if(node.right)
    inOrderTraversal(node.right, callb);
}

function preOrderTraversal(node, callb) {
  callb(node);
  if(node.left)
    preOrderTraversal(node.left, callb);
  if(node.right)
    preOrderTraversal(node.right, callb);
}

// Print all the paths from root to every leaf in a binary tree.
function printLeafPaths(node) {
  let path = [];
  print(node);

  function print(node, ind=0) {
    path.push(node.data);
    ind++;
    if(!node.left && !node.right)
      console.log(path.join(' -> '));
    if(node.left)
      print(node.left, ind);

    path = path.slice(0, ind);

    if(node.right)
      print(node.right, ind);
  }
}


let binTree = new BinaryTree();
binTree.insertNode(5);
binTree.insertNode(7);
binTree.insertNode(2);
binTree.insertNode(6);
binTree.insertNode(13);
binTree.insertNode(20);
binTree.insertNode(10);


//inOrderTraversal(binTree.root, function(value) { console.log(value);});
//printLeafPaths(binTree.root);

// Quick Sort
function quickSort(arr, start, end) {
  if(!start && start !== 0) {
    start = 0;
    end = arr.length - 1;
  }

  if(start < end) {
    let pivInd = splitSort(arr, start, end);
    quickSort(arr, start, pivInd - 1);
    quickSort(arr, pivInd + 1, end);
  }


  function splitSort(arr, start, end) {
    let pivot = arr[0], i = start + 1;

    for(let j = start + 1; j <= end; j++) {
      if(arr[j] < pivot) {
        swap(arr, i, j);
        i++;
      }
    }
    swap(arr, start, i-1);
    return i-1;
  }


  function swap(arr, i1, i2) {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
  }

  return arr;

}

//console.log(quickSort([4,7,2,5,1,9,0,6,7,4]));

// Given a set of n jobs with [start time, end time, cost] find a subset so that no 2 jobs overlap and the cost is maximum ?

function findJobsSubset(jobs) {
  //let jobSums = new Map();

  function findJobs(jobs) {
    if(!jobs.length) return [];
    if(jobs.length == 1)
      return [jobs[0]];
    let currentJob = jobs[0];
    let indx = jobs.findIndex(function(j) {
      return j.start > currentJob.end;
    });
    let result = findJobs(jobs.slice(indx));

    return [currentJob].concat(result);

  }

  function sortJobs(jobs) {

  }

  jobs = sortJobs(jobs);
  let allComb = findJobs(jobs);
  let max = -Infinity, set;
  allComb.forEach(function(combo) {
    let sum = combo.reduce(function(job1, job2) {
      return job1[2] + job2[2];
    });
    if(max < sum) {
      max = sum;
      set = combo;
    }
  });
  return set;
}

let jobs = [
  [0,4,10], [2,6,7],[6,10,50],[1,9,30],[10,14,60]
];
///findJobsSubset(jobs);


// Emitter pattern

class Subscription {
  constructer() {

  }

  unsubscribe() {

  }

}

class Emitter {
  constructer() {

  }

  subscribe(ev, callb) {

    return subscription;
  }

  publish(ev, callb) {

  }
}


let emitter = new Emitter();
let subscription = emiter.subscribe('custom-event', callback);
emiter.publish('custom-event', args1, args2);
subscription.unsubscribe();
