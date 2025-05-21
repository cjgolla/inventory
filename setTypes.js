

function getOptions() { 
    
    let options;
    try{
        options = new Map(JSON.parse(localStorage.getItem("options")))
    } catch(error){
        console.log(error)
    }

    

    if(options.size === 0) {
    options = new Map()
    options.set("print", {type: "print", medium: ["matte", "foil", "canvas"], WL: {width: "", height: "", metric: "inc"}})
    options.set("acryllic charm", {type: "acryllic charm", medium: ["glass", "plastic", "metal"], WL: {width: "", height:"", metric: "inc"}})
    options.set("sticker", {type: "sticker", medium: ["matte", "foil", "canvas"], WL: {width: "", height: "", metric:"inc"}})
    options.set("shirt", {type: "shirt", size: ["xs", "s", "m", "l", "xl", "xx"]})
    const optionsString = JSON.stringify(Array.from(options.entries()))
    localStorage.setItem("options", optionsString)
    console.log("HELO")

}

    return options
}

function saveOptions(name, obj) {
    const options = getOptions()
    if(options.has(name) || name === "") {
        throw new Error("Name already exists")
    }
    options.set(name, obj)
    const optionsString = JSON.stringify(Array.from(options.entries()))
    console.log(options)
    localStorage.setItem("options", optionsString)
}


function setType(name) {
    const options = getOptions()
    const errorMessage = document.getElementById("error-message")
    let productOptions = {}
    const type = options.get(name)
    for (const option in type) {
        if(option === "medium"){
            const value = document.getElementById("medium").value
            if(value === "select medium") {
                errorMessage.textContent = "Select a medium"
                errorMessage.classList.add("slide-in")
                setTimeout(()=> {
                    errorMessage.classList.add("slide-back")
                }, 4000)
                
                throw new Error("Select an option")
            }
            productOptions = {...productOptions, "medium": value}
        }
        if(option === "WL") {
            const width = document.getElementById("width").value
            const length = document.getElementById("length").value

            productOptions = {...productOptions, ["WL"]: {...(productOptions.WL|| {}), ["length"]: length, ["width"]: width}}
            if(width === "" || length ==="") {
                errorMessage.classList.remove("slide-in")
                errorMessage.classList.remove("slide-back")
                errorMessage.textContent = "Set dimensions"
                errorMessage.classList.add("slide-in")
                throw new Error("Set dimensions")
            }
        }
    }
    return productOptions
}

function renderOptions() {
    const addButton = document.getElementById("add-option-button")
    const options = getOptions()
    const optionsContainer = document.getElementById("options-container-select")
    optionsContainer.remove(addButton)

    const newAddButton = document.createElement("button")
    newAddButton.classList.add("small-button")
    const selectContainer = document.getElementById("type-select")

    try{
        optionsContainer.removeChild(selectContainer)
    } catch (error) {

    }

    const newSelectContainer = document.createElement("select")
    optionsContainer.appendChild(newSelectContainer)
    optionsContainer.appendChild(newAddButton)

    options.forEach(option=> {
        const element = document.createElement("option")
        element.value = option.type
        element.textContent = option.type
        newSelectContainer.appendChild(element)
    })
}


function setTypes() {
    const addButton = document.getElementById("add-option-button")
    const options = getOptions()
    const optionContainer = document.createElement("div")
    optionContainer.id = "new-option-container"
    optionContainer.style.display = "flex"
    const selectContainer = document.getElementById("type-select")
    const defaultOption = document.createElement("option")
    const confirmOption = document.createElement("button")
    confirmOption.style.width ="70px"
    confirmOption.classList.add("small-button")
    confirmOption.textContent = "confirm"
    confirmOption.id="confirm-option"
    defaultOption.value = "option"
    defaultOption.textContent = "select option"
    const addInput = document.getElementById("add-option-input")
    

    addButton.addEventListener("click", (e)=> {
        const removeInput = document.getElementById("new-option-container")
        e.preventDefault()
        try{
            removeInput.removeChild(document.getElementById("option-input"))
        } catch (error) {

        }

        const optionInput = document.createElement("input")
        optionInput.id = "option-input";
        optionContainer.appendChild(optionInput)
        optionContainer.appendChild(confirmOption)
        
        addInput.appendChild(optionContainer)
        const newOption = document.createElement("option")

    })

    confirmOption.addEventListener("click", (e)=> {
        e.preventDefault()

        try {
            console.log(document.getElementById("option-input").value)
            const typeName = document.getElementById("option-input").value
            saveOptions(typeName, {type: typeName})
            
            optionContainer.removeChild(document.getElementById("option-input"))
            optionContainer.removeChild(confirmOption)
            addInput.removeChild(document.getElementById("new-option-container"))
            renderOptions()
        } catch (error) {
            console.log(error)
        }
        
    })

    selectContainer.appendChild(defaultOption)
    options.forEach(option=> {
        const element = document.createElement("option")
        element.value = option.type
        element.textContent = option.type
        selectContainer.appendChild(element)
    })

    selectContainer.addEventListener("change", (e)=> {
        
        const selectedOption = options.get(e.target.value)
        e.preventDefault()
        try {
            const container = document.getElementById("type-container")
            const fieldset = document.getElementById("type-options")
            fieldset.removeChild(container)
        } catch(err){

        }
        
        const typeFieldset = document.getElementById("type-options")
        const div = document.createElement("div")
        div.id = "type-container"
        for(const option in options.get(e.target.value)) {
            if(option === "medium") {
                const select = document.createElement("select")
                select.name = "medium"
                select.id = "medium"
                select.addEventListener("change", (e)=> {
                    e.preventDefault()
                })

                const defaultOption = document.createElement("option")
                defaultOption.textContent = "select medium"
                select.appendChild(defaultOption)
                options.get(e.target.value).medium.forEach(i=>{
                    const option = document.createElement("option")
                    option.textContent = i;
                    option.value = i;
                    select.appendChild(option)
                })
                div.appendChild(select)
                typeFieldset.appendChild(div)
            }
            if(option === "WL") {
                const container = document.createElement("div")
                container.style.display = "flex"
                const wLabel = document.createElement("label")
                const lLabel = document.createElement("label")
                const w = document.createElement("input")
                const l = document.createElement("input")

                w.id= "width"
                l.id = "length"

                l.addEventListener("change", (e)=> {
                    e.preventDefault()

                })

                wLabel.textContent = "Width"
                lLabel.textContent = "Length"

                wLabel.classList = "label"
                lLabel.classList = "label"
                w.type = "number"
                l.type = "number"
                w.classList = "number"
                l.classList = "number"
                wLabel.appendChild(w)
                lLabel.appendChild(l)
                container.appendChild(wLabel)
                container.appendChild(lLabel)
                div.appendChild(container)
            }

            if(option === "size") {
                console.log(selectedOption.size)
                const sizeContainer = document.createElement("div")
                const sizeSelect = document.createElement("select")
                selectedOption.size.forEach(size=> {
                    console.log(size)
                    const option = document.createElement("option")
                    option.value = size
                    option.textContent = size
                    sizeSelect.appendChild(option)
                })
                div.appendChild(sizeSelect)
                typeFieldset.appendChild(div)
                
            }
        }
    })
    
}


export {setTypes, setType}