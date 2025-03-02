import React from "react";

function ProductTable({products}) {
  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
