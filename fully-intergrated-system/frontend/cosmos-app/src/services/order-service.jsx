import axios from "axios";

const baseUrl = "http://localhost:3000/orders";

export const createOrder = async (order) => {
  return await axios.post(baseUrl, order);
};

export const getAllOrders = async () => {
  return await axios.get(baseUrl);
};

export const updateOrderStatus = async (id, status) => {
  console.log(id, status);
  const updateUrl = `http://localhost:3000/orders/${id}/status`;
  return await axios.patch(updateUrl, status);
}

export const getCustomerById = async (id) => {
  const url = `http://localhost:3002/customers/${id}`;
  return await axios.get(url);
}