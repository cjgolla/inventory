import inventory from './inventory.js'
import submitInfo from './submitInfo.js'

function editMode(name) {
    changeTitle()
    changeButton()

    try{
        inventory.set(JSON.parse(localStorage.getItem("inventory")))
        console.log(inventory)
    } catch (error) {
        console.log("Error getting inventory for edit mode", error)
    }
}

function changeTitle(){
    const addProduct = document.getElementById("add-product-title")
    const editProduct = document.getElementById("edit-product-title")
    addProduct.style.display = "none"
    editProduct.style.display = "block"
}

function changeButton(){
    const submitButton = document.getElementById("submit-button")
    const saveButton = document.getElementById("save-button")
    saveButton.addEventListener("click", (e)=> {
        e.preventDefault()
        submitInfo(saveData)
    })
}

export default editMode