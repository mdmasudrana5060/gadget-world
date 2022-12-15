import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../../firebase.init';
import useCart from '../../Hooks/useCart';

const CheckOut = () => {
    const [cart] = useCart();
    const { register, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth);
    console.log(user);
    console.log(cart);
    let price = 0;
    const shipping = 60;
    let total;
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

    console.log(total, 'total');



    const onSubmit = (data) => {
        fetch('https://gadget-world-server-production.up.railway.app/orders', {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({ data, cart })
        })
            .then(res => res.json())
            .then((result => {
                if (result.insertedId) {
                    window.alert('payment done successfully');
                    reset();
                }
            }))
    }
    return (
        <div className='mb-40 ms-50 ' >
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex justify-center  '>

                <div className="personal-detail">
                    <input type="text" name="" {...register("name", { required: true })} placeholder="Enter Your Name"
                        defaultValue={user.displayName} className="input input-bordered w-full max-w-xs pb-1" id="" /> <br />
                    <input type="email" name="" {...register("email", { required: true })} placeholder="Email" defaultValue={user.email} className="input input-bordered w-full max-w-xs  pb-2.5" readOnly /> <br />
                    <input type="text" name="" {...register('phoneNumber')} placeholder="Phone number" className="input input-bordered w-full max-w-xs " /> <br />
                    <input type="text" name="" {...register('address')} placeholder="Address" className="input input-bordered w-full max-w-xs  " /> <br />
                    <input defaultValue={total} readOnly className="input input-bordered w-full max-w-xs " /> <br /> <br />

                    <button type="submit" className="btn btn-warning"> Checkout</button>

                </div>





            </form>

        </div>
    );
};

export default CheckOut;