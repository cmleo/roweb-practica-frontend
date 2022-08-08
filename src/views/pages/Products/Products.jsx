import React, { useEffect, useRef, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import FetchApi from '../../../libs/FetchApi';
import classes from './Products.module.scss';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		perPage: 20,
	});
	const dropDown = useRef();

	useEffect(() => {
		const getProducts = async () => {
			setLoading(true);
			const res = await FetchApi.get('/products', { page: pagination.currentPage });

			if (!res.isError) {
				const { data: tmpProducts, ...tmpPagination } = res.data;
				setProducts(tmpProducts);
				setPagination(tmpPagination);
			}
			setLoading(false);
		};
		getProducts();
	}, [pagination.currentPage]);

	const goToPreviousPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
	};

	const goToNextPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
	};

	const handleDropdown = () => {
		setPagination((prev) => ({ ...prev, perPage: dropDown.current.value }));
	};

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
				{pagination.currentPage > 1 && <Button onClick={goToPreviousPage}>Prev</Button>}
				<div>{pagination.currentPage}</div>
				<Button onClick={goToNextPage}>Next</Button>
			</div>

			<div>
				<label>
					<strong>Products</strong> per page:
				</label>
				<select ref={dropDown} onChange={handleDropdown} value={pagination.perPage}>
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
				</select>
			</div>
			<br />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Parrent Id</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.name}</td>
							<td>{product.parent_id || '-'}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Products;
