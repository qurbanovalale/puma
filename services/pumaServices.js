import pumaInstance from "../src/api/axiosInstance";

const getAllCategories = async () => {  // Named export
    try {
        const res = await pumaInstance.get(`/categories`);
        return res.data;
    } catch (error) {
        console.error(error?.message || "Error fetching categories");
        throw error;
    }
};

const getAllProducts = async () => {  // Named export
    try {
        const res = await pumaInstance.get(`/products`);
        return res.data;
    } catch (error) {
        console.error(error?.message || "Error fetching categories");
        throw error;
    }
};

const getProductById = async (id) => {  // Named export
    try {
        const res = await pumaInstance.get(`/products/${id}`);
        return res.data;
    } catch (error) {
        console.error(error?.message || "Error fetching categories");
        throw error;
    }
};

export {
    getAllCategories,
    getAllProducts,
    getProductById
}

