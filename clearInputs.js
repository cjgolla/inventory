function clearInputs(){
    const inputs = document.querySelectorAll('input, textarea, select[name="type-select"], select[name="folder-select"]')
    inputs.forEach(input=>{
        input.value = "";
    })
    
}

export default clearInputs