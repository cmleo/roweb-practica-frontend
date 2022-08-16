import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
	requestCreateProduct,
	requestDeleteProduct,
	requestGetCategory,
	requestGetProduct,
	requestUpdateProduct,
	requestUpdateProductImage,
} from '../../../../state/api';

const Product = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const edit = id !== 'new';
	const [product, setProduct] = useState({
		category_id: '',
		name: '',
		description: '',
		quantity: '',
		price: '',
		status: '',
		image_url: '',
	});

	const [category, setCategory] = useState({});

	useEffect(() => {
		const getData = async () => {
			const productRes = await requestGetProduct({ id });
			const categoryRes = await requestGetCategory(productRes.data.category_id);

			if (!productRes.isError) {
				setProduct(productRes.data);
			}

			if (!categoryRes.isError) {
				setCategory(categoryRes.data);
			}
		};

		if (edit) {
			getData();
		}
	}, [id, edit]);

	const _handleChange = (e) => {
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const _handleImageChange = (e) => {
		setProduct((prev) => ({ ...prev, image_url: e.target.files[0] }));
	};

	const _saveProduct = async () => {
		let payload = null;
		let productRes = null;

		if (edit) {
			payload = { ...product };
			const imageFormData = new FormData();
			imageFormData.append('image', product.image_url, 'test.png');
			delete payload.image_url;

			const [res1, res2] = await Promise.all([
				requestUpdateProduct({ id, payload }),
				requestUpdateProductImage({ id, payload: imageFormData }),
			]);

			productRes = res1;

			console.log({ res1, res2 });
			// productRes = await requestUpdateProduct({ id, payload });
			// const productImageRes = await requestUpdateProductImage({ id, payload: imageFormData })
		} else {
			payload = new FormData();
			payload.append('category_id', product.category_id);
			payload.append('name', product.name);
			payload.append('description', product.description);
			payload.append('quantity', product.quantity);
			payload.append('price', product.price);
			payload.append('status', product.status);
			payload.append('image', product.image_url, 'test.png');

			productRes = await requestCreateProduct(payload);
		}

		if (!edit && !productRes.isError) {
			navigate(`/dashboard/products/${productRes.data.id}`);
		}
	};

	const _deleteProduct = async () => {
		await requestDeleteProduct(id);
		navigate('/dashboard/products');
	};

	return (
		<div>
			{product.id && (
				<div>
					<h4>ID</h4>
					<span>{product.id}</span>
					<div>
						<Button onClick={_deleteProduct}>Delete Product</Button>
					</div>

					<h4>Category</h4>
					<div>{category.name}</div>
				</div>
			)}
			<Form.Group className='mb-3'>
				<Form.Label>Name</Form.Label>
				<Form.Control name='name' type='text' placeholder='Enter name' value={product?.name} onChange={_handleChange} />
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>price</Form.Label>
				<Form.Control name='price' type='text' placeholder='Enter price' value={product?.price} onChange={_handleChange} />
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>quantity</Form.Label>
				<Form.Control name='quantity' type='text' placeholder='Enter quantity' value={product?.quantity} onChange={_handleChange} />
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>description</Form.Label>
				<Form.Control
					name='description'
					type='text'
					placeholder='Enter description'
					value={product?.description}
					onChange={_handleChange}
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>status</Form.Label>
				<Form.Control name='status' type='text' placeholder='Enter status' value={product?.status} onChange={_handleChange} />
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>category_id</Form.Label>
				<Form.Control
					name='category_id'
					type='text'
					placeholder='Enter category_id'
					value={product?.category_id}
					onChange={_handleChange}
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Image </Form.Label>
				{/* <input type="file" accept="image/*" onChange={_handleImageChange} /> */}
				<Form.Control
					name='image_url'
					type='file'
					accept='image/*'
					placeholder='please add an image'
					// value={product?.image_url}
					onChange={_handleImageChange}
				/>
			</Form.Group>

			{product.image_url && <img src={product.image_url} height='200px' width='200px' />}

			<div>
				<Button onClick={_saveProduct}>{edit ? 'Update' : 'Create'}</Button>
			</div>
		</div>
	);
};

export default Product;
