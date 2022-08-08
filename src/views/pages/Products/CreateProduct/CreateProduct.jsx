import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchApi from '../../../../libs/FetchApi';

const CreateProduct = () => {
	const [name, setName] = useState('');
	const [category_id, setCategoryID] = useState('');
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [status, setStatus] = useState(0);
	const [errors, setErrors] = useState({
		name: '',
	});

	const navigate = useNavigate();

	const _handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'name') {
			setName(value);
		}

		if (name === 'category_id') {
			setCategoryID(value);
		}

		if (name === 'description') {
			setDescription(value);
		}

		if (name === 'quantity') {
			setQuantity(value);
		}

		if (name === 'price') {
			setPrice(value);
		}

		if (name === 'image') {
			setImage(value);
		}

		if (name === 'status') {
			setStatus(value);
		}

		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!name.length) {
			tmpErrors.name = 'Name cannot be empty';
			isValid = false;
		}

		if (!category_id.length) {
			tmpErrors.category_id = 'Category Id cannot be empty';
			isValid = false;
		}

		if (!description.length) {
			tmpErrors.description = 'Description cannot be empty';
			isValid = false;
		}

		if (!quantity.length) {
			tmpErrors.quantity = 'Quantity cannot be empty';
			isValid = false;
		}

		if (!price) {
			tmpErrors.price = 'Price cannot be empty';
			isValid = false;
		}

		setErrors(tmpErrors);
		return isValid;
	};

	const _createProduct = async () => {
		const payload = {
			name,
			category_id,
			description,
			quantity,
			price,
			image,
			status,
		};

		const res = await FetchApi.create('/product', payload);
		console.log(res);
		if (!res.isError) {
			return navigate('/dashboard/profile');
		}
	};
	return <div>CreateProduct</div>;
};

export default CreateProduct;
