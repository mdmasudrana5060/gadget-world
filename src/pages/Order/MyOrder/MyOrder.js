
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

        fetch(`hhttp://localhost:5000/orders?email=${email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
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
                console.log(data)
                setMyOrder(data)


            })





    }, [email]);
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


            <div className="overflow-x-auto m-12">
                <table className="table w-full">


                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            carts?.map((cart, i) => <tr className="active" key={cart._id}>
                                <th>{i + 1}</th>
                                <td>{cart.name}</td>
                                <td>{cart.price}</td>
                                <td>Purple</td>
                            </tr>)
                        }







                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrder;