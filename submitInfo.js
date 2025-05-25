import {setTypes, setType, setTypeInputs, saveInputs} from './setTypes.js'
import {Product, createProduct} from './product.js'
import inventory from './inventory.js'

function submitInfo(editMode) {

    try {
        const currentImage = JSON.parse(localStorage.getItem("image"))
        const name = document.getElementById("name").value
        const type= setType(document.getElementById("type-select").value)
        console.log(type)
        const desc = document.getElementById("desc").value
        const img = currentImage || "-"
        
        const qt = Number(document.getElementById("qt").value)
        const pr = Number(document.getElementById("pr").value)
        const fldr = document.getElementById("folder-select").value

        const newProduct = createProduct([name, desc, type, qt, pr, fldr, currentImage])
        console.log(newProduct)

        if(name === "" || desc === "" || qt === "" || pr === "") {
            console.log("You need to fill out all the inputs")
            return;
        }
        const nameError = document.getElementById("name-error")

        if(editMode && savedItem.name !== name && inventory.hasKey(name)) {
            console.log("Name already exists for product")
            return 
        }
        else if(!editMode && inventory.hasKey(name)) {
            nameError.style.display = "inline"
            console.log("Name already exists")
            return
        } else {
            nameError.style.display = "none"
        }
        console.log("Name is good")
        inventory.set(newProduct)
        console.log("New inventory", inventory)
        const inventoryArray = Array.from(inventory.get().entries())
        localStorage.setItem("inventory", JSON.stringify(inventoryArray))
    } catch (error) {
        console.log(error)
    }
}

export default submitInfo