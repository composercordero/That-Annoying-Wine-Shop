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
    // Turn off the element(s) that are visible
    const toTurnOff = document.getElementsByClassName('is-visible');
    for (let element of toTurnOff) {
        console.log('Turning off', element);
        element.classList.replace('is-visible', 'is-invisible');
        // let navLink = document.getElementsByName(element.id)[0];
        // navLink.classList.remove('active');
    }
    // Turn on the element based on the link that was clicked
    const toTurnOn = document.getElementById(section);
    toTurnOn.classList.replace('is-invisible', 'is-visible');
    // section.target.classList.add('active');
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
    static loginUser(e) {
        e.preventDefault();
        const nameInput = document.getElementById('name').value;
        const ageInput = parseFloat(document.getElementById('age').value);
        console.log(new User(nameInput, ageInput));
    }
    addToCart(item) {
        this.cart.push(item);
    }
    removeFromCart(item) {
        const indexOfItem = this.cart.indexOf(item);
        if (indexOfItem > -1) {
            this.cart.splice(indexOfItem, 1);
        }
    }
    removeQuantityFromCart(item, quantity) {
        let i = 0;
        while (i < this.cart.length && quantity > 0) {
            if (this.cart[i] === item) {
                this.cart.splice(i, 1);
                quantity -= 1;
            }
            else {
                ++i;
            }
        }
    }
    cartTotal() {
        let cartTotal = 0;
        for (let item of this.cart) {
            cartTotal += item.price;
        }
        console.log(cartTotal);
    }
    printCart() {
        console.log(`${this.name}'s cart:`);
        for (let item of this.cart) {
            console.log(`${item.name} - ${item.price}`);
        }
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
}
class Shop {
    constructor(_items = []) {
        this._items = _items;
        this.items.push(new Item('iPhone', 699, 'Cellphone'));
        this.items.push(new Item('iPad', 799, 'Tablet'));
        this.items.push(new Item('Macbook Pro', 1599, 'Laptop'));
        this.items.push(new Item('iMac', 1899, 'Computer'));
    }
    get items() { return this._items; }
    set items(value) { this._items = value; }
}
// Step 4: Create Driver Code to emulate a front end user
const form = document.getElementById('login_form');
form.addEventListener('submit', User.loginUser);
const thatAnnoyingWineShop = new Shop();
const carlos = new User('Carlos', 31);
const kristina = new User('Kristina', 36);
console.log('-----------------------');
console.log(thatAnnoyingWineShop.items);
console.log('-----------------------');
carlos.addToCart(thatAnnoyingWineShop.items[1]);
carlos.addToCart(thatAnnoyingWineShop.items[2]);
carlos.addToCart(thatAnnoyingWineShop.items[3]);
carlos.printCart();
console.log('-----------------------');
kristina.addToCart(thatAnnoyingWineShop.items[2]);
kristina.addToCart(thatAnnoyingWineShop.items[3]);
kristina.addToCart(thatAnnoyingWineShop.items[3]);
kristina.addToCart(thatAnnoyingWineShop.items[3]);
kristina.printCart();
console.log('-----------------------');
kristina.removeFromCart(thatAnnoyingWineShop.items[2]);
kristina.printCart();
console.log('-----------------------');
kristina.removeQuantityFromCart(thatAnnoyingWineShop.items[3], 2);
kristina.printCart();
console.log('-----------------------');
console.log('-----------------------');
kristina.cartTotal();
console.log('-----------------------');

})();

/******/ })()
;