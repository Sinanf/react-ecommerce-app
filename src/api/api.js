import axios from "axios";

export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
  timeout: 15000,
});
