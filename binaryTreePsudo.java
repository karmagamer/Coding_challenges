
/*
I realized that recursively would be extremely easier to implement.

Just right recusrsive function that visit root.right and root.left as new root.
Variable sum keeps track of total sum

int TotalSum = 0;

getTotalSum(Node root){



//If root is null, return nothingk;
if(root ==null) return;

//if root.left and root.right is both null.
// TotalSum = TotalSum + root.value

if(root.left ==null && root.right ==null)
  return sum+= root.value

getTotalSum(root.left);

getTotalSum(root.right);


}



We can use the same recursive way to count total Nodes as well.

int TotalNodeCount;


getTotalNodeCount(Node root){


if(root==null) return 0;

if(root.left==null && root.right ==null){return 1;}

else
    TotalNodeCount += getTotalNodeCount(root.left) + getTotalNodeCount(root.right);
    return TotalNodeCount;



}





*/
