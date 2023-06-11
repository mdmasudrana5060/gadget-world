import React, { useContext } from 'react';
import useCart from '../../Hooks/useCart';
import { useForm } from 'react-hook-form';
import { clearTheCart } from '../../../Utilities/localStorage';
import { AuthContext } from '../../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const [cart, setCart] = useCart();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();



    let price = 0;
    const shipping = 60;
    let total='$';
   
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
        total =total+ (price + vat + shipping).toFixed(2);
    }





    const onSubmit = (data) => {
        const order = {
            ...data,
            cart:cart,
            total:total,
        }
        

        
          


        fetch('https://gadget-world.onrender.com/orders', {
            method: "POST",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
                'content-type': "application/json"

            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then((result => {
                if (result.insertedId) {
                    window.alert('order done successfully');
                    reset()
                    clearTheCart();
                    navigate('/');
                }
            }))
    }
    return (
        <div className='mb-40 ms-50 ' >
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex justify-center  '>

                <div className="personal-detail">
                    <input type="text" name="" {...register("name", { required: true })} placeholder="Enter Your Name"
                        defaultValue={user.displayName || user.name} className="input input-bordered w-full max-w-xs pb-1" id="" required /> <br />
                    <input type="email" name="" {...register("email", { required: true })} placeholder="Email" defaultValue={user.email} className="input input-bordered w-full max-w-xs  pb-2.5" readOnly /> <br />
                    <input type="number" name="" {...register("phone", { required: true })} placeholder="Phone" className="input input-bordered w-full max-w-xs  pb-2.5" />
                    <br />
                    <input type="text" name="address"  {...register('address')} placeholder="Address" className="input input-bordered w-full max-w-xs  " /> <br />
                <input value={total} readOnly className="input input-bordered w-full max-w-xs " /> <br /> <br />

                    <button type="submit" className="btn btn-warning"> Checkout</button>

                </div>





            </form>

        </div>
    );
};

export default CheckOut;