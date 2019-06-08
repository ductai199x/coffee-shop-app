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

export const updateUsersData = (usersdata) => (
    {
        type: 'UPDATE-USERSDATA',
        payload: usersdata
    }
)