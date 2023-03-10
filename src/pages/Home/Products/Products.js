import React from 'react';
import './Products.css'
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product';
import Cart from '../../Order/Cart/Cart';
import { addToCart, getStoredCart, removeFromDb } from '../../../Utilities/localStorage';


import { Link } from 'react-router-dom';
import useCart from '../../Hooks/useCart';



const Products = () => {
    const [products, setProducts] = useState([])

    const [cart, setCart] = useCart();
    const [displayProducts, setDisplayProducts] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const size = 15;


    useEffect(() => {
        fetch(`hhttp://localhost:5000/products?page=${pageNumber}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setDisplayProducts(data.products);
                const count = (data.count);
                const pages = Math.ceil(count / size);
                setPagesCount(pages);


            })
    }, [pageNumber]);




    const handleAddToCart = (product) => {
        let newCart = []
        const exists = cart.find(pd => pd._id === product._id);
        if (exists) {
            const rest = cart.filter(pd => pd._id !== product._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]


        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];

        }


        setCart(newCart);
        addToCart(product._id)

    }
    const handleDelete = (_id) => {
        removeFromDb(_id)
    }
    const handleSearch = e => {
        const searchText = e.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts);
        console.log(matchedProducts.length);
    }



    return (
        <>
            <div className="form-control  ">

                <div className='flex justify-center '>
                    <input type="text" placeholder="Search" className="input input-bordered mt-1 input-md w-full max-w-xs mr-40 " onChange={handleSearch} />
                </div>
            </div>
            <div className="shop-container mt-2 ">

                <div>

                    <div >
                        <div >
                            <h2 className='text-5xl text-center font-bold text-secondary ml-16'>Gadgets</h2>


                        </div>

                    </div>


                    <div className="divider"></div>

                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 mx-10">
                        {
                            displayProducts.map(product => <Product product={product}
                                handleAddToCart={handleAddToCart}
                                handleDelete={handleDelete}
                                key={product._id}>

                            </Product>)
                        }


                    </div>
                    <div className="btn-group m-2.5 flex justify-center pagination">
                        {
                            [...Array(pagesCount).keys()].map(number => <button
                                className={pageNumber === number ? 'btn   ' : 'btn btn-primary'}
                                onClick={() => setPageNumber(number)}>{number + 1}</button>)
                        }
                    </div>
                </div>


                <div className='cart'>
                    <Cart cart={cart}>
                        <Link to="/order">
                            <button className="btn btn-primary ml-6 mt-3">Review your order</button>
                        </Link>
                    </Cart>
                </div>
            </div>

        </>







    );
};

export default Products;