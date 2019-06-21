import { createStore, combineReducers } from 'redux';
import { shopReducers,
         cartReducers,
         userReducers, 
         userDBReducers,
         authReducers,
         promoReducers } from '../reducers/reducers.js';

/**
 * This function checks if the app state is saved in localStorage
 */
const loadState = () => {
    try {
        // Load the data saved in localStorage, against the key 'app_state'
        const serialisedState = window.localStorage.getItem('app_state');
        const lastAccessedTime = window.localStorage.getItem('last_accessed');
        const currentTime = Date.now();
        const expireTime = 18000000;

        // Passing undefined to createStore will result in our app getting the default state
        // If no data is saved, return undefined
        if (!serialisedState) return undefined;

        console.log(currentTime - lastAccessedTime);

        if (currentTime - lastAccessedTime > expireTime) return undefined;

        // De-serialise the saved state, and return it.
        return JSON.parse(serialisedState);
    } catch (err) {
        // Return undefined if localStorage is not available, 
        // or data could not be de-serialised, 
        // or there was some other error
        return undefined;
    }
};

const oldState = loadState();
export const store = createStore(
    combineReducers({
        shop: shopReducers,
        cart: cartReducers,
        user: userReducers,
        userdb: userDBReducers,
        auth: authReducers,
        promo: promoReducers,
    }), oldState
);

const saveState = (state) => {
    try {
        // Convert the state to a JSON string 
        const serialisedState = JSON.stringify(state);
        const currentTime = Date.now();

        // Save the serialised state to localStorage against the key 'app_state'
        window.localStorage.setItem('app_state', serialisedState);
        window.localStorage.setItem('last_accessed', currentTime);
    } catch (err) {
        // Log errors here, or ignore
    }
};

/**
 * Add a change listener to the store, and invoke our saveState function defined above.
 */
store.subscribe(() => {
    saveState(store.getState());
});