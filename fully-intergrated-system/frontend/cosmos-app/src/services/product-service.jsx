import axios from "axios";

const baseUrl = "http://localhost:3001/products";

export const createProduct = async (product) => {
  return axios.post(baseUrl, product);
};

export const getAllProducts = async () => {
  return axios.get(baseUrl);
};
