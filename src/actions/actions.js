export const updateShopType = (type) => (
    {
        type: 'UPDATE-TYPE',
        payload: type
    }
)

export const updateItemList = (itemList) => (
    {
        type: 'UPDATE-ITEMLIST',
        payload: itemList
    }
)

export const addToCart = (item) => (
    {
        type: 'ADD',
        payload: item
    }
)

export const removeFromCart = (item) => (
    {
        type: 'REMOVE',
        payload: item
    }
)

export const updateInCart = (item) => (
    {
        type: 'UPDATE',
        payload: item
    }
)

export const updateUserDB = (userdb) => (
    {
        type: 'UPDATE',
        payload: userdb
    }
)

export const loginUser = (user) => (
    {
        type: 'LOGIN',
        payload: user
    }
)

export const logoutUser = () => (
    {
        type: 'LOGOUT'
    }
)