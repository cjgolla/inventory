import Folder from './folder.js'
import folderCollection from './folderCollection.js'

function createFolder(name) {
    const folder = new Folder(name)
    folder.setProduct("Print", "cool stuff")
    console.log(folder)
    folderCollection.set(name)
    console.log(folderCollection.collection.get("shit"))

}

function setFolders() {
    const confirm = document.createElement("button")
    confirm.textContent = "confirm"
    confirm.classList.add("confirm-button")

    const folderLabel = document.getElementById("folder-label")
    const addButton = document.getElementById("add-folder-button")
    const folderInput = document.createElement("input")
    const inputContainer = document.createElement("div")

    inputContainer.style.display = "flex"
    inputContainer.style.alignItems = "center"
    inputContainer.id = "folder-input-container"
    inputContainer.style.display = "flex"
    
    addButton.addEventListener("click", (e)=>{
        e.preventDefault()
        inputContainer.appendChild(folderInput)
        inputContainer.appendChild(confirm)
        folderLabel.appendChild(inputContainer)
    })

    confirm.addEventListener("click", (e)=> {
        e.preventDefault()
        createFolder(folderInput.value)
    })
}

export default setFolders