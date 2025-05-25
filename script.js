import inventory from './inventory.js'
import {setTypes, setType, setTypeInputs, saveInputs} from './setTypes.js'
import {Product, createProduct} from './product.js'
import setFolders from './setFolders.js'
import editMode from './editMode.js'
import submitInfo from './submitInfo.js'
import {loadSavedImage, loadInputData} from './loadSavedData.js'
let imgSrc = ''

setFolders()
setTypes()

const selectValue = document.getElementById("type-select")

inventory.displayItems()

const submitButton = document.getElementById("submit-button")
const saveButton = document.getElementById("save-button")
const textInputs = document.querySelectorAll('input[name="input-text"], textarea[name="input-text"]')
const currentImage = (function() {
    try{
        const cameraSvg = document.getElementById("camera-svg")
        const insertImage = document.getElementById("insert-pic-text")
        const imageSr = JSON.parse(localStorage.getItem("image"))
        let itemImg = document.getElementById("item-img")
        itemImg.setAttribute('src', imageSr);
        imgSrc = imageSr
        return imageSr
    } catch(error) {

    }
})();

let savedItem = loadInputData()

const typeSelect = document.getElementById("type-select")
typeSelect.addEventListener("change", (e)=> {
    e.preventDefault()
    setTypeInputs(e.target.value)
    

})

textInputs.forEach(input => {
    input.addEventListener("change", (e)=> {
        e.preventDefault()
        savedItem[e.target.id] = e.target.value
        localStorage.setItem("savedItem", JSON.stringify(savedItem))
})
})

const itemImg = document.getElementById("item-img")
const cameraSvg = document.getElementById("camera-svg")
const insertImage = document.getElementById("insert-pic-text")
if(currentImage) {
    cameraSvg.style.display = "none"
    insertImage.style.display = "none"
    console.log("Current image available")
    itemImg.style.display = "block"
} else {
    cameraSvg.style.display = "block"
    insertImage.style.display = "block"
    console.log("No current image")
}

const inputImageFile = document.getElementById("input-image")   
inputImageFile.addEventListener("change", (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    displayPicture(file)
    currentImage()
})

function displayPicture(input) {
    console.log(input)
    if (input) {
        console.log("file", input)
        const reader = new FileReader();
        reader.onload = (e)=> {
            const cameraSvg = document.getElementById("camera-svg")
            const insertImage = document.getElementById("insert-pic-text")
            e.preventDefault()
            cameraSvg.style.display = "none"
            insertImage.style.display = "none"
            
            let itemImg = document.getElementById("item-img")
            itemImg.setAttribute('src', e.target.result);
            itemImg.style.display="block"
            console.log(e.target.result)
            localStorage.setItem("image", JSON.stringify(e.target.result))
            imgSrc = e.target.result
            console.log(imgSrc)
        };
        reader.readAsDataURL(input)
    }
}

function saveImage() {}



submitButton.addEventListener("click", (e)=> {
    e.preventDefault()
    submitInfo()
})