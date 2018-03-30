/*
Given a sorted (increasing order) array with unique integer elements,
write an algorithm to create a binary search tree with minimal height.

*/
/*
 Assume that Tree node exists


*/
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        if(nums==null){return null;}
        TreeNode root = sortAtBhelper(nums,0,nums.length-1);
        return root;
    }
    public TreeNode sortAtBhelper(int[] nums, int left, int right){
        if(left>right){return null;}
        int mid = (left+right)/2;
        TreeNode temp = new TreeNode(nums[mid]);
        temp.left=sortAtBhelper(nums,left,mid-1);
        temp.right=sortAtBhelper(nums,mid+1,right);
        return temp;
    }
}

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return minimalBST(nums,0,nums.length-1);
    }
    TreeNode minimalBST(int nums[],int start,int end){
        if(end<start){return null;};
        int mid = (start+end)/2;
        TreeNode n = new TreeNode(nums[mid]);
        n.left = minimalBST(nums,start,mid-1);
        n.right = minimalBST(nums,mid+1,end);

        return n;
    }

}
