import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import FetchApi from '../../../libs/FetchApi';

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		perPage: 20,
	});

	useEffect(() => {
		const getCategories = async () => {
			setLoading(true);
			const res = await FetchApi.get('/categories', { page: pagination.currentPage });

			if (!res.isError) {
				const { data: tmpCategories, ...tmpPagination } = res.data;
				setCategories(tmpCategories);
				setPagination(tmpPagination);
			}
			setLoading(false);
		};
		getCategories();
	}, [pagination.currentPage]);

	const goToPreviousPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
	};

	const goToNextPage = () => {
		setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
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
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Parrent Id</th>
					</tr>
				</thead>
				<tbody>
					{categories?.map((category) => (
						<tr key={category.id}>
							<td>{category.id}</td>
							<td>{category.name}</td>
							<td>{category.parent_id || '-'}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Categories;
