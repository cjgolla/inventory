class Inventory{
    constructor() {
        if (Inventory.instance == null) {
            this.inventory = new Map()
            try{
                const inventoryArray = JSON.parse(localStorage.getItem("inventory"))
                this.inventory = new Map(inventoryArray)
            } catch (error) {
                console.log(error)
            }
        }
        return Inventory.instance
    }

    set(obj) {
        this.inventory.set(obj.name, obj)
        console.log(this.inventory)
    }

    get() {
        return this.inventory
    }
    hasKey(name) {
        let match = ""
        this.inventory.forEach(key=>{
           if(key.name === name) {
                match = 1
           } 
        })
        if(match === 1) {
            return true
        }
    }
    displayItems() {
        this.inventory.forEach(item=> {
            console.log(`${item.name}, qt. ${item.qt} pr. ${item.pr}`)
        })
    }

}

const inventory = new Inventory();
export default inventory