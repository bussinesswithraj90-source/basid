// ============================================
// BINARY TREE TRAVERSAL SIMULATOR
// 15 NODE VERSION
// ============================================


// ============================================
// 1. CREATE TREE NODE
// ============================================

class TreeNode {

    constructor(value) {

        this.value = value;

        this.left = null;

        this.right = null;

    }

}


// ============================================
// 2. CREATE 15-NODE BINARY TREE
// ============================================

const root = new TreeNode(1);

root.left = new TreeNode(2);
root.right = new TreeNode(3);

root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

root.left.left.left = new TreeNode(8);
root.left.left.right = new TreeNode(9);

root.left.right.left = new TreeNode(10);
root.left.right.right = new TreeNode(11);

root.right.left.left = new TreeNode(12);
root.right.left.right = new TreeNode(13);

root.right.right.left = new TreeNode(14);
root.right.right.right = new TreeNode(15);


// ============================================
// 3. STORE HTML NODE ELEMENTS
// ============================================

let nodeElements = {};


// ============================================
// 4. NODE POSITIONS
// ============================================

const positions = {

    1:  { x: 50, y: 10 },

    2:  { x: 30, y: 80 },
    3:  { x: 70, y: 80 },

    4:  { x: 20, y: 150 },
    5:  { x: 40, y: 150 },
    6:  { x: 60, y: 150 },
    7:  { x: 80, y: 150 },

    8:  { x: 15, y: 220 },
    9:  { x: 25, y: 220 },

    10: { x: 35, y: 220 },
    11: { x: 45, y: 220 },

    12: { x: 55, y: 220 },
    13: { x: 65, y: 220 },

    14: { x: 75, y: 220 },
    15: { x: 85, y: 220 }

};


// ============================================
// 5. DISPLAY TREE
// ============================================

function displayTree() {

    const tree = document.getElementById("tree");

    tree.innerHTML = "";

    nodeElements = {};


    const nodes = [

        1, 2, 3,
        4, 5, 6, 7,
        8, 9, 10, 11,
        12, 13, 14, 15

    ];


    nodes.forEach(value => {

        const node = document.createElement("div");

        node.className = "node";

        node.innerText = value;

        node.id = "node-" + value;


        // Position node

        node.style.left =
            `calc(${positions[value].x}% - 24px)`;

        node.style.top =
            `${positions[value].y}px`;


        tree.appendChild(node);


        nodeElements[value] = node;

    });

}


// ============================================
// 6. INORDER TRAVERSAL
// LEFT → ROOT → RIGHT
// ============================================

function inorder(node, result) {

    if (node === null) {

        return;

    }


    // Visit left subtree

    inorder(node.left, result);


    // Visit root

    result.push(node.value);


    // Visit right subtree

    inorder(node.right, result);

}


// ============================================
// 7. PREORDER TRAVERSAL
// ROOT → LEFT → RIGHT
// ============================================

function preorder(node, result) {

    if (node === null) {

        return;

    }


    // Visit root

    result.push(node.value);


    // Visit left subtree

    preorder(node.left, result);


    // Visit right subtree

    preorder(node.right, result);

}


// ============================================
// 8. POSTORDER TRAVERSAL
// LEFT → RIGHT → ROOT
// ============================================

function postorder(node, result) {

    if (node === null) {

        return;

    }


    // Visit left subtree

    postorder(node.left, result);


    // Visit right subtree

    postorder(node.right, result);


    // Visit root

    result.push(node.value);

}


// ============================================
// 9. START TRAVERSAL
// ============================================

async function startTraversal(type) {


    // Reset previous traversal

    resetTree();


    let traversal = [];


    // Select traversal method

    if (type === "inorder") {

        inorder(root, traversal);

    }

    else if (type === "preorder") {

        preorder(root, traversal);

    }

    else if (type === "postorder") {

        postorder(root, traversal);

    }


    let result = [];


    // ========================================
    // Animate each node
    // ========================================

    for (let value of traversal) {


        const node = nodeElements[value];


        // Highlight current node

        node.classList.add("active");


        // Show current node

        document.getElementById("currentNode")
            .innerText = value;


        // Add value to result

        result.push(value);


        document.getElementById("result")
            .innerText = result.join(" → ");


        // Wait 1 second

        await sleep(1000);


        // Remove yellow

        node.classList.remove("active");


        // Make green

        node.classList.add("visited");

    }


    // ========================================
    // Traversal completed
    // ========================================

    document.getElementById("currentNode")
        .innerText = "Completed";

}


// ============================================
// 10. DELAY FUNCTION
// ============================================

function sleep(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });

}


// ============================================
// 11. RESET TREE
// ============================================

function resetTree() {


    // Remove active and visited styles

    Object.values(nodeElements).forEach(node => {

        node.classList.remove("active");

        node.classList.remove("visited");

    });


    // Reset current node

    document.getElementById("currentNode")
        .innerText = "-";


    // Reset result

    document.getElementById("result")
        .innerText = "-";

}


// ============================================
// 12. DISPLAY TREE WHEN PAGE LOADS
// ============================================

displayTree();