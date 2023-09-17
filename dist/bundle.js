/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

document.body.dataset.bsTheme = '';
// NAV BUTTONS
const nav = document.getElementsByClassName('navBtn');
for (let btn of nav) {
    btn.addEventListener('click', (e) => {
        let target = e.currentTarget;
        if (target.id === 'modeBtn') {
            if (document.body.dataset.bsTheme === '') {
                document.body.dataset.bsTheme = 'dark';
                const modeBtn = document.getElementById('modeBtn');
                modeBtn.innerHTML = '<i class="bi bi-brightness-high-fill"></i> <p>Light Mode</p>';
            }
            else {
                document.body.dataset.bsTheme = '';
                const modeBtn = document.getElementById('modeBtn');
                modeBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i> <p>Dark Mode</p>';
            }
        }
        else {
            changeView(target.id.slice(0, -3));
        }
    });
}
function changeView(section) {
    const toTurnOff = document.getElementsByClassName('is-visible');
    for (let element of toTurnOff) {
        element.classList.replace('is-visible', 'is-invisible');
    }
    const toTurnOn = document.getElementById(section);
    toTurnOn.classList.replace('is-invisible', 'is-visible');
}
class User {
    constructor(_name, _age, _cart = [], _id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
        this._name = _name;
        this._age = _age;
        this._cart = _cart;
        this._id = _id;
    }
    get id() { return this._id; }
    set id(value) { this._id = value; }
    get name() { return this._name; }
    set name(value) { this._name = value; }
    get age() { return this._age; }
    set age(value) { this._age = value; }
    get cart() { return this._cart; }
    set cart(value) { this._cart = value; }
    // Step 3: Create some methods
    static loginUser() {
        const nameInput = document.getElementById('name').value;
        const ageInput = parseFloat(document.getElementById('age').value);
        let new_user = new User(nameInput, ageInput);
        return new_user;
    }
    cartHTMLElement() {
        let cart = document.getElementById('cart');
        const outer = document.createElement('div');
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'items', 'row');
        console.log(this.cart);
        for (const item of new Set(this.cart)) {
            console.log(Shop.myUser.cart);
            const rmButton = document.createElement("button");
            rmButton.innerText = "- 1";
            rmButton.id = `${item.id}-rm1`;
            rmButton.classList.add("btn", "btn-danger");
            rmButton.onclick = () => {
                Shop.myUser.removeQuantityFromCart(item, 1);
            };
            const rmAllButton = document.createElement("button");
            rmAllButton.innerText = "x";
            rmAllButton.id = `${item.id}-rmall`;
            rmAllButton.classList.add("btn", "btn-dark-red", "btn-danger");
            rmAllButton.onclick = () => {
                Shop.myUser.removeFromCart(item);
            };
            li.innerHTML += `
        <div class='d-flex justify-content-between my-4'>
            <div>${item.name} - $${item.price} 
                / qty: ${this.cart.filter((i) => i.id === item.id).length}
            </div>
            <div>
                ${rmAllButton.outerHTML}
                ${rmButton.outerHTML}
            </div>
        
        </div>`;
            outer.append(li);
            cart === null || cart === void 0 ? void 0 : cart.append(outer);
        }
        Shop.myUser.cartTotal();
        return outer;
    }
    addRemoveListeners() {
        for (const item of new Set(this.cart)) {
            const removeOneButton = document.getElementById(`${item.id}-rm1`) || null;
            if (removeOneButton) {
                removeOneButton.onclick = () => {
                    var _a;
                    (_a = Shop.myUser) === null || _a === void 0 ? void 0 : _a.removeQuantityFromCart(item, 1);
                };
            }
            const removeAllButton = document.getElementById(`${item.id}-rmall`) || null;
            if (removeAllButton) {
                removeAllButton.onclick = () => {
                    var _a;
                    (_a = Shop.myUser) === null || _a === void 0 ? void 0 : _a.removeFromCart(item);
                };
            }
        }
    }
    addToCart(item) {
        this.cart.push(item);
        Shop.updateCart();
    }
    removeFromCart(item) {
        this.cart = this.cart.filter((i) => i.id !== item.id);
        Shop.updateCart();
    }
    removeQuantityFromCart(item, qty) {
        console.log('remove', item);
        let i = 0;
        while (i < qty) {
            this.cart.splice(this.cart.findIndex((i) => i.id == item.id), 1);
            i++;
        }
        Shop.updateCart();
    }
    cartTotal() {
        let cartTotal = 0;
        const total = document.getElementById('total');
        for (let item of this.cart) {
            cartTotal += item.price;
        }
        total.innerText = `Your total is ${cartTotal.toString()}`;
    }
    changeMode() {
        if (document.body.dataset.bsTheme) {
            document.body.dataset.bsTheme = 'dark';
        }
        else {
            document.body.dataset.bsTheme = '';
        }
    }
}
class Item {
    constructor(_name, _price, _description, _id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
        this._name = _name;
        this._price = _price;
        this._description = _description;
        this._id = _id;
    }
    get id() { return this._id; }
    set id(value) { this._id = value; }
    get name() { return this._name; }
    set name(value) { this._name = value; }
    get price() { return this._price; }
    set price(value) { this._price = value; }
    get description() { return this._description; }
    set description(value) { this._description = value; }
    itemElement() {
        // let menu = document.getElementById('wine-list')
        let itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<div class="card mb-3">
            <h6 class="card-header fw-bold">${this.name} ($${this.price})</h6>
            <div class="card-body">
            <p class="card-text">${this.description}</p>
            <a id="addItem" class="btn btn-warning">Add to Cart</a>
            </div>
            </div>`;
        const addBtn = itemDiv.querySelector('#addItem');
        addBtn.onclick = () => { Shop.myUser.addToCart(this); };
        return itemDiv;
    }
    ;
}
class Shop {
    constructor(_items = []) {
        this._items = _items;
        this.items.push(new Item('Vin', 299, 'It\s French and delicious. Not that annoying, so cheaper.'));
        this.items.push(new Item('Víno', 399, 'A great selection for those who want to delve into this annoying world.'));
        this.items.push(new Item('Vino', 699, 'Fancy Spanish wine. We bring it. You buy it. You come back.'));
        this.items.push(new Item('Vinho', 799, 'This is not our most annoying wine, but it is definitely our best seller for more than one reason, one of them because it is from Brazil.'));
        this.items.push(new Item('Vinum', 1599, 'Annoyingly delicious, with a great aroma that will keep you coming back for more.'));
        this.items.push(new Item('Vi', 2599, 'Our top shelve. Vi will annoy the hell out of you.'));
        this.showItems();
        Shop.myUser.cart = [];
        Shop.updateCart();
    }
    get items() { return this._items; }
    set items(value) { this._items = value; }
    showItems() {
        for (let item of this._items) {
            document.getElementById("wine-list").appendChild(item.itemElement());
        }
    }
    static updateCart() {
        var _a;
        let cart = document.getElementById('cart');
        if (Shop.myUser.cart.length <= 0) {
            cart.innerHTML = `<p>
            No items in your cart yet :( Get some wine!
        </p>`;
        }
        else {
            cart.replaceChildren(Shop.myUser.cartHTMLElement());
            cart.innerHTML = ('<H2 id="cart-header">My Cart</H2>' + cart.innerHTML);
            (_a = Shop.myUser) === null || _a === void 0 ? void 0 : _a.addRemoveListeners();
        }
    }
    static loginUser(e) {
        e.preventDefault();
        Shop.myUser = User.loginUser();
        if (Shop.myUser) {
            new Shop();
            changeView('shop');
        }
        console.log(Shop.myUser);
    }
}
const form = document.getElementById('login_form');
form.addEventListener('submit', Shop.loginUser);

})();

/******/ })()
;