import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Shared/Loading';

const MyOrder = () => {
     const { user, logOut } = useContext(AuthContext);
    const [myOrder, setMyOrder] = useState([]);
    const navigate = useNavigate();
    const email = user.email;
  
 
    
    useEffect(() => {
      fetch(`https://gadget-world.onrender.com/orders?email=${email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
                
            }
        })
            .then(res => {

                if (res.status === 401 || res.status === 403) {
                    logOut();
                    navigate('/login')
                }

                return res.json();
            })
            .then(data => {
                
                setMyOrder(data)
                console.log(data)


            })

    }, [email]);

   
    
    
    const carts = []

    if (myOrder.length === 0) {
        <Loading></Loading>

    }
    else {
       
        const length = myOrder.length - 1;
  
        const order = myOrder[length];
        console.log(order,'order')
        const products = order.cart;
        console.log(order.cart,'order cart');
        console.log(products,'products')
        for(let i=0;i<length;i++){
            carts.push(products)
        }
        console.log(products);
        carts.push(...products)



    }
    console.log(carts,'from carts');

    return (
        <div className='mb-72'>
            {/* <h2 className='text-center text-4xl text-secondary' >My Order{myOrder.length}</h2> */}


            <div className="overflow-x-auto m-12">
                <table className="table w-full">


                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                         
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myOrder?.map((cart, i) => <tr className="active" key={cart._id}>
                                <th>{i + 1}</th>
                                <td>{cart.name}</td>
                                <td>${cart.price}</td>
                             
                            </tr>)
                        }







                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrder;