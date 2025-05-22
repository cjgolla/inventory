import Folder from './folder.js'
import folderCollection from './folderCollection.js'

//Initializing new folder
function createFolder(name) {
    const folder = new Folder(name)
    folder.addProduct("cool stuff")
    folder.addProduct("neat shit")
    folderCollection.addFolder(name, folder.getFolder())
    console.log(folderCollection.get("shit").products)
    return folder
}

//Initializing folder functionality
function setFolders() {
    console.log(folderCollection)

    const confirm = document.createElement("button")
    confirm.textContent = "confirm"
    confirm.classList.add("confirm-button")

    //Buttons
    const removeButton = document.createElement("button")
    removeButton.textContent = "x"
    removeButton.classList.add("small-button")
    const addButton = document.getElementById("add-folder-button")

    //Folder
    const folderLabel = document.getElementById("folder-label")
    const folderInput = document.createElement("input")
    folderInput.id = "folder-input"

    //Input
    const inputLabel = document.createElement("label")
    inputLabel.textContent = "Enter New Folder"
    const inputContainer = document.createElement("div")
    inputContainer.style.display = "flex"
    inputContainer.style.alignItems = "center"
    inputContainer.id = "folder-input-container"
    inputContainer.style.display = "flex"
    
    //Adding input bar
    addButton.addEventListener("click", (e)=>{
        e.preventDefault()
        inputContainer.appendChild(folderInput)
        inputContainer.appendChild(confirm)
        inputContainer.appendChild(removeButton)
        inputLabel.appendChild(inputContainer)
        folderLabel.appendChild(inputLabel)
    })

    removeButton.addEventListener("click", (e)=> {
        e.preventDefault()
        folderLabel.removeChild(inputLabel)
    })

    //Confirming new folder
    confirm.addEventListener("click", (e)=> {
        e.preventDefault()
        const newFolder = createFolder(folderInput.value)
        console.log(newFolder)
        folderCollection.addFolder(folderInput.value, newFolder)
        console.log(folderCollection)
        localStorage.setItem("folders", JSON.stringify(folderCollection))
        folderLabel.removeChild(inputLabel)
    })
}

export default setFolders