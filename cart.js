class Cart{
    constructor(){
        if(Cart.instance == null) {
            this.total = 0;
            this.count = 0;
            this.cart = new Map()
            try{
                const savedCart = JSON.parse(localStorage.getItem("cart"))
                if (savedCart && Array.isArray(savedCart.cart)){
                    this.cart = new Map(savedCart.cart)
                    this.total = savedCart.total || 0;
                    this.count = savedCart.count || 0;
                }
            } catch (error) {
                console.log("Error fetching cart: ", error)
            }
            Cart.instance = this
        }
        return Cart.instance
    }
    add(name){
        return function(number){
            return function(price){
                const obj = {"name": name, "qt": number,"pr": price*number}
                this.cart.set(name, obj)
            }.bind(this)
        }.bind(this)
    }
    getTotal(){
        this.total = 0;
        this.cart.forEach(product=>{
            this.total +=product.pr
        })
        return  this.total;
    }
    getCount(){
        this.count = 0;
        this.products.forEach(product=> {
            this.count ++;
        })
        return this.count
    }
    save(){
        const cartData = {
            cart: [...this.cart],
            total: this.total,
            count: this.count,
        }
        localStorage.setItem("cart", JSON.stringify(cartData))
    }
    clear(){
        this.cart = new Map()
        this.total = 0
        this.count = 0
        this.save()
        console.log(cart)
    }
}

const cart = new Cart();
export default cart