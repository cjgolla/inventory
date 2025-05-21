class Folder {
    constructor(name){
        this.name = name
        this.folder = new Map()
    }
    setProduct(name, product) {
        this.folder.set(name, product)
    }
    getFolder() {
        return this.folder
    }
}

export default Folder