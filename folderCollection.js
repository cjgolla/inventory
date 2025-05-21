

class FolderCollection{
    constructor(){
        if (FolderCollection.instance == null) {
            this.collection = new Map()
            try{
                const inventoryArray = JSON.parse(localStorage.getItem("collection"))
                this.collection = new Map(inventoryArray)
            } catch (error) {
                console.log(error)
            }
        }
        return FolderCollection.instance
    }

    set(name){

        this.collection.set(name, {})

        
       /*  const folderArray = Array.from(this.collection.get().entries())
        localStorage.setItem("folderArray", JSON.stringify(folderArray))  */
    }
    remove(name){
        this.collection.remove(name)
        const folderArray = Array.from(inventory.get().entries())
        localStorage.setItem("folderArray", JSON.stringify(folderArray))
    }
    get(name){
        return this.collection.get(name)
    }
}

const folderCollection = new FolderCollection()

export default folderCollection