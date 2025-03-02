import React, { useState } from "react";
import { createProduct } from "../services/product-service";

function ProductForm({ fetchAllProducts }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name:productName,
      price,
      quantity
    };
    try {
      await createProduct(product);
      alert("Successfully created product");
      fetchAllProducts();
      setProductName("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      alert(error.name);
    }
  };

  return (
    <>
      <p className="fs-5 fw-semibold mb-4">Create Product</p>
      <form
        onSubmit={handleProductSubmit}
        className="bg-light p-5 rounded shadow w-50"
      >
        <label className="form-label">Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          className="form-control mb-2"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
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

export default ProductForm;
