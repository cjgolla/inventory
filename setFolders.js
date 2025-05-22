import Folder from './folder.js'
import folderCollection from './folderCollection.js'

function setCollection() {
    try{
        const folderEntries = JSON.parse(localStorage.getItem("folders"));
        folderCollection.setAll(folderEntries);
    } catch (error) {

    }
    folderCollection.addFolder("anime", {name:"anime"})
    folderCollection.addFolder("cartoon", {name:"cartoon"})
    return folderCollection;
}

function renderFolders(name) {
    const folderSelect = document.getElementById("folder-select")
    folderCollection.collection.forEach(folder=>{
        const option = document.createElement("option")
        option.value = folder.name
        option.textContent = folder.name
        folderSelect.value = folder.name
        option.for = "folder-select"
        folderSelect.appendChild(option)
    })
    if(name) {
        folderSelect.value = name
    }
}

//Initializing new folder
function createFolder(name) {
    const folder = new Folder(name)
    folder.addProduct("cool stuff")
    folder.addProduct("neat shit")
    folderCollection.addFolder(name, folder.getFolder())
    let foldersArray = JSON.stringify(Array.from(folderCollection.collection.entries()));
    console.log(foldersArray)
    localStorage.setItem("folders", foldersArray)
    renderFolders(name)
    return folder
}

//Initializing folder functionality
function setFolders() {
    setCollection()
    renderFolders()

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
        createFolder(folderInput.value)
        folderLabel.removeChild(inputLabel)
    })
}

export default setFolders