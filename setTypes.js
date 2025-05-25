//Gets and returns options if found in LS, otherwise only default options will return

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

    localStorage.setItem("options", optionsString)
}

function setType(name) {
    const options = getOptions()
    const errorMessage = document.getElementById("error-message")
    let productOptions = {"name": name}
    const type = options.get(name)
    for (const option in type) {
        if(option === "medium"){
            const value = document.getElementById("medium").value
            /* if(value === "select medium") {
                errorMessage.textContent = "Select a medium"
                errorMessage.classList.add("slide-in")
                setTimeout(()=> {
                    errorMessage.classList.add("slide-back")
                }, 4000)
                
                throw new Error("Select an option")
            } */
            productOptions = {...productOptions, "medium": value}
        }
        if(option === "WL") {
            
            const width = document.getElementById("width").value
            const length = document.getElementById("length").value

            productOptions = {...productOptions, ["WL"]: {...(productOptions.WL|| {}), ["length"]: length, ["width"]: width}}
            /* if(width === "" || length ==="") {
                errorMessage.classList.remove("slide-in")
                errorMessage.classList.remove("slide-back")
                errorMessage.textContent = "Set dimensions"
                errorMessage.classList.add("slide-in")
                throw new Error("Set dimensions")
            } */
        }
    }
    return productOptions
}

function renderOptions(name) {
    const options = getOptions()
    const selectContainer = document.getElementById("type-select")
    const oldOptions = document.querySelectorAll('option[value="option-type"]')
    oldOptions.forEach(option=> {
        selectContainer.removeChild(option)
    })
    options.forEach(option=> {
        const element = document.createElement("option")
        element.value = option.type
        element.textContent = option.type
        selectContainer.appendChild(element)
    })
    if(name) {
        selectContainer.value = name
    }
}

function setTypes() {
    const optionsContainer = document.getElementById("options-container-select")
    
    //Buttons for adding and confirming new types
    const addButton = document.getElementById("add-option-button")
    const confirmOption = document.createElement("button")
    confirmOption.style.width ="70px"
    confirmOption.classList.add("small-button")
    confirmOption.textContent = "confirm"
    confirmOption.id="confirm-option"
    const removeButton = document.createElement("button")
    removeButton.classList.add("small-button")
    removeButton.textContent = "x"

    //Getting options from LS if possible
    const options = getOptions()
    const optionContainer = document.createElement("div")
    optionContainer.id = "new-option-container"
    optionContainer.style.display = "flex"
    const selectContainer = document.getElementById("type-select")

    const defaultOption = document.createElement("option")
    defaultOption.value = "option"
    defaultOption.textContent = "select option"
    
    //Selects div for adding optional inputs
    const addInput = document.getElementById("add-option-input")

    //creates label for the new type input
    const newTypeLabel = document.createElement("label")
    newTypeLabel.for = optionContainer
    newTypeLabel.textContent = "Enter New Type"
    newTypeLabel.id = "new-type-label"
    
    const optionInput = document.createElement("input")
    optionInput.id = "option-input";

    addButton.addEventListener("click", (e)=> {
        const removeInput = document.getElementById("new-option-container")
        e.preventDefault()
        try{
            removeInput.removeChild(document.getElementById("option-input"))
        } catch (error) {

        }

        //Appending options
        optionContainer.appendChild(optionInput)
        optionContainer.appendChild(confirmOption)
        optionContainer.appendChild(removeButton)
        newTypeLabel.appendChild(optionContainer)
        addInput.appendChild(newTypeLabel)

    })

    removeButton.addEventListener("click", (e)=> {
        e.preventDefault()
        optionContainer.removeChild(document.getElementById("option-input"))
        addInput.removeChild(document.getElementById("new-type-label"))
    })

    //Confirmming option
    confirmOption.addEventListener("click", (e)=> {
        e.preventDefault()
         if(document.getElementById("option-input").value === "") {
            optionContainer.removeChild(document.getElementById("option-input"))
            optionContainer.removeChild(confirmOption)
            
            addInput.removeChild(newTypeLabel)

            return
        }
        const typeName = document.getElementById("option-input").value
        optionContainer.removeChild(removeButton)
        optionContainer.removeChild(confirmOption)
        optionContainer.removeChild(optionInput)
        addInput.removeChild(newTypeLabel)
        saveOptions(typeName, {type: typeName})
        selectContainer.value = typeName
        
        renderOptions(typeName)
        
    })

    //Adding select options
    selectContainer.appendChild(defaultOption)
    options.forEach(option=> {

        const element = document.createElement("option")
        element.value = option.type
        element.type = "option-type"
        element.value = option.type
        element.textContent = option.type
        selectContainer.appendChild(element)

    })

    //Change options panel based on the type ie adding width and length inputs for prints
    // or selecting shirt sizes for shirts
    selectContainer.addEventListener("change", (e)=> {
        setTypeInputs(e.target.value)
        saveInputs()
    })
}

const typeSelect = document.getElementById("type-select")


function setTypeInputs(name, savedData) {
    const options = getOptions()
    const typeSelect = document.getElementById("type-select")
    if(savedData) {
        typeSelect.value = savedData.type
    }
    
    typeSelect.addEventListener("change", (e)=> {
        e.preventDefault()
    })

        try {
            const container = document.getElementById("type-container")
            const fieldset = document.getElementById("type-options")
            fieldset.removeChild(container)
        } catch(err){

        }
        const typeFieldset = document.getElementById("type-options")
        const div = document.createElement("div")
        div.id = "type-container"
        let optionsSelected;
        if(savedData) {
            optionsSelected = options.get(savedData.type)
        } else {
            optionsSelected = options.get(name)
        }
        for(const option in optionsSelected) {
            if(option === "medium") {
                const select = document.createElement("select")
            
                select.name = "medium"
                select.id = "medium"
                select.addEventListener("change", (e)=> {
                    e.preventDefault()
                    saveInputs()
                })
                const defaultOption = document.createElement("option")
                defaultOption.textContent = "select medium"
                select.appendChild(defaultOption)
                optionsSelected.medium.forEach(i=>{
                    const option = document.createElement("option")
                    option.textContent = i;
                    option.value = i;
                    select.appendChild(option)
                })
                div.appendChild(select)
                typeFieldset.appendChild(div)
                if(savedData) {
                    select.value = savedData.medium
                }
            }
            if(option === "WL") {
                const container = document.createElement("div")
                container.style.display = "flex"
                const wLabel = document.createElement("label")
                const lLabel = document.createElement("label")
                const w = document.createElement("input")
                const l = document.createElement("input")
                w.addEventListener("change", (e)=> {
                    e.preventDefault()
                    saveInputs()
        
                })
                l.addEventListener("change", (e)=> {
                    e.preventDefault()
                    saveInputs()
                    savedItem.type.WL.length = l.value 
                })
                w.id= "width"
                l.id = "length"

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

                if(savedData) {
                    l.value = savedData.WL.l
                    w.value = savedData.WL.w
                }
            }

            if(option === "size") {
                const sizeContainer = document.createElement("div")
                const sizeSelect = document.createElement("select")
                sizeSelect.id = "size-select";
                optionsSelected.size.forEach(size=> {
                    const option = document.createElement("option")
                    option.value = size
                    option.textContent = size
                    sizeSelect.appendChild(option)
                })
                div.appendChild(sizeSelect)
                typeFieldset.appendChild(div)
            }
        }
}

function saveInputs(){
    const typeSelect = document.getElementById("type-select").value
    const options = getOptions(typeSelect).get(typeSelect)
    let productOptions = {"type": typeSelect};
    for(const option in options) {
        if(option === "medium"){
            const medium = document.getElementById("medium").value
            
            productOptions = {...productOptions, "medium": medium}
        }
        if(option === "WL"){
            productOptions = {...productOptions, "WL": {"w": document.getElementById("width").value, "l": document.getElementById("length").value}}
            
        }
        if(option === "size"){
            const sizeValue = document.getElementById("size-select")
            productOptions = {...productOptions, "size": sizeValue}
        }
    }
    localStorage.setItem("type", JSON.stringify(productOptions))
}

export {setTypes, setType, setTypeInputs, saveInputs}