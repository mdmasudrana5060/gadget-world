import React from 'react';
import { Link } from 'react-router-dom';
import { removeFromDb } from '../../../Utilities/localStorage';
import useCart from '../../Hooks/useCart';
// import useProducts from '../../Hooks/useProducts'
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import "./OrderReview.css";


const OrderReview = () => {
    // const [products] = useProducts();
    const [cart, setCart] = useCart();
  
    const handleRemove = _id => {
        const newCart = cart.filter(product => product._id !== _id);
        setCart(newCart);
        removeFromDb(_id);

    }
    return (
        <div className='order-container'>
            <div >
                {
                    cart.map(product => <ReviewItem
                        product={product}
                        key={product._id}
                        handleRemove={handleRemove}></ReviewItem>)
                }
            </div>
            <div className='cart '>
                <Cart cart={cart}>
                    <Link to='/checkout'>
                        <button className='place btn btn-primary'>Place Order</button>
                    </Link>

                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;