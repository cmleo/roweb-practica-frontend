import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDebounce } from '../../../hooks';
import FetchApi from '../../../libs/FetchApi';
import { requestDeleteProduct } from '../../../state/api';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productName, setProductName] = useState('');

	const searchValue = useDebounce(productName, 500);

	const [pagination, setPagination] = useState({
		currentPage: 251,
		perPage: 20,
	});

	useEffect(() => {
		const getproducts = async () => {
			setLoading(true);
			const res = await FetchApi.get('/products', { search: searchValue });

			if (!res.isError) {
				const { data: tmpproducts, ...tmpPagination } = res.data;
				setProducts(tmpproducts);
				setPagination(tmpPagination);
			}
			setLoading(false);
		};
		getproducts();
	}, [pagination.currentPage, searchValue]);

	const goToPreviousPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
	};

	const goToNextPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
	};

	const _deleteProduct = (id) => async (e) => {
		await requestDeleteProduct(id);
		setProducts((prev) => prev.filter((product) => product.id !== id));
		// navigate('/dashboard/products');
	};
	console.log(productName);
	// console.log(_deleteProduct(1)(''))

	if (loading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	return (
		<div>
			<div>
				<Link to='/dashboard/products/new'>
					<Button>Create New Product</Button>
				</Link>
			</div>
			<div>
				{pagination.currentPage > 1 && <Button onClick={goToPreviousPage}>Prev</Button>}
				<div>{pagination.currentPage}</div>
				<Button onClick={goToNextPage}>Next</Button>
			</div>

			<h4>Product Name</h4>
			<input type='text' placeholder='Search for product' value={productName} onChange={(e) => setProductName(e.target.value)} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>description</th>
						<th>price</th>
						<th>quantity</th>
						<th>status</th>
						<th>category_id</th>
						<th>image_url</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<tr key={product.id}>
							<td>
								<Link to={`/dashboard/products/${product.id}`}>{product.id}</Link>
							</td>
							<td>{product.name}</td>
							<td>{product.description}</td>
							<td>{product.price}</td>
							<td>{product.quantity}</td>
							<td>{product.status}</td>
							<td>{product.category_id}</td>
							<td>
								<img
									src={
										product.image_url ||
										'https://media-exp1.licdn.com/dms/image/C4E0BAQFGb59iv7HYtQ/company-logo_200_200/0/1519886651684?e=2147483647&v=beta&t=HwaexeYqbErOTPnJxfhJ5n5yPTT7pm-YteqyWrJo63s'
									}
									height='30px'
									width='30px'
								/>
							</td>
							<td>
								<Button onClick={_deleteProduct(product.id)}>Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Products;
