import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import FetchApi from '../../libs/FetchApi';
import store from '../../state/store';

const RequireAuth = ({ children }) => {
	const token = window.sessionStorage.getItem('token');
	const {
		state: { user },
		dispatch,
	} = useContext(store);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			if (token) {
				const userReq = await FetchApi.get('/user');
				if (!userReq.isError) {
					dispatch({ type: 'SET_USER', payload: { ...userReq.data.user } });
				} else {
					dispatch({ type: 'SET_USER', payload: null });
				}
			} else {
				dispatch({ type: 'SET_USER', payload: null });
			}
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	return children;
};

export default RequireAuth;
