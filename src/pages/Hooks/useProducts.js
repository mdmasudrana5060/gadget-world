import { useEffect } from "react";
import { useState } from "react"

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);


    useEffect(() => {
        fetch(`hhttp://localhost:5000/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setDisplayProducts(data.products)
            })
    }, []);

    return [products, setProducts, setDisplayProducts, displayProducts]
}
export default useProducts;