import React from 'react'
import { useParams } from 'react-router-dom'

export default function OrderDetails() {
    const { orderId } = useParams()
    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <div>Your Order has been successfull</div>
                <div>Order Id: #{orderId}</div>
            </div>
        </div>
    )
}
