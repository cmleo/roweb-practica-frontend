import { useState } from 'react';

const UpdateImage = () => {
	const [image, setImage] = useState('');

	const updateProductImage = () => {
		const payload = {
			image,
		};
	};
	return <div>UpdateImage</div>;
};

export default UpdateImage;
