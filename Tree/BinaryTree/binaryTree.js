class BinaryTreeNode{
    constructor(key,value=key,parent=null){
        this.key = key;
        this.value= value;
        this.parent = parent;
        this.left= null;
        this.right= null;
    }
    get isLeaf(){
        return this.left=== null && this.right===null;
    }
    get hasChildren(){
        return !this.isLeaf;
    }
}
class BinaryTree{
    constructor(key,value=key){
        this.root = new BinaryTreeNode(key,value);
    }
    *preOrderTraversal(node= this.root){
        yield node;
        if(node.left) yield* this.preOrderTraversal(node.left);
        if(node.right) yield* this.preOrderTraversal(node.right);
    }
    insert(parentKey, key,value= key, {left ,right} = {left:true,right:true}){

        for(let node of this.preOrderTraversal()){
            if(node.key === parentKey){
                const canInserLeft = left && node.left === null;
                const canInsertRigth = right && node.right === null;
                if(!canInserLeft && !canInsertRigth) return false;
                if(canInserLeft){
                    node.left = new BinaryTreeNode(key,value,node);
                    return true;
                }
                if(canInsertRigth){
                    node.right = new BinaryTreeNode(key,value,node);
                    return true;
                }
            }
        }
        return false;
    }
}

const tree = new BinaryTree(1,"AB");
tree.insert(1,11,'AC');
tree.insert(1,12,'bc');
tree.insert(12,121,'bg',{right:true});

[...tree.preOrderTraversal()].map(x =>{
    console.log(x.value);
})