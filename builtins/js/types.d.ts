declare class Viz {
    array: array
    SLL: SLL
}

declare class SLL {
    next: null | SLL
    value: any
}
declare class DLL {
    next: null | DLL
    prev: null | DLL
    value: any
}
declare type array = {
    sortedInts: (length: number) => number[]
}
declare class BTree {
    left: BTree
    right: BTree
    value: any
}
declare class BST extends BTree { }