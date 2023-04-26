import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const { cart } = props;


    let price = 0;
    const shipping = 60;
    let total = 0;
    let name;
    let totalQuantity = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        totalQuantity = totalQuantity + product.quantity;
        name = product.name;
        price = price + product.price * product.quantity;
        price = parseFloat(price.toFixed(2));
    }
    const vat = Math.ceil(price * 0.1);
    if (price > 0) {
        total = (price + vat + shipping).toFixed(2);
    }
    else {
        total = 0;
    }
    return (
        <div className='cart'>
            <h2 className='text-2xl  font-bold'>Order Summery</h2>

            <h4 className=' text-xl text-justify pl-6'>Items Ordered:{totalQuantity}</h4>
            <p className=' text-xl text-justify pl-6'>Price:${price}</p>
            <p className=' text-xl text-justify pl-6'>Shipping:${shipping}</p>
            <p className=' text-xl text-justify pl-6'>Vat:${vat}</p>
            <p className=' text-xl text-justify pl-6'>Total Price:${total}</p>
            {props.children}


        </div>
    );
};

export default Cart;