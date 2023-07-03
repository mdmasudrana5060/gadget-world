const addToCart = (id) => {
    let shoppingCart;
    let storedCart = getDb();
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart)

    }
    else {
        shoppingCart = {}
    }

    const quantity = shoppingCart[id];

    if (quantity) {

        const newQuantity = quantity + 1;
        shoppingCart[id] = newQuantity;

    }
    else {
        shoppingCart[id] = 1;


    }

    updateDb(shoppingCart);
}
const minusFromCart = (id) => {
    let shoppingCart;
    let storedCart = getDb();
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart)

    }
   

    const quantity = shoppingCart[id];

    if (quantity>1) {

        const newQuantity = quantity - 1;
        shoppingCart[id] = newQuantity;

    }
    else{
  
        delete shoppingCart[id];
    }
  

    updateDb(shoppingCart);
}
const getDb = () => localStorage.getItem('shopping-cart');
const updateDb = (cart) => localStorage.setItem('shopping-cart', JSON.stringify(cart));
const getStoredCart = () => {
    let shoppingCart;
    let storedCart = getDb();
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart)

    }
    else {
        shoppingCart = {}
    }
    return shoppingCart;


}
const removeFromDb = id => {
    const exist = getDb();
    if (!exist) {

    }
    else {
        const shoppingCart = JSON.parse(exist);
        delete shoppingCart[id];
        updateDb(shoppingCart)

    }
}

const clearTheCart = () => {
    localStorage.removeItem('shopping-cart')
}
export {
    addToCart,
    removeFromDb,
    clearTheCart,
    getStoredCart,
    minusFromCart
};