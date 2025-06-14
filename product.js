class Product{
    constructor(name, desc, type, qt, pr, fldr, img, key) {
        this.name = name;
        this.desc = desc;
        this.type = type;
        this.qt = Number(qt);
        this.pr = Number(pr);
        this.fldr = fldr;
        this.img = img;
        this.key = key;
    }
    setName(newName) {
        this.name = newName
    }
    setDesc(newDesc) {
        this.desc = newDesc;
    }
    setType(newType) {
        this.type = newType;
    }
    setQt(newQt){
        this.qt = newQt;
    }
    setPr(newPr){
        this.pr = newPr;
    }

    display() {
        console.log(this)
    }
}

function createProduct(obj) {
    
    const product = new Product(...obj)
    console.log(product)
    return product
}

export  {Product, createProduct}