import { v4 as uuidv4 } from 'uuid';
document.body.dataset.bsTheme = ''

// NAV BUTTONS

const nav = document.getElementsByClassName('navBtn')
for(let btn of nav){
    btn!.addEventListener('click',(e:Event) => {
        let target = e.currentTarget as HTMLElement
        if (target.id === 'modeBtn'){
            if(document.body.dataset.bsTheme === ''){
                document.body.dataset.bsTheme = 'dark'
                const modeBtn = document.getElementById('modeBtn')
                modeBtn!.innerHTML = '<i class="bi bi-brightness-high-fill"></i> <p>Light Mode</p>'
            }else{
                document.body.dataset.bsTheme = '';
                const modeBtn = document.getElementById('modeBtn')
                modeBtn!.innerHTML = '<i class="bi bi-moon-stars-fill"></i> <p>Dark Mode</p>'
                
        }}else{
        changeView(target.id.slice(0, -3))
        }
    })
}

function changeView(section:string):void{
    const toTurnOff = document.getElementsByClassName('is-visible');
    for (let element of toTurnOff){
        element.classList.replace('is-visible', 'is-invisible');
    }
    const toTurnOn = document.getElementById(section);
    toTurnOn!.classList.replace('is-invisible', 'is-visible');
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

    static loginUser():User{
        const nameInput:string = (<HTMLInputElement>document.getElementById('name')).value;
        const ageInput:number = parseFloat((<HTMLInputElement>document.getElementById('age')).value);
        let new_user = new User(nameInput, ageInput);
        return new_user
    }

    cartHTMLElement():HTMLDivElement{
        let cart = document.getElementById('cart');
        const outer = document.createElement('div')
        let li = document.createElement('li');
        li.classList.add('list-group-item','d-flex', 'justify-content-between', 'items', 'row')
        console.log(this.cart)
        
        for (const item of new Set(this.cart)){
        console.log(Shop.myUser!.cart)

        const rmButton = document.createElement("button")
                rmButton.innerText="- 1"
                rmButton.id=`${item.id}-rm1`
                rmButton.classList.add("btn", "btn-danger")
                rmButton.onclick = () => {
                    Shop.myUser!.removeQuantityFromCart(item,1)
                    };

        const rmAllButton = document.createElement("button")
                rmAllButton.innerText="x"
                rmAllButton.id =`${item.id}-rmall`
                rmAllButton.classList.add("btn", "btn-dark-red", "btn-danger")

                rmAllButton.onclick=()=>{
                    Shop.myUser!.removeFromCart(item)
                }

        li.innerHTML += `
        <div class='d-flex justify-content-between my-4'>
            <div>${item.name} - $${item.price} 
                / qty: ${this.cart.filter((i)=>i.id===item.id).length}
            </div>
            <div>
                ${rmAllButton.outerHTML}
                ${rmButton.outerHTML}
            </div>
        
        </div>`
        outer.append(li)
        cart?.append(outer);

        }
        Shop.myUser!.cartTotal()
        return outer
    }

    addRemoveListeners(){
        for(const item of new Set(this.cart)){
            const removeOneButton = document.getElementById(`${item.id}-rm1`) as HTMLButtonElement || null;
            if (removeOneButton){
                removeOneButton.onclick = () => {
                Shop.myUser?.removeQuantityFromCart(item,1)
                };
            }
            const removeAllButton = document.getElementById(`${item.id}-rmall`) as HTMLButtonElement || null;
            if(removeAllButton){
                removeAllButton.onclick = () => {
                Shop.myUser?.removeFromCart(item)
                };
            }
        }
    }

    addToCart(item:Item):void{
        this.cart.push(item)
        Shop.updateCart();
    }
    
    removeFromCart(item:Item):void{
        this.cart=this.cart.filter((i)=>i.id !== item.id)
        Shop.updateCart()
    }
    
    removeQuantityFromCart(item:Item, qty:number):void{
        console.log('remove', item)
        let i = 0
        while (i<qty){
            this.cart.splice(this.cart.findIndex((i)=>i.id == item.id),1)
            i++
        }
        Shop.updateCart()
    }

    cartTotal():void{
        let cartTotal = 0;
        const total = document.getElementById('total')
        for (let item of this.cart){
            cartTotal += item.price
        }
        total!.innerText = `Your total is ${cartTotal.toString()}`
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

    public itemElement():HTMLDivElement{
        // let menu = document.getElementById('wine-list')
        let itemDiv = document.createElement('div')
        itemDiv.innerHTML = `<div class="card mb-3">
            <h6 class="card-header fw-bold">${this.name} ($${this.price})</h6>
            <div class="card-body">
            <p class="card-text">${this.description}</p>
            <a id="addItem" class="btn btn-warning">Add to Cart</a>
            </div>
            </div>`;

        const addBtn = itemDiv.querySelector('#addItem') as HTMLButtonElement;
        addBtn.onclick = () => {Shop.myUser!.addToCart(this)}
        return itemDiv
    };
}

class Shop{
    static myUser: User | undefined

    constructor(
        private _items: Item[] = [],
        ){
            this.items.push(new Item('Vin', 299, 'It\s French and delicious. Not that annoying, so cheaper.'));
            this.items.push(new Item('Víno', 399, 'A great selection for those who want to delve into this annoying world.'));
            this.items.push(new Item('Vino',699, 'Fancy Spanish wine. We bring it. You buy it. You come back.'));
            this.items.push(new Item('Vinho', 799, 'This is not our most annoying wine, but it is definitely our best seller for more than one reason, one of them because it is from Brazil.'));
            this.items.push(new Item('Vinum', 1599, 'Annoyingly delicious, with a great aroma that will keep you coming back for more.'));
            this.items.push(new Item('Vi', 2599, 'Our top shelve. Vi will annoy the hell out of you.'));

            this.showItems();
            Shop.myUser!.cart = []
            Shop.updateCart()
    
        }
        
        public get items(): Item[] {return this._items;}
        public set items(value: Item[]) {this._items = value;}

    showItems():void{
        for (let item of this._items){
            document.getElementById("wine-list")!.appendChild(item.itemElement())
        }
    }

    static updateCart(){
        let cart = document.getElementById('cart');
        if (Shop.myUser!.cart.length <= 0){
            cart!.innerHTML = `<p>
            No items in your cart yet :( Get some wine!
        </p>`
        }else{
            cart!.replaceChildren(Shop.myUser!.cartHTMLElement())
            cart!.innerHTML=('<H2 id="cart-header">My Cart</H2>'+cart!.innerHTML)
            Shop.myUser?.addRemoveListeners()
            }
        }

        static loginUser(e:Event):void{
            e.preventDefault();
            Shop.myUser = User.loginUser()
            if(Shop.myUser){
                new Shop();
                changeView('shop')
            }
            console.log(Shop.myUser)
        }
}

const form:HTMLElement|null = document.getElementById('login_form');
form!.addEventListener('submit', Shop.loginUser);