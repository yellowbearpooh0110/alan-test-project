export class BTreeNode {
  constructor(value: number, index: number) {
    this.value = value;
    this.index = index;
  }
  left: BTreeNode | null = null;
  right: BTreeNode | null = null;
  parent: BTreeNode | null = null;
  value: number;
  index: number;
}

export type BTreeDataType = {
  node: BTreeNode;
  position: number;
};

export class BTree {
  constructor() {
    this.index = 0;
  }
  private index: number;
  head: BTreeNode | null = null;
  addNode(data: number): void {
    const newNode = new BTreeNode(data, this.index++);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let tmp: BTreeNode = this.head;
    let flag: boolean = true;
    while (flag) {
      if (tmp.value <= data) {
        if (tmp.right === null) {
          tmp.right = newNode;
          newNode.parent = tmp;
          flag = false;
        } else tmp = tmp.right;
      } else {
        if (tmp.left === null) {
          tmp.left = newNode;
          newNode.parent = tmp;
          flag = false;
        } else tmp = tmp.left;
      }
    }
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
        }
      }
    }

    if (switchNode !== null) switchNode.parent = node.parent;
  }

  getAllNodes(): Array<BTreeDataType> {
    return this.traverseNode(this.head, 1);
  }

  private traverseNode(
    node: BTreeNode | null,
    position: number
  ): Array<BTreeDataType> {
    if (node === null) return [];
    return [
      ...this.traverseNode(node.left, position * 2),
      { node, position: position },
      ...this.traverseNode(node.right, position * 2 + 1)
    ];
  }
}

export const getLayer = (position: number): number =>
  Math.floor(Math.log2(position));

export const getSequence = (position: number): number => {
  const layer = Math.floor(Math.log2(position));
  return position - Math.pow(2, layer);
};
