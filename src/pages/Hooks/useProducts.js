import { useEffect, useState } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);


    useEffect(() => {
        fetch(`https://gadget-world-server-henna.vercel.app/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setDisplayProducts(data.products)
            })
    }, []);

    return [products, setProducts, setDisplayProducts, displayProducts]
}
export default useProducts;