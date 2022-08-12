import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import store from '../../state/store';

const Protected = ({ children }) => {
	const { state } = useContext(store);
	return state.user ? children : <Navigate to='/login' />;
};

export default Protected;
