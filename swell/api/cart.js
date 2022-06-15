import fetchApi from '../fetch-swell-api';

export const getCart = async () => {
    const cart = await fetchApi('cart', 'get');

    return cart;
}

export const addCart = async (item) => {
    const cart = await fetchApi('cart', 'addItem', item);

    return cart;
}

export const addVoucher = async (coupon) => {
    const cart = await fetchApi('cart', 'applyCoupon', coupon);

    return cart;
}
export const removeVoucher = async (coupon) => {
    const cart = await fetchApi('cart', 'removeCoupon');

    return cart;
}
export const updateCart = async (items) => {
    const cart = await fetchApi('cart', 'setItems', items);

    return cart;
}
// await swell.cart.updateItem('7d51p8ce72f5542e009fa4c8', {
//     quantity: 2
//   })
export const updateItemCart = async (id, obj) => {
    const cart = await fetchApi('cart', 'updateItem', obj, id);

    return cart;
}

export const removeFromCart = async (id) => {
    const cart = await fetchApi('cart', 'removeItem', id);

    return cart;
}