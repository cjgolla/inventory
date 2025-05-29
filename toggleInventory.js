import { loadInputData } from "./loadSavedData.js"

function toggleInventory() {
    const inventoryButton = document.getElementById("inventory-button")
    const addProductButton = document.getElementById("add-product-button")
    const inventoryForm = document.getElementById("form-inventory")
    const productForm = document.getElementById("form-product")
    const submitButton = document.getElementById("submit-product-button")
    const saveButton = document.getElementById("save-button")

    inventoryButton.addEventListener("click", ()=> {
        productForm.style.display = "none"
        inventoryForm.style.display = "block"
    })
    addProductButton.addEventListener("click", ()=> {
        localStorage.removeItem("savedItem")
        localStorage.removeItem("type")
        loadInputData()
        productForm.style.display = "block"
        inventoryForm.style.display = "none"
        const title = document.getElementById("form-title")
        title.textContent = "Add Product"
        console.log(submitButton)
        submitButton.style.display = "block"
        saveButton.style.display = "none"
    })
}

toggleInventory()