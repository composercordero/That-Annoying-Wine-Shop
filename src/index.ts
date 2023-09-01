import { v4 as uuidv4 } from 'uuid';
document.body.dataset.bsTheme = ''

// NAV BUTTONS

const nav = document.getElementsByClassName('navBtn')

for(let btn of nav){
    btn!.addEventListener('click',(e:Event) => {
        let target = e.currentTarget as HTMLElement
        switch(target.id){
            case 'homeBtn':
                console.log('home')
                break;
            case 'aboutBtn':
                console.log('about')
                break;
            case 'shopBtn':
                console.log('shop')
                break;
            case 'contactBtn':
                console.log('contact')
                break;
            case 'modeBtn':
                if(document.body.dataset.bsTheme === ''){
                    document.body.dataset.bsTheme = 'dark'
                }else{
                    document.body.dataset.bsTheme = ''
                break;
        }
    }
    })
}



class User{

    constructor(
        private _name: string,
        private _age: number,
        private _cart: Item[] = [],
        private _id: string = uuidv4(),
    ){}

    public get id(): string {return this._id;}
    public set id(value: string) {this._id = value;}
    public get name(): string {return this._name;}
    public set name(value: string) {this._name = value;}
    public get age(): number {return this._age;}
    public set age(value: number) {this._age = value;}
    public get cart(): Item[] {return this._cart;}
    public set cart(value: Item[]) {this._cart = value;}

    // Step 3: Create some methods

    static loginUser(e:Event):User|undefined|null|void{
        e.preventDefault();
        const nameInput:string = (<HTMLInputElement>document.getElementById('name')).value;
        const ageInput:number = parseFloat((<HTMLInputElement>document.getElementById('age')).value);
        console.log(new User(nameInput, ageInput))
    }


    addToCart(item:Item):void{
        this.cart.push(item)
    }
    
    removeFromCart(item:Item):void{
        const indexOfItem = this.cart.indexOf(item)
        if (indexOfItem > -1) {
            this.cart.splice(indexOfItem, 1); 
          }
    }
    
    removeQuantityFromCart(item:Item, quantity:number):void{
        let i = 0;
        while (i < this.cart.length && quantity > 0) {
          if (this.cart[i] === item) {
            this.cart.splice(i, 1);
            quantity -= 1;
          } else {
            ++i;
          }
        }
    }

    cartTotal():void{
        let cartTotal = 0;
        for (let item of this.cart){
            cartTotal += item.price
        }
        console.log(cartTotal)
    }
    
    printCart():void{
        console.log(`${this.name}'s cart:`)
        for (let item of this.cart){
            console.log(`${item.name} - ${item.price}`)
        }
    }

    changeMode():void{
        if(document.body.dataset.bsTheme!){
            document.body.dataset.bsTheme = 'dark'
        }else{
            document.body.dataset.bsTheme = ''
        }
    }

}

class Item{
    
    constructor(
        private _name: string,
        private _price: number,
        private _description: string,
        private _id: string = uuidv4(),
    ){}

    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    public get price(): number { return this._price; }
    public set price(value: number) { this._price = value; }
    public get description(): string { return this._description; } 
    public set description(value: string) { this._description = value; }
}

class Shop{
    constructor(
        private _items: Item[] = []
    ){ // Step 3: Create some methods
        this.items.push(new Item('iPhone',699, 'Cellphone'));
        this.items.push(new Item('iPad', 799, 'Tablet'));
        this.items.push(new Item('Macbook Pro', 1599, 'Laptop'));
        this.items.push(new Item('iMac', 1899, 'Computer'));
    }
    
    public get items(): Item[] { return this._items; }
    public set items(value: Item[]) { this._items = value; }

}

// Step 4: Create Driver Code to emulate a front end user


const form:HTMLElement|null = document.getElementById('login_form');

form!.addEventListener('submit', User.loginUser);

const thatAnnoyingWineShop = new Shop()

const carlos = new User('Carlos',31)
const kristina = new User('Kristina',36)
console.log('-----------------------')
console.log(thatAnnoyingWineShop.items)
console.log('-----------------------')
carlos.addToCart(thatAnnoyingWineShop.items[1])
carlos.addToCart(thatAnnoyingWineShop.items[2])
carlos.addToCart(thatAnnoyingWineShop.items[3])
carlos.printCart()
console.log('-----------------------')
kristina.addToCart(thatAnnoyingWineShop.items[2])
kristina.addToCart(thatAnnoyingWineShop.items[3])
kristina.addToCart(thatAnnoyingWineShop.items[3])
kristina.addToCart(thatAnnoyingWineShop.items[3])
kristina.printCart()
console.log('-----------------------')
kristina.removeFromCart(thatAnnoyingWineShop.items[2])
kristina.printCart()
console.log('-----------------------')
kristina.removeQuantityFromCart(thatAnnoyingWineShop.items[3],2)
kristina.printCart()
console.log('-----------------------')
console.log('-----------------------')
kristina.cartTotal()
console.log('-----------------------')
