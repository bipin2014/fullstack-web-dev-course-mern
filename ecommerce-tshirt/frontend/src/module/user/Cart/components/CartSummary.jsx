import React, { useEffect, useState } from 'react'

export default function CartSummary({ products, onClickCheckout }) {
    const [priceDetails, setPriceDetails] = useState({
        price: 0,
        discount: 0,
    })

    useEffect(() => {
        if (products) {
            let total_price = 0;
            let total_discount = 0;
            products.forEach(cart => {
                total_price += cart.product.price * cart.quantity
                total_discount += (cart.product.price - cart.product.discounted_price) * cart.quantity
            });
            setPriceDetails({
                price: total_price,
                discount: total_discount
            })
        }
    }, [products])

    const { price, discount } = priceDetails


    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
        >
            <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
                Price Details
            </h2>
            <div>
                <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-800">Price (3 item)</dt>
                        <dd className="text-sm font-medium text-gray-900">Rs. {price}</dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <dt className="flex items-center text-sm text-gray-800">
                            <span>Discount</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">- Rs.{discount}</dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <dt className="flex text-sm text-gray-800">
                            <span>Delivery Charges</span>
                        </dt>
                        <dd className="text-sm font-medium text-green-700">Free</dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                        <dd className="text-base font-medium text-gray-900">Rs. {price - discount}</dd>
                    </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                    You will save Rs.{discount} on this order
                </div>

                <button
                    type="button"
                    onClick={onClickCheckout}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                    Checkout And Pay with Esewa
                </button>
            </div>
        </section>
    )
}
