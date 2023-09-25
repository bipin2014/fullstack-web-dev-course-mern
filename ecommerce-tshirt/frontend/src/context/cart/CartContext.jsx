import { createContext } from 'react';

export const CartContext = createContext({
    cart: null,
    addToCart: () => { },
    getCarts: () => { },
    saveCarts: () => { }
});