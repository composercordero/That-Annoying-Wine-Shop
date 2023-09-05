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

    cartHTMLElement():void{
        let cart = document.getElementById('cart');
        let li = document.createElement('li');
        li.classList.add('list-group-item','d-flex', 'justify-content-between', 'items')
        
        const mySet = new Set(Shop.myUser!.cart)
        const userCart = Array.from(mySet)

        for (let i=0; i < mySet.size; i++){
        
        let selectedItem = Shop.myUser!.cart.filter(x => {return x.id === userCart[i]['id']})

        li.innerHTML = `${userCart[i]['name']}(${Shop.myUser!.cart.filter((x) => x == userCart[i]).length})
        <div>
        <button id="removeItem" class="btn bg-warning rounded-pill" onclick="Shop.myUser!.removeQuantityFromCart('${selectedItem[i]['id']})">-</button>
        <button id="addItem" class="btn bg-success rounded-pill" onclick="Shop.myUser!.addToCart(${selectedItem})">+</button>
        <button id="deleteItem" class="btn bg-danger rounded-pill" href="#" onclick='Shop.myUser!.removeFromCart('${selectedItem[i]['id']}')">x</a>
        </div>`
        cart?.append(li);
        // const removeItem = document.getElementById('removeItem')
        // removeItem!.addEventListener('click', this.removeQuantityFromCart)
        }
    }

    addRemoveEventListeners(item:string, action:string):void {
        switch (action) {
            case 'remove':
                // const removeBtn = document.getElementById('removeItem');
                // removeBtn!.onclick = () => {this.removeQuantityFromCart(item)};]
                console.log(item)
                break;
            case 'add':
                // const addBtn = document.getElementById('addItem');
                // addBtn!.onclick = () => {this.addToCart('pizza')};
                console.log(item)
                break;
            case 'delete':
                // const deleteBtn = document.getElementById('deleteItem');
                // deleteBtn!.onclick = () => {this.removeFromCart()};
                console.log('delete')
                break;
        }
    }

    addToCart(item:Item):void{
        Shop.myUser!.cart.push(item)
        Shop.updateCart(Shop.myUser!);
    }
    
    removeFromCart(item:string):void{
        console.log('remove', item)
        
        // let selectedItem = Shop.myUser!.cart.filter(x => {
        //     return x.id === item})
        // const indexOfItem = Shop.myUser!.cart.indexOf()
        // if (indexOfItem > -1) {
        //     this.cart.splice(indexOfItem, 1); 
        //   }
    }
    
    removeQuantityFromCart(item:string):void{
        console.log('remove', item)
        // let selectedItem = Shop.myUser!.cart.filter(x => {
        //     return x.id === item})
        // Shop.myUser!.cart.splice(selectedItem,1)
        // Shop.updateCart(Shop.myUser!);
    }

    cartTotal():void{
        let cartTotal = 0;
        const total = document.getElementById('total')
        for (let item of this.cart){
            cartTotal += item.price
        }
        total!.innerText += cartTotal.toString()
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

    static itemElement(item:Item):void{
        let menu = document.getElementById('wine-list')
        let itemDiv = document.createElement('div')
        itemDiv.innerHTML = `<div class="card mb-3">
            <h6 class="card-header fw-bold">${item.name} ($${item.price})</h6>
            <div class="card-body">
            <p class="card-text">${item.description}</p>
            <a id="addItem" class="btn btn-warning">Add to Cart</a>
            </div>
            </div>`;

        const addBtn = itemDiv.querySelector('#addItem') as HTMLButtonElement;
        addBtn.onclick = () => {Shop.myUser!.addToCart(item)}
        menu?.append(itemDiv);
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
            Shop.updateCart(Shop.myUser!)
            Shop.myUser!.cartTotal()
    
        }
        
        public get items(): Item[] {return this._items;}
        public set items(value: Item[]) {this._items = value;}

    showItems():void{
        for (let i=0; i<this.items.length; i++){
            Item.itemElement(this.items[i])
        }
    }

    static updateCart(user:User):void{
        let cart = document.getElementById('cart');
        if (user.cart.length === 0){
            cart!.innerHTML = `<p>
            No items in your cart yet :( Get some wine!
        </p>`
        }else{
            user.cartHTMLElement()
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

// const carlos = new User('Carlos',31)


// carlos.addToCart(new Item('Vin', 299, 'It\s French and delicious. Not that annoying, so cheaper.'))
// console.log(carlos.cart)

// thatAnnoyingWineShop.updateCart(carlos);