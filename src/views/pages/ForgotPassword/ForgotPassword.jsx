import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FetchApi from '../../../libs/FetchApi';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [errors, setErrors] = useState({
		email: '',
	});
	const navigate = useNavigate();

	const _handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'email') {
			setEmail(value);
		}
		if (value.length) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};
	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!email.length) {
			tmpErrors.email = 'Email field cannot be empty';
			isValid = false;
		}

		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			tmpErrors.email = 'Please enter a valid email address';
			isValid = false;
		}

		setErrors(tmpErrors);
		return isValid;
	};
	const _sendForgotPasswordCode = async () => {
		const isValid = _validate();

		if (isValid) {
			const payload = {
				email,
			};

			const res = FetchApi.create('/forgot-password', payload);

			if (!res.isError) {
				navigate('/change-password');
			}
		}
	};
	return (
		<section>
			<div>
				<h1>Forgot password</h1>
				<div>
					<Form.Group className='mb-3'>
						<Form.Control
							name='email'
							type='input'
							placeholder='Enter email'
							value={email}
							autoFocus={true}
							isInvalid={errors.email.length}
							onChange={_handleChange}
						/>
						{!!errors.email.length && <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>}
					</Form.Group>
				</div>
				<p>
					<strong>Forgotten your password?</strong>
				</p>
				<p>Enter your e-mail address, and we'll send you a code that allow you to reset it.</p>

				<Button onClick={_sendForgotPasswordCode}>Send code</Button>
			</div>
		</section>
	);
};

export default ForgotPassword;
