import FetchApi from '../libs/FetchApi';

const requestGetProduct = async ({ id, ...params }) => {
	return await FetchApi.get(`/product/${id}`, params);
};

const requestCreateProduct = async (params) => {
	return await FetchApi.create('/product', params);
};

const requestUpdateProduct = async ({ id, payload }) => {
	return await FetchApi.update(`/product/${id}`, payload);
};

const requestUpdateProductImage = async ({ id, payload }) => {
	return await FetchApi.create(`/product/${id}/image`, payload);
};

const requestDeleteProduct = async (id) => {
	return await FetchApi.remove(`/product/${id}`);
};

const requestGetCategory = async (id) => {
	return await FetchApi.get(`/category/${id}`);
};

export {
	requestGetProduct,
	requestCreateProduct,
	requestUpdateProduct,
	requestUpdateProductImage,
	requestDeleteProduct,
	requestGetCategory,
};
