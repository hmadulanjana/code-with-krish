import React from "react";

function CustomerDetails({customers}) {
  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerDetails;
