const { minDepth } = require('../src/Minimum');

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

describe('minDepth', () => {
    test('returns 0 for an empty tree', () => {
        expect(minDepth(null)).toBe(0);
    });

    test('returns 1 for a single node tree', () => {
        const root = new TreeNode(1);
        expect(minDepth(root)).toBe(1);
    });

    test('returns correct depth for a right-skewed tree', () => {
        const root = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3)));
        expect(minDepth(root)).toBe(3);
    });

    test('returns min depth when both children exist', () => {
        const root = new TreeNode(1,
            new TreeNode(2, new TreeNode(4), new TreeNode(5)),
            new TreeNode(3)
        );
        expect(minDepth(root)).toBe(2);
    });
});
