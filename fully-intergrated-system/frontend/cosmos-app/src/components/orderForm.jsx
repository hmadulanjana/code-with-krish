import React, { useState } from "react";
import { createOrder } from "../services/order-service";

function OrderForm({ fetchData }) {
  const [customerId, setCustomerId] = useState("");
  const [prodId, setProdId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      customerId,
      items: [
        {
          productId:prodId,
          price,
          quantity,
        },
      ],
    };

    try {
      await createOrder(order);
      fetchData();
      setCustomerId("");
      setProdId("");
      setQuantity("");
      setPrice("");
      alert("Successfully Ordered");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <p className="fs-5 fw-semibold mb-4">Create Order</p>
      <form
        onSubmit={handleSubmit}
        className="bg-light p-5 rounded shadow w-50"
      >
        <label className="form-label">Customer ID</label>
        <input
          type="text"
          id="customerId"
          name="customerId"
          className="form-control mb-2"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />

        <label className="form-label">Product ID</label>
        <input
          type="text"
          id="prodId"
          name="prodId"
          className="form-control mb-2"
          value={prodId}
          onChange={(e) => setProdId(e.target.value)}
          required
        />

        <label className="form-label">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          className="form-control mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label className="form-label">Quantity</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          className="form-control mb-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <input
          type="submit"
          value="Submit"
          className="mt-3 w-100 btn btn-primary"
        />
      </form>
    </>
  );
}

export default OrderForm;
