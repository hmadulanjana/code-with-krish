import React, { useEffect, useState } from "react";
import CustomerForm from "../components/customerForm";
import { getAllCustomers } from "../services/customer-service";
import CustomerDetails from "../components/customerDetails";

function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const resp = await getAllCustomers();
      setCustomers(resp.data);
    } catch (error) {
      alert(error.name);
    }
  };



  return (
    <>
      <CustomerForm fetchAllCustomers={fetchAllCustomers} />
      <CustomerDetails
        customers={customers}
      />
    </>
  );
}

export default Customer;
