import inventory from './inventory.js'
import {setTypes, setType} from './setTypes.js'
import {Product, createProduct} from './product.js'
import setFolders from './setFolders.js'

setFolders()
setTypes()

const selectValue = document.getElementById("type-select")
selectValue.addEventListener("change",()=> {
    console.log(selectValue.value)
})

inventory.displayItems()

const submitButton = document.getElementById("submit-button")

const currentImage = (function() {
    try{
        const cameraSvg = document.getElementById("camera-svg")
        const insertImage = document.getElementById("insert-pic-text")
        const imageSrc = JSON.parse(localStorage.getItem("image"))
        let itemImg = document.getElementById("item-img")
        itemImg.setAttribute('src', imageSrc);
        return imageSrc
    } catch(error) {

    }
})();

let savedItem = {
    name: "-",
    desc: "-",
    img: "-",
    qt: "-",
    pr: "-"
}

const textInputs = document.querySelectorAll('input[name="input-text"], textarea[name="input-text"]')

try{
    const savedItemLS =  JSON.parse(localStorage.getItem("savedItem"))
    if(savedItemLS) {
        savedItem = savedItemLS
        textInputs.forEach(input=> {
            input.value = savedItemLS[input.id]
        })
    }
    

} catch (error) {

} 


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
            };
            reader.readAsDataURL(input)
        }
    }

function submitInfo() {

    try {
        const name = document.getElementById("name").value
        const type= setType(document.getElementById("type-select").value)
        console.log(type)
        const desc = document.getElementById("desc").value
        const img = currentImage || "-"
        const inputImage = document.getElementById("image-placeholder")
        const qt = Number(document.getElementById("qt").value)
        const pr = Number(document.getElementById("pr").value)

        const newProduct = createProduct([name, desc, type, qt, pr])
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