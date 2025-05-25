import {setTypes, setType, setTypeInputs, saveInputs} from './setTypes.js'

function loadSavedImage(){
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
};

function loadInputData(){
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
        textInputs.forEach(input => {
    input.addEventListener("change", (e)=> {
        e.preventDefault()
        savedItem[e.target.id] = e.target.value
        localStorage.setItem("savedItem", JSON.stringify(savedItem))
})
})

    } catch (error) {
        console.log("Error loading data: ", error)
    } 
    return savedItem

}

export {loadSavedImage, loadInputData}