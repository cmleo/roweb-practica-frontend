import React, { useEffect, useState } from 'react';
import FetchApi from '../../../libs/FetchApi';
import classes from './Profile.module.scss';

const Profile = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		const getUser = async () => {
			const res = await FetchApi.get('/user');
			if (!res.isError) {
				const tmpUser = res.data.user;
				setUser(tmpUser);
			}
		};
		getUser();
	}, []);

	return (
		<div className={classes.profile}>
			<h2>Hello, {user.name}</h2>
		</div>
	);
};

export default Profile;
