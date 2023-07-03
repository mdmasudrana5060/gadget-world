import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Rating from 'react-rating';

const Product = (props) => {
    const { handleAddToCart, product, handleDelete } = props;
    const { name, price, img, star, _id } = props.product;
    return (
        <div className="card bg-base-100 shadow-xl card-normal ">
            <figure className="px-10 pt-10">
                <img src={img} className="rounded-xl" alt="" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p className='text-secondary text-xl font-bold '>
                    <Rating
                        emptySymbol="fa-regular fa-star"
                        fullSymbol="fa-solid fa-star"
                        readonly
                        initialRating={star}>

                    </Rating>
                </p>
                <p className='text-secondary text-xl font-bold '>Price:${price}</p>

                <div className="card-actions">
                    <button className="btn btn-primary " onClick={() => handleAddToCart(product)}>    <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon><p className='ml-1'> Add To Cart</p></button>
                    <button className="btn btn-primary " onClick={() => handleDelete(product)}>delete</button>




                </div>
            </div>
        </div>
    );
};

export default Product;