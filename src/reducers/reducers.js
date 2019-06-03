const defaultShopState = {
    type: "coffee",
    itemList: {
        coffee: [{
            id: "", name: "", image: "", price: [], type: "", "item-size": [], description: ""
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
        return item.quantity*(item.price[item["item-size"].indexOf(item["choice-size"])])
    }
    switch (action.type) {
        case 'ADD':
            console.log(action.payload.id)
            if (state.uniqueInCart.includes(action.payload.id)) {
                return { 
                    ...state,
                    itemList: state.itemList.map((content, i) => 
                        content.id === action.payload.id ? {...content, quantity: content.quantity + 1} : content
                    ),
                    totalValue: state.itemList.reduce(reducer, 0)
                }
            } else {
                return {
                    ...state,
                    uniqueInCart: [...state.uniqueInCart, action.payload.id],
                    itemList: [...state.itemList, action.payload],
                    numInCart: state.uniqueInCart.length + 1,
                    totalValue: [...state.itemList, action.payload].reduce(reducer, 0)
                }
            }
        case 'REMOVE':
            return {
                ...state,
                itemList: state.itemList.filter(item => item.id !== action.payload.id),
                uniqueInCart: state.uniqueInCart.filter(item => item !== action.payload.id),
                numInCart: state.numInCart - 1,
                totalValue: state.itemList.filter(item => item.id !== action.payload.id).reduce(reducer, 0)
            }
        case 'UPDATE':
            return {
                ...state,
                itemList: state.itemList.map(
                    (content, i) => content.id === action.payload.id ? action.payload : content
                ),
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