import axios from "axios";

export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
  timeout: 30000, // 15s -> 30s (uykudan uyanma gecikmeleri için)
});
