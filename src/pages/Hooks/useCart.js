import { useEffect, useState } from "react";
import { getStoredCart } from "../../Utilities/localStorage";

const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];

        const keys = Object.keys(storedCart)
        fetch('https://gadget-world-server-p5pu-git-main-mdmasudrana5060.vercel.app/productsByKeys', {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {

                for (const id in storedCart) {

                    const addedProduct = products.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);

                    }

                }
                setCart(savedCart);

            })


    }, []);
    return [cart, setCart];

}
export default useCart;