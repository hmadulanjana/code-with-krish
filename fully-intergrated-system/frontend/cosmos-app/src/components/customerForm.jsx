import React, { useState } from "react";
import { createCustomer } from "../services/customer-service";

function CustomerForm({ fetchAllCustomers }) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");



  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    const customer = {
      name:customerName,
      email,
      address
    };

    try {
      await createCustomer(customer);
      alert("Successfully created customer");
      fetchAllCustomers();
      setCustomerName("");
      setEmail("");
      setAddress("");
    } catch (error) {
      alert(error.name);
    }
  };

  return (
    <>
      <p className="fs-5 fw-semibold mb-4">Create Customer</p>
      <form
        onSubmit={handleCustomerSubmit}
        className="bg-light p-5 rounded shadow w-50"
      >
        <label className="form-label">Name</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          className="form-control mb-2"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <label className="form-label">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control mb-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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

export default CustomerForm;
