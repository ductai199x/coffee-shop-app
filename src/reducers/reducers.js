const defaultShopState = {
    type: "coffee",
    itemList: {
        coffee: [{
            id: "", name: "", image: "", price: [], type: "", size: [], description: ""
        }],
        "brand-items": [{
            id: "", name: "", image: "", price: [], type: "", size: [], description: ""
        }],
    }
};

const defaultCartState = {

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
    switch (action.type) {
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