let inventory;

try{
    inventory = JSON.parse(localStorage.getItem("inventory"))
} catch (error) {
    console.log(error)
}

const inventoryContainer = document.getElementById("inventory-container")

inventory.forEach(product=> {
    const selectButton = document.createElement("button")
    selectButton.classList.add("small-button-select")
    selectButton.textContent = "o"
    const inventoryDiv = document.createElement("div")
    inventoryDiv.classList.add("inventory-item")
    inventoryDiv.style.display = "flex";
    inventoryDiv.style.alignItems= "center";
    inventoryDiv.style.justifyContent = "space-between"

    const qt = document.createElement("div")
    qt.textContent = `qt. ${product[1].qt}`
    
    const listItem = document.createElement("li")
    listItem.textContent = product[1].name
    const image = document.createElement("img")
    const imgContainer = document.createElement("div")
    imgContainer.id = "img-container"
    imgContainer.classList.add("inv-img-container")
    image.src = product[1].img
    image.classList.add("inv-img")

    const type = document.createElement("div")
    type.textContent = product[1].type.name

    imgContainer.appendChild(image)
    inventoryDiv.appendChild(listItem)
    inventoryDiv.appendChild(type)
    inventoryDiv.appendChild(imgContainer)
    inventoryDiv.appendChild(qt)
    inventoryDiv.appendChild(selectButton)
    inventoryContainer.appendChild(inventoryDiv)
})