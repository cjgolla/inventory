import inventory from './inventory.js'
import cart from './cart.js'

const cartDisplay = document.getElementById("cart-display")
const cartCheck = document.getElementById("cart-item-check")
const clearCart = document.getElementById("clear-cart")
const select = document.getElementById("select-folder")

function setCart(inventory){
    displayCart()
    clearCart.addEventListener("click", (e)=>{
        e.preventDefault()
        cart.clear();
        clearTable()
        displayCart()
    })

    const foldersRaw = localStorage.getItem("folders")
    const folders = new Map(foldersRaw? JSON.parse(foldersRaw): []);
    folders.forEach(folder=> {
        const option = document.createElement("option")
        console.log(folder.name)
        option.value = folder.name
        option.textContent = folder.name
        select.appendChild(option)
    })
    select.addEventListener("change", ()=>{
        displayCart()
        let inventoryArray = []
        inventory.forEach(item=>{
            if(item.fldr===select.value) {
                const number = document.createElement("input")
                number.type = "number";
                number.value = 0
                number.id = `${item.name}-number`
                number.style.display = "none"
                number.classList.add("number")
                const label = document.createElement("label")
                label.setAttribute("name", "checkbox")
                label.style.display = "flex";
                label.textContent = item.name
                label.setAttribute("name","checkbox")
                label.id = `${item.name}-label`
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.id = `${item.name}`
                checkbox.setAttribute("name", "checkbox")
                checkbox.textContent = item.name;
                label.appendChild(checkbox)
                label.appendChild(number)
                cartCheck.appendChild(label)
                inventoryArray.push("1")
                checkbox.addEventListener("change", ()=> {
                    console.log(checkbox.value)
                    if(number.style.display === "none") {
                        number.style.display = "block"
                    } else {
                        number.style.display = "none"
                    }
                })
            }
        })
        if(inventoryArray.length === 0){
            const note = document.createElement("i")
            note.id="inventory-note"
            note.textContent = "no products found"
            cartCheck.appendChild(note)
            return
        }
        const submitButton = document.createElement("button")
        submitButton.textContent = "Submit"
        submitButton.id = "submit-button"
        submitButton.addEventListener("click",(e)=>{
            e.preventDefault()
            let tabOut = 0;
            const checkboxes = document.querySelectorAll('input[name="checkbox"]')
            checkboxes.forEach(checkbox=>{
                if(checkbox.checked){
                    const pr = inventory.get(checkbox.id).pr
                    console.log("Price", pr)
                    const number = Number(document.getElementById(`${checkbox.id}-number`).value)
                    const checkInv = checkInventory(checkbox.id)(number)
                    if(number === 0) {
                        const numberError = document.createElement("span")
                        numberError.textContent = "enter quantity"
                        numberError.style.color = "red";
                        numberError.style.marginLeft = "10px";
                        const label = document.getElementById(`${checkbox.id}-label`)
                        label.appendChild(numberError)
                        tabOut = 1;
                        return
                    } else if (!checkInv){
                        tabOut = 1;
                        const invError = document.createElement("span")
                        invError.textContent = "not enough inventory"
                        invError.style.color = "red";
                        invError.style.marginLeft = "10px";
                        const label = document.getElementById(`${checkbox.id}-label`)
                        label.appendChild(invError)
                    } else {
                       
                        cart.add(checkbox.id)(number)(pr)
                    }
                }
            })
            if(tabOut !== 0) {
                return
            } else {
                select.value = " "
                clearList(cartCheck)
                clearTable()
                cart.save()
                displayCart()
            }
        })
        cartCheck.appendChild(submitButton)
    })
}

function displayCart(){

    try{
        clearTable()
        clearList()
        const finalizeButton = document.createElement("button")
        finalizeButton.textContent = "Finalize"
        finalizeButton.id = "finalize-button"
        cart.cart.forEach(item=>{
            const tableRow = document.createElement("tr");
            tableRow.setAttribute("name", "tablerow")
            const name = document.createElement("td")
            name.textContent = item.name;
            const trash = document.createElement("td");
            const qt = document.createElement("td");
            const pr = document.createElement("td");
            pr.textContent = `$${item.pr}`

            qt.textContent = item.qt;
            trash.innerHTML = '<i class="ri-delete-bin-line"></i>';
            trash.classList.add("icon");
            tableRow.id = item.name
            tableRow.appendChild(name)
            tableRow.appendChild(qt)
            tableRow.appendChild(pr)
            cartDisplay.appendChild(tableRow)
            tableRow.appendChild(trash)
        })
        const tableRowBreak = document.createElement("tr")
        tableRowBreak.setAttribute("name", "tablerow")
        const tdBreak = document.createElement("td")
        tdBreak.textContent = '-------------------'
        tableRowBreak.appendChild(tdBreak)
        cartDisplay.appendChild(tableRowBreak)
        const tableRow = document.createElement("tr")
        tableRow.setAttribute("name", "tablerow")
        const totalTitle = document.createElement("td")
        totalTitle.textContent = "total"
        
        const total = document.createElement("td")
        total.textContent = `$${cart.getTotal()}`
        tableRow.appendChild(totalTitle)
        tableRow.appendChild(total)
        cartDisplay.appendChild(tableRow)

        finalizeButton.addEventListener("click",(e)=>{
            e.preventDefault()
            finalize()
        })
        cartDisplay.appendChild(finalizeButton)
        } catch(error){

        }
        
}

function clearTable(){
    const tables = document.querySelectorAll('tr[name="tablerow"]')
    console.log(tables)
    tables.forEach(table=>{
        table.remove()
    })
}

function clearList(){
    try{
        const inventoryNote = document.getElementById("inventory-note")
        inventoryNote.remove();
    } catch {
    }
    try{
        const finalizeButton = document.getElementById("finalize-button")
        finalizeButton.remove();
    } catch {
    }
    try{
        const listArray = document.querySelectorAll('label[name="checkbox"]')
        console.log(listArray)
        listArray.forEach(list=> {
            list.remove()
        })
        
    } catch (err){
        console.log(err)
    }
    try{
        cart.cart.forEach(item=>{  
                const listItem = document.getElementById(item.name)
                listItem.remove()
        })
    } catch {
    }
    
    try{
         const submitButton = document.getElementById("submit-button")
        submitButton.remove();
    } catch {
    }
}

function checkInventory(name){
    const qt = inventory.inventory.get(name).qt
    return function(number){
        if(number > qt){
            return false
        } else {
            return true
        }
    }
}

function finalize(){
    cart.cart.forEach(product=>{
        const invProduct = inventory.getItem(product.name)
        invProduct.qt = invProduct.qt -  product.qt
        inventory.set(invProduct)
    })
    clearList(cartCheck)
}

export default setCart