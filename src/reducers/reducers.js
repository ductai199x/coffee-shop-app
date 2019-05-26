const defaultState = {
    itemList: [
        {
            "id": "",
            "name": "",
            "image": "",
            "price": [],
            "type": "",
            "size": []
        },
    ]
};

export const shopReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE-ITEMLIST':
            return {
                ...state,
                itemList: action.payload
            }
        default: return state;
    }
}

export const userReducers = (state = defaultState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export const authReducers = (state = defaultState, action) => {
    switch (action.type) {
        default: return state;
    }
}

export const promoReducers = (state = defaultState, action) => {
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