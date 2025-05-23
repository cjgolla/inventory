let inventory;

try{
    inventory = JSON.parse(localStorage.getItem("inventory"))
} catch (error) {
    console.log(error)
}

console.log(inventory)

const inventoryContainer = document.getElementById("inventory-container")

inventory.forEach(product=> {
    const selectButton = document.createElement("button")
    selectButton.classList.add("small-button-select")

    selectButton.textContent = "o"
    const inventoryDiv = document.createElement("div")
    inventoryDiv.classList.add("inventory-item")
    inventoryDiv.style.display = "flex";
    inventoryDiv.style.alignItems= "center";
    
    const listItem = document.createElement("li")
    listItem.textContent = product[1].name
    const image = document.createElement("img")
    const imgContainer = document.createElement("div")
    imgContainer.id = "img-container"
    imgContainer.classList.add("inv-img-container")
    image.src = product[1].img
    image.classList.add("inv-img")
    console.log(image.src)
    inventoryDiv.appendChild(listItem)
    imgContainer.appendChild(image)
    inventoryDiv.appendChild(imgContainer)
    inventoryDiv.appendChild(selectButton)
    inventoryContainer.appendChild(inventoryDiv)
})