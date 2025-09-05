import axios from "axios";

const pumaInstance = axios.create({
  baseURL:  import.meta.env.VITE_BASE_URL, // API əsas ünvanı
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

export default pumaInstance;