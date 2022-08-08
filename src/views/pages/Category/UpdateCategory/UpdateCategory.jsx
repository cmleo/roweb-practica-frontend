import React, { useState } from 'react';
import FetchApi from '../../../../libs/FetchApi';
import { Button, Form } from 'react-bootstrap';

const UpdateCategory = (id) => {
	const [name, setName] = useState('');
	const [parent_id, setParent_id] = useState('');
	const [errors, setErrors] = useState({
		name: '',
	});

	const _handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'name') {
			setName(value);
		}

		if (name === 'parent_id') {
			setParent_id(value);
		}
	};
	const _validate = () => {
		let isValid = true;
		const tmpErrors = { ...errors };

		if (!name.length) {
			tmpErrors.name = 'Name field cannot be empty';
			isValid = false;
		}
		setErrors(tmpErrors);
		return isValid;
	};

	const _updateCategory = async () => {
		const isValid = _validate();
		if (isValid) {
			const payload = {
				name,
				parent_id,
			};
			const res = await FetchApi.update(`/category/${id}`, payload);

			if (!res.isError) {
				return window.location.reload();
			}
		}
	};

	return (
		<div>
			<Form.Group className='mb-3'>
				<div>
					<Form.Label>Name</Form.Label>
				</div>
				<Form.Control name='name' placeholder='Enter name' value={name} onChange={_handleChange} isInvalid={errors.name.length} />
				{!!errors.name.length && <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>}
			</Form.Group>

			<Form.Group className='mb-3'>
				<div>
					<Form.Label>Parent_id</Form.Label>
				</div>
				<Form.Control name='parent_id' placeholder='Enter parentID' value={parent_id} onChange={_handleChange} />
			</Form.Group>

			<div>
				<Button onClick={_updateCategory}>Update</Button>
			</div>
		</div>
	);
};

export default UpdateCategory;
