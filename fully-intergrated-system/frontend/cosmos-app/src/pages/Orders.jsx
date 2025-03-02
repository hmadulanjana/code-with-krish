import React, { useEffect, useState } from "react";
import OrderForm from "../components/orderForm";
import OrderTable from "../components/orderTable";
import {getAllOrders } from "../services/order-service";

function Order() {
  const [orders, setOrders] = useState([])

  const fetchData = () => {
    getAllOrders().then(response => {
      setOrders(response.data)
    }).catch(error => {
      alert(error.message);
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <OrderForm fetchData={fetchData} />
      <OrderTable orders={orders} fetchData={fetchData}/>
    </>
  );
}

export default Order;
