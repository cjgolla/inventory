import inventory from './inventory.js'
import {loadInputData, loadSavedImage} from './loadSavedData.js'
import {saveInputs, setTypeInputs, setType, setTypes} from './setTypes.js'

/* try{
    inventory = JSON.parse(localStorage.getItem("inventory"))
} catch (error) {
    console.log(error)
} */

const inventoryContainer = document.getElementById("inventory-container")

inventory.inventory.forEach((product)=> {


    const form = document.getElementById("form-product")
    const inventorySection = document.getElementById("form-inventory")

    const selectButton = document.createElement("button")
    const removeButton = document.createElement("button")
    removeButton.textContent = "o";
    removeButton.style.color = "red";

    selectButton.classList.add("small-button-select")
    selectButton.textContent = "o"
    const inventoryDiv = document.createElement("div")
    inventoryDiv.classList.add("inventory-item")
    inventoryDiv.style.display = "flex";
    inventoryDiv.style.alignItems= "center";
    inventoryDiv.style.justifyContent = "space-between"
    inventoryDiv.id = product.name

    const qt = document.createElement("div")
    qt.textContent = `qt. ${product.qt}`
    
    const listItem = document.createElement("li")
    listItem.textContent = product.name
    const image = document.createElement("img")
    const imgContainer = document.createElement("div")
    imgContainer.id = "img-container"
    imgContainer.classList.add("inv-img-container")
    image.src = product.img
    image.classList.add("inv-img")

    const type = document.createElement("div")
    type.textContent = product.type.name

    imgContainer.appendChild(image)
    inventoryDiv.appendChild(listItem)
    inventoryDiv.appendChild(type)
    inventoryDiv.appendChild(imgContainer)
    inventoryDiv.appendChild(qt)
    inventoryDiv.appendChild(selectButton)
    inventoryDiv.appendChild(removeButton)
    inventoryContainer.appendChild(inventoryDiv)

    removeButton.addEventListener("click", (e)=> {
        e.preventDefault()
        inventoryContainer.removeChild(inventoryDiv)
        inventory.remove(product.name)
    })
    selectButton.addEventListener("click",(e)=> {
        e.preventDefault();
        try{

            const saveButton = document.getElementById("save-button")
            const submitButton = document.getElementById("submit-product-button")
            saveButton.style.display = "block"
            submitButton.style.display = "none"
            const title = document.getElementById("form-title")
            title.textContent = "Edit Product"

            const savedItem = inventory.inventory.get(product.name)
            localStorage.setItem("savedItem",JSON.stringify(savedItem))
            localStorage.setItem("image",JSON.stringify(savedItem.img))
            localStorage.setItem("type",JSON.stringify(savedItem.type))
            loadSavedImage();
            loadInputData();
            inventorySection.style.display = "none";
            form.style.display = "block";
        } catch (error) {
            console.log(error)
        }
        
        
    })
})