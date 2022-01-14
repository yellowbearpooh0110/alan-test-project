export class BTreeNode {
  constructor(value: number, index: number, position: number) {
    this.value = value;
    this.index = index;
    this.position = position;
  }
  left: BTreeNode | null = null;
  right: BTreeNode | null = null;
  parent: BTreeNode | null = null;
  position: number;
  value: number;
  index: number;
}

export class BTree {
  constructor() {
    this.index = 0;
  }
  private treeList: Array<BTreeNode> = [];
  private index: number;
  head: BTreeNode | null = null;
  addNode(data: number): BTreeNode {
    const newNode = new BTreeNode(data, this.index++, 1);
    if (this.head === null) {
      this.head = newNode;
      this.treeList.push(newNode);
      return newNode;
    }
    let tmp: BTreeNode = this.head;
    let flag: boolean = true;
    while (flag) {
      if (tmp.value <= data) {
        if (tmp.right === null) {
          tmp.right = newNode;
          newNode.position = tmp.position * 2 + 1;
          newNode.parent = tmp;
          flag = false;
        } else tmp = tmp.right;
      } else {
        if (tmp.left === null) {
          tmp.left = newNode;
          newNode.position = tmp.position * 2;
          newNode.parent = tmp;
          flag = false;
        } else tmp = tmp.left;
      }
    }
    this.treeList.push(newNode);
    return newNode;
  }

  removeNode(node: BTreeNode): void {
    let switchNode: BTreeNode | null = null;
    if (node.right === null) switchNode = node.left;
    else {
      let tmp: BTreeNode = node.right;
      let flag: boolean = true;
      while (flag) {
        if (tmp.left === null) {
          switchNode = tmp;
          flag = false;
        } else tmp = tmp.left;
      }
    }

    // Handle Swich
    if (node.parent === null) this.head = switchNode;
    else {
      if (node.parent.value > node.value) node.parent.left = switchNode;
      else node.parent.right = switchNode;
    }

    if (node.left !== switchNode) {
      if (switchNode !== null) {
        switchNode.left = node.left;
        if (node.left !== null) node.left.parent = switchNode;

        if (node.right !== switchNode) {
          if (node.right !== null) node.right.parent = switchNode;
          if (switchNode.parent !== null) {
            switchNode.parent.left = switchNode.right;
            if (switchNode.right)
              switchNode.right.parent = switchNode.parent.left;
          }
          switchNode.right = node.right;
        } else {
          this.repositionSubTree(switchNode.right, node.position * 2 + 1);
        }
      }
    } else {
      if (switchNode !== null) {
        this.repositionSubTree(switchNode.left, node.position * 2);
        this.repositionSubTree(switchNode.right, node.position * 2 + 1);
      }
    }

    if (switchNode !== null) {
      switchNode.parent = node.parent;
      switchNode.position = node.position;
    }
    this.treeList.splice(this.treeList.indexOf(node), 1);
  }

  getAllNodes(): Array<BTreeNode> {
    return this.treeList;
  }

  private repositionSubTree(node: BTreeNode | null, position: number): void {
    const tmp: Array<BTreeNode> = [];
    if (node === null) return;
    node.position = position;
    let ele: BTreeNode | undefined = node;
    while (ele !== undefined) {
      if (ele.left !== null) {
        ele.left.position = ele.position * 2;
        tmp.push(ele.left);
      }
      if (ele.right !== null) {
        ele.right.position = ele.position * 2 + 1;
        tmp.push(ele.right);
      }
      ele = tmp.shift();
    }
  }
}

export const getLayer = (position: number): number =>
  Math.floor(Math.log2(position));

export const getSequence = (position: number): number => {
  const layer = Math.floor(Math.log2(position));
  return position - Math.pow(2, layer);
};
