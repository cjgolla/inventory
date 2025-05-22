class Folder {
    constructor(name){
        this.name = name
        this.products = []
    }
    addProduct(product) {
        this.products.push(product)
    }
    getFolder() {
        return {
            name: this.name,
            products: this.products
        }
    }

}

export default Folder