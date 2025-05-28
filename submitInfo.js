import {setTypes, setType, setTypeInputs, saveInputs} from './setTypes.js'
import {Product, createProduct} from './product.js'
import inventory from './inventory.js'


function submitInfo(editMode, savedItem) {

    try {

        const currentImage = JSON.parse(localStorage.getItem("image"))
        const name = document.getElementById("name").value

        const savedName = inventory.inventory.get(name)

       let savedKey;

       if(savedItem){
            savedKey = savedItem.key;
       }
       console.log(savedKey)

       let filteredInventory;

       if(editMode){
            filteredInventory = new Map(
            [...inventory.inventory].filter(([mapKey, obj]) => obj.key !== savedKey)
            );
       }
        console.log("Filtered inventory: ", filteredInventory)

        const type= setType(document.getElementById("type-select").value)
        console.log("Type: ", type)
        const desc = document.getElementById("desc").value
        const img = currentImage || "-"
        
        const qt = Number(document.getElementById("qt").value)
        const pr = Number(document.getElementById("pr").value)
        const fldr = document.getElementById("folder-select").value
        const key = Math.random()

        const newProduct = createProduct([name, desc, type, qt, pr, fldr, currentImage, key])
        if(name === "" || desc === "" || qt === "" || pr === "") {
            console.log("You need to fill out all the inputs")
            return;
        }
        const nameError = document.getElementById("name-error")

        if(editMode && filteredInventory.has(name)) {
            console.log("Name already exists for product")
            return 
        }
        else if(editMode){
            filteredInventory.set(newProduct.name, newProduct)
            console.log("Updated FilteredInventory:",filteredInventory)
            localStorage.setItem("inventory", JSON.stringify([...filteredInventory]))
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
        console.log("New inventory",typeof inventory)
        inventory.save()
    } catch (error) {
        console.log(error)
    }
}

export default submitInfo