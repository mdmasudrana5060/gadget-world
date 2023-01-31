
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const MyOrder = () => {
    const [user] = useAuthState(auth);
    const [myOrder, setMyOrder] = useState([]);


    const navigate = useNavigate();
    const email = user.email;
    useEffect(() => {

        fetch(`https://gadget-world-server-flax.vercel.app/orders?email=${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => {

                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    navigate('/login')
                }

                return res.json();
            })
            .then(data => {
                setMyOrder(data)


            })





    }, []);
    const carts = []

    if (myOrder.length === 0) {
        <Loading></Loading>

    }
    else {
        const length = myOrder.length - 1;
        const order = myOrder[length];
        const products = order.cart;
        console.log(products);
        carts.push(...products)



    }
    console.log(carts);



















    return (
        <div className='mb-72'>
            <h2 className='text-center text-4xl text-secondary' >My Order{myOrder.length}</h2>
            {
                carts.map(cart => <li className='mx-8'>{cart.name}</li>)
            }



        </div>
    );
};

export default MyOrder;