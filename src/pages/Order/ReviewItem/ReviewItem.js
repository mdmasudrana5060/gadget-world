import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const { name, price, img, quantity, _id } = props.product;
    const { handleRemove } = props;

    return (
        <div className="card card-side bg-base-100  pb-16 m-10">
            <figure><img src={img} alt="Movie" className='w-48 min-w-full md:min-w-0 ' /></figure>
            <div className="card-body ml">
                <h2 className="card-title ">{name}</h2>
                <p>Price:${price}</p>
                <p>Quantity:{quantity}</p>
                <div className="card-actions ">
                    <button onClick={() => handleRemove(_id)} className="btn btn-primary">Remove</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;