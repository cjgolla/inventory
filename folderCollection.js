

class FolderCollection{
    constructor(){
        if (FolderCollection.instance == null) {
            this.collection = new Map()
            FolderCollection.instance = this;
        }
        return FolderCollection.instance
    }

    addFolder(name, folderObject){

        this.collection.set(name, folderObject)

        
       /*const folderArray = Array.from(this.collection.get().entries())
        localStorage.setItem("folderArray", JSON.stringify(folderArray))  */
    }

    setAll(folderEntries) {

        //for retrieving folders from local storage
        this.collection = new Map(folderEntries)
    }
    remove(name){
        this.collection.delete(name)
        const folderArray = Array.from(this.collection.entries())
        localStorage.setItem("folderArray", JSON.stringify(folderArray))
    }
    get(name){
        return this.collection.get(name)
    }
    getAll() {
        return Array.from(this.collection.entries())
    }
}

const folderCollection = new FolderCollection()

export default folderCollection