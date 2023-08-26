import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../constants'
import Product from './components/Product'

const Homepage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = () => {
        axios.get(`${apiUrl}/api/products`).then(res => {
            setProducts(res.data)
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            {products.map((product, i) => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    )
}

export default Homepage
