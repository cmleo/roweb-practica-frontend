import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import classes from './ResendVerifyEmail.module.scss';
import reusable from '../../../resources/css/Reusable.scss';
import FetchApi from '../../../libs/FetchApi';

const ResendVerifyEmail = () => {
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

		setErrors(tmpErrors);
		return isValid;
	};

	const _resendEmail = async () => {
		const isValid = _validate();

		if (isValid) {
			const payload = {
				email,
			};

			const res = await FetchApi.create('/resend-verify-email', payload);

			if (!res.isError) {
				return navigate('/login');
			}
		}
	};

	return (
		<section className={reusable.container_main}>
			<div className={reusable.container_content}>
				<div className={classes.text}>
					<h1>Resend Verify Email</h1>
				</div>

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
				<div className={classes.text}>
					<p>
						<strong>Forgotten your password?</strong>
					</p>
					<div>
						<p>Enter your e-mail address, and we'll send you a code that allow you verify it.</p>
					</div>
				</div>
				<div className={classes.btnContainer}>
					<Button onClick={_resendEmail}>Send code</Button>
				</div>
			</div>
		</section>
	);
};

export default ResendVerifyEmail;
