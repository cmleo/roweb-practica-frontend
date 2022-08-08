import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FetchApi from '../../../libs/FetchApi';

const ChangePassword = () => {
	const [code, setCode] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({
		code: '',
		email: '',
		password: '',
		confirmPassword: '',
		matchPasswords: '',
	});

	const navigate = useNavigate();

	const _handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'code') {
			setCode(value);
		}
		if (name === 'email') {
			setEmail(value);
		}
		if (name === 'password') {
			setPassword(value);
		}
		if (name === 'confirmPassword') {
			setConfirmPassword(value);
		}

		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!code.length) {
			tmpErrors.code = 'Code field cannot be empty';
			isValid = false;
		}

		if (!email.length) {
			tmpErrors.email = 'Email field cannot be empty';
			isValid = false;
		}

		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			tmpErrors.email = 'Please enter a valid email address';
			isValid = false;
		}

		if (!password.length) {
			tmpErrors.password = 'Password field cannot be empty';
			isValid = false;
		}

		if (!confirmPassword.length) {
			tmpErrors.confirmPassword = 'Confirm password field cannot be empty';
			isValid = false;
		}

		if (!(confirmPassword === password)) {
			tmpErrors.matchPasswords = 'Passwords do not match';
			isValid = false;
		}

		setErrors(tmpErrors);
		return isValid;
	};

	const _resetPassword = () => {
		const isValid = _validate();

		if (isValid) {
			const payload = {
				code,
				email,
				password,
			};

			const res = FetchApi.create('/change-password', payload);

			if (!res.isError) {
				navigate('/dashboard/profile');
			}
		}
	};

	return (
		<section>
			<div>
				<h1>Change password</h1>
				<div>
					<Form.Group className='mb-3'>
						<Form.Control
							name='code'
							type='input'
							placeholder='Enter code'
							value={code}
							autoFocus={true}
							isInvalid={errors.code.length}
							onChange={_handleChange}
						/>
						{!!errors.code.length && <Form.Control.Feedback type='invalid'>{errors.code}</Form.Control.Feedback>}
					</Form.Group>
				</div>
				<div>
					<Form.Group className='mb-3'>
						<Form.Control
							name='email'
							type='email'
							placeholder='Enter email'
							value={email}
							isInvalid={errors.email.length}
							onChange={_handleChange}
						/>
						{!!errors.email.length && <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>}
					</Form.Group>
				</div>
				<div>
					<Form.Group className='mb-3'>
						<Form.Control
							name='password'
							type='password'
							placeholder='Enter new password'
							value={password}
							isInvalid={errors.password.length}
							onChange={_handleChange}
						/>
						{!!errors.password.length && <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>}
					</Form.Group>
				</div>
				<div>
					<Form.Group className='mb-3'>
						<Form.Control
							name='confirmPassword'
							type='password'
							placeholder='Confirm new password'
							value={confirmPassword}
							isInvalid={errors.confirmPassword.length}
							onChange={_handleChange}
						/>
						{!!errors.confirmPassword.length && (
							<Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
						)}
					</Form.Group>
				</div>
				{!!errors.matchPasswords.length && errors.matchPasswords}
				<Button onClick={_resetPassword}>Reset password</Button>
			</div>
		</section>
	);
};

export default ChangePassword;
