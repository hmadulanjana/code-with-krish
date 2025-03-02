import axios from "axios";

const baseUrl = "http://localhost:3002/customers";

export const createCustomer = async (customer) => {
  return await axios.post(baseUrl, customer);
};

export const getAllCustomers = async () => {
  return await axios.get(baseUrl);
};
