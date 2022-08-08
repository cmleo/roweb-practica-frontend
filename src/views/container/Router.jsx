import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from '../pages/Categories';
import ChangePassword from '../pages/ChangePassword';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import VerifyEmail from '../pages/VerifyEmail';
import Category from '../pages/Category/Category';
import ResendVerifyEmail from '../pages/ResendVerifyEmail/ResendVerifyEmail';
import CreateCategory from '../pages/Category/CreateCategory';
import Products from '../pages/Products/Products';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='verify-email' element={<VerifyEmail />} />
				<Route path='/resend-verify-email' element={<ResendVerifyEmail />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/change-password' element={<ChangePassword />} />
				<Route path='/dashboard' element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='profile' element={<Profile />} />
					<Route path='categories' element={<Categories />} />
					<Route path='products' element={<Products />} />
					<Route path='categories/:id' element={<Category />} />
					<Route path='create-category' element={<CreateCategory />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
