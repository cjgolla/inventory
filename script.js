import inventory from './inventory.js'
import {setTypes, setType, setTypeInputs, saveInputs} from './setTypes.js'
import {Product, createProduct} from './product.js'
import setFolders from './setFolders.js'
let imgSrc = ''

setFolders()
setTypes()

const selectValue = document.getElementById("type-select")

inventory.displayItems()

const submitButton = document.getElementById("submit-button")

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

let savedItem = {
    name: "-",
    desc: "-",
    type: "-",
    img: "-",
    qt: "-",
    pr: "-"
}

const typeSelect = document.getElementById("type-select")
const textInputs = document.querySelectorAll('input[name="input-text"], textarea[name="input-text"]')

function saveData() {
    
}

try{
    const savedItemLS =  JSON.parse(localStorage.getItem("savedItem"))
    const savedType = JSON.parse(localStorage.getItem("type"))
    console.log(savedType)
   
    setTypeInputs(savedType.type, savedType)
    if(savedItemLS) {
        savedItem = savedItemLS
        textInputs.forEach(input=> {
            input.value = savedItemLS[input.id]
        })
    }
} catch (error) {

} 


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

function submitInfo() {

    try {
        const name = document.getElementById("name").value
        const type= setType(document.getElementById("type-select").value)
        console.log(type)
        const desc = document.getElementById("desc").value
        const img = currentImage || "-"
        
        const qt = Number(document.getElementById("qt").value)
        const pr = Number(document.getElementById("pr").value)
        const fldr = document.getElementById("folder-select").value

        const newProduct = createProduct([name, desc, type, qt, pr, fldr, imgSrc])
        console.log(newProduct)

        if(name === "" || desc === "" || qt === "" || pr === "") {
            console.log("You need to fill out all the inputs")
            return;
        }
        const nameError = document.getElementById("name-error")
        if(inventory.hasKey(name)) {
            nameError.style.display = "inline"
            console.log("Name already exists")
            return
        } else {
            nameError.style.display = "none"
        }
        console.log("Name is good")
        inventory.set(newProduct)
        const inventoryArray = Array.from(inventory.get().entries())
        localStorage.setItem("inventory", JSON.stringify(inventoryArray))
    } catch (error) {
        console.log(error)
    }
}

submitButton.addEventListener("click", (e)=> {
    e.preventDefault()
    submitInfo()
})