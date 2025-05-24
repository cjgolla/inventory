function toggleInventory() {
    const inventoryButton = document.getElementById("inventory-button")
    const addProductButton = document.getElementById("add-product-button")
    const inventoryForm = document.getElementById("form-inventory")
    const productForm = document.getElementById("form-product")

    inventoryButton.addEventListener("click", ()=> {
        productForm.style.display = "none"
        inventoryForm.style.display = "block"
    })
    addProductButton.addEventListener("click", ()=> {
        productForm.style.display = "block"
        inventoryForm.style.display = "none"
    })
}

toggleInventory()