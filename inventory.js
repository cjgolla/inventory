class Inventory{
    constructor() {
        if (Inventory.instance == null) {
            this.inventory = new Map()
            try{
                const inventoryArray = JSON.parse(localStorage.getItem("inventory"))
                if(Array.isArray(inventoryArray)) {
                    this.inventory = new Map(inventoryArray)
                }
            } catch (error) {
                console.log(error)
            }
            Inventory.instance = this;
        }
        return Inventory.instance
    }

    set(obj) {
        this.inventory.set(obj.name, obj)
    }
    save() {
        localStorage.setItem("inventory", JSON.stringify([...this.inventory]))
    }

    get() {
        return this.inventory
    }
    hasKey(name) {
        return this.inventory.has(name)
    }
    displayItems() {
        this.inventory.forEach(item=> {
            console.log(item)
        })
    }
    remove(name){
        this.inventory.delete(name)
        localStorage.setItem("inventory", JSON.stringify([...this.inventory]))
    }

}

const inventory = new Inventory();
export default inventory