class History {
    constructor() {
        this.undoTracker = 0;
        if (!History.instance) {
            this.history = []
            History.instance = this;
        }
        try{
            const localData = JSON.parse(localStorage.getItem("history"))
            if(localData){
                this.history = localData
            }
        } catch (error) {
        }
        return History.instance
    }

    

    push(item, type){
            if(this.history.length > 5) {
                while(this.history > 5) {
                    this.history.shift()
                }
                localStorage.setItem("history", JSON.stringify(this.history))
            }
            if(this.undoTracker > 0) {
                this.history.splice(this.history.length - this.undoTracker)
                this.undoTracker = 0
            }
            const copiedItem = JSON.parse(JSON.stringify(item))
            const copiedType = JSON.parse(JSON.stringify(type))
            this.history.push({historyItem: copiedItem, historyType: copiedType})
            console.log("History: ", this.history)
            localStorage.setItem("history", JSON.stringify(this.history))
            console.log("PUSH") 
    }

    clear() {
        this.history = []
        localStorage.setItem("history", JSON.stringify(this.history))
    }
    undo() {
        this.undoTracker++
        if(this.history.length < this.undoTracker) {
            this.undoTracker = this.history.length
        }
        const state = this.history[this.history.length - this.undoTracker];
        localStorage.setItem("type", JSON.stringify(state.historyType))
        localStorage.setItem("savedItem", JSON.stringify(state.historyItem))
        console.log(state.historyItem.name)

        console.log("Undo triggered: ", this.history)
        return this.history[this.history.length - this.undoTracker]
    }
    redo() {
        this.undoTracker--
        if(this.undoTracker < 0) {
            this.undoTracker = 0
        }
        const state = this.history[this.history.length - this.undoTracker];
        localStorage.setItem("type", JSON.stringify(state.historyType))
        localStorage.setItem("savedItem", JSON.stringify(state.historyItem))
        return this.history[this.history.length - this.undoTracker]
    }
    revert(){
        if(this.history.length > 2) {
            this.history.shift()
            localStorage.setItem("History", JSON.stringify(this.history))
            console.log(this.history[this.history.length - 2])
            console.log("History: ", this.history)
            localStorage.setItem("savedItem", JSON.stringify(this.history[this.history.length - 2].historyItem))
            localStorage.setItem("type", JSON.stringify(this.history[this.history.length - 2].historyType))
            return this.history[this.history.length - 2]
        } else {
            console.log(this.history[0])
            console.log("First element")
            localStorage.setItem("history", JSON.stringify(this.history))
            localStorage.setItem("savedItem", JSON.stringify(this.history[0].historyItem))
            localStorage.setItem("type", JSON.stringify(this.history[0].historyType))
            return this.history[0]
            
        }
    }
}

const history = new History();

export default history