import React, { useEffect, useState } from "react";
import ProductForm from "../components/productForm";
import ProductTable from "../components/productTable";
import { getAllProducts } from "../services/product-service";

function Product() {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const resp = await getAllProducts();
      setProducts(resp.data);
    } catch (error) {
      alert(error.name);
    }
  };



  return (
    <>
      <ProductForm fetchAllProducts={fetchAllProducts} />
      <ProductTable
        products={products}
      />
    </>
  );
}

export default Product;
