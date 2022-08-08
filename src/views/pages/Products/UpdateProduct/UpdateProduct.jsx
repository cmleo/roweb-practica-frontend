import { useState } from 'react';

const UpdateProduct = () => {
	const [productName, setProductName] = useState('');
	const [categoryID, setCategoryID] = useState('');
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [status, setStatus] = useState(0);

	const updateProduct = () => {
		const payload = {
			productName,
			categoryID,
			description,
			quantity,
			price,
			status,
		};
	};
	return <div>UpdateProduct</div>;
};

export default UpdateProduct;
