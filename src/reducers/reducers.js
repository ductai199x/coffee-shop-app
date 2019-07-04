import { numToCurrency, calculateTotal, generateUuid, calculateTotalList } from "../components/Helper";

const defaultShopState = {
    type: "coffee",
    itemList: {
        coffee: [{
            uuid: "", id: "", name: "", image: "", "scale-factor": [], type: "", "item-size": [], "choice-size": "", 
            "component-name": ["sugar"],
            component: {
                sugar: {
                    amount: [], 
                    price: 0,
                    choice: "",
                    modifier: "",
                    default: ""
                },
                shot: {
                    amount: [], 
                    price: 0,
                    choice: "",
                    modifer: "",
                    default: ""
                },
                milk: {
                    amount: [], 
                    price: 0,
                    choice: "",
                    modifier: "",
                    default: ""
                }
            },
            description: "",
            price: []
        }],
        "brand-items": [{
            id: "", name: "", image: "", price: [], type: "", "item-size": [], description: ""
        }],
    }
};

const defaultCartState = {
    numInCart: 0,
    totalValue: 0,
    uniqueInCart: [],
    itemList: []
};

const defaultUserState = {

};

const defaultAuthState = {

};

const defaultPromoState = {

};

export const shopReducers = (state = defaultShopState, action) => {
    switch (action.type) {
        case 'UPDATE-ITEMLIST':
            return {
                ...state,
                itemList: action.payload
            }
        case 'UPDATE-TYPE':
            return {
                ...state,
                type: action.payload
            }
        default: return state;
    }
}

export const cartReducers = (state = defaultCartState, action) => {
    const reducer = (accumulator, item) => accumulator + getTotal(item);
    const getTotal = (item) => {
        return item["quantity"]*calculateTotal(item)
    }
    switch (action.type) {
        case 'ADD':
            generateUuid(action.payload)
            if (state.uniqueInCart.includes(action.payload.uuid)) {
                return { 
                    ...state,
                    numInCart: parseInt(state.numInCart) + 1,
                    itemList: state.itemList.map((content, i) => 
                        content.uuid === action.payload.uuid ? {...content, quantity: content.quantity + 1} : content
                    ),
                    totalValue: state.itemList.map((content, i) => 
                        content.uuid === action.payload.uuid ? {...content, quantity: content.quantity + 1} : content
                    ).reduce(reducer, 0)
                }
            } else {
                return {
                    ...state,
                    uniqueInCart: [...state.uniqueInCart, action.payload.uuid],
                    itemList: [...state.itemList, action.payload],
                    numInCart: parseInt(state.numInCart) + 1,
                    totalValue: [...state.itemList, action.payload].reduce(reducer, 0)
                }
            }
        case 'REMOVE':
            return {
                ...state,
                itemList: state.itemList.filter(item => item.uuid !== action.payload.uuid),
                uniqueInCart: state.uniqueInCart.filter(item => item !== action.payload.uuid),
                numInCart: parseInt(state.numInCart) - 1,
                totalValue: state.itemList.filter(item => item.uuid !== action.payload.uuid).reduce(reducer, 0)
            }
        case 'UPDATE':
            let temp = 0;
            let total = 0;
            return {
                ...state,
                itemList: state.itemList.map(
                    (content, i) => content.uuid === action.payload.uuid ? action.payload : content
                ),
                numInCart: calculateTotalList(state.itemList),
                totalValue: state.itemList.reduce(reducer, 0)
            }
        default: return state;
    }
}

export const userReducers = (state = defaultUserState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export const authReducers = (state = defaultAuthState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export const promoReducers = (state = defaultPromoState, action) => {
    switch (action.type) {
        default: return state;
    }
}

/*  Just an example to update a key inside an object 
    without updating the entire object
case 'UPDATE-ITEMLIST':
    return Object.assign({}, state, {
        shopContent: {
            ...state.shopContent,
            itemList: action.connection
        }
    });
*/