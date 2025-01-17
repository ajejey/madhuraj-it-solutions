import React from 'react'
import { getOrderDetails } from '../actions'
import OrderDetailsPage from './components/OrderDetailsPage'

const OrderDetails = async({params, searchParams}) => {
  const {orderId} = await params
  const {clearCart} = await searchParams

  console.log("orderId", orderId)
  console.log("clearCart", clearCart)

  const order = await getOrderDetails(orderId)
  console.log("order", order)
  return (
    <div>
      <OrderDetailsPage order={order} shouldClearCart={clearCart} />
    </div>
  )
}

export default OrderDetails