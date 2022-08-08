import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import FetchApi from '../../../libs/FetchApi';
import classes from './Category.module.scss';
import reusable from '../../../resources/css/Reusable.scss';

const Category = () => {
	const { id } = useParams();
	const [category, setCateogry] = useState('');
	const [error, setError] = useState();
	useEffect(() => {
		(async () => {
			const res = await FetchApi.get(`/category/${id}`);
			if (res.isError) {
				return setError(res.message);
			}
			setCateogry(res.data);
		})();
	}, []);

	return (
		<div className={classes.container_main}>
			{!category && !error ? (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			) : error ? (
				<div>
					<p>{error}</p>
				</div>
			) : (
				<div className={classes.container_category}>
					<p>Category ID: {category.id}</p>
					<p>Name: {category.name}</p>
					<p>Parent id: {category.parent_id || 'null'}</p>
				</div>
			)}
		</div>
	);
};

export default Category;
