async function request(url, params = {}, method = 'GET') {
	let endpoint = `${process.env.REACT_APP_API_URL}/api${url}`;

	const options = {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	const sessionCsrf = window.sessionStorage.getItem('csrf');

	if (!sessionCsrf) {
		await fetch(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`);
		window.sessionStorage.setItem('csrf', '1');
	}

	const token = window.sessionStorage.getItem('token');

	if (token) {
		options.headers['Authorization'] = `Bearer ${window.sessionStorage.getItem('token')}`;
	}

	if (method === 'GET') {
		if (Object.keys(params).length) {
			endpoint += `?${objectToQueryString(params)}`;
		}
	} else {
		if (params instanceof FormData) {
			options.body = params;
			delete options.headers['Content-Type'];
		} else {
			options.body = JSON.stringify(params);
		}
	}

	try {
		const response = await fetch(endpoint, options);
		const result = await response.json();

		if (response.status === 419) {
			window.sessionStorage.removeItem('csrf');
			window.location.reload();
		}

		if (response.status === 401) {
			window.sessionStorage.removeItem('token');
			window.location = '/login';
		}

		if (!result.status) {
			return generateErrorResponse(result);
		}

		result.isError = false;
		return result;
	} catch (err) {
		return generateErrorResponse(err);
	}
}

function objectToQueryString(obj) {
	return Object.keys(obj)
		.map((key) => `${key}=${obj[key]}`)
		.join('&');
}

function generateErrorResponse(result) {
	return {
		isError: true,
		errors: result.errors,
		message: result.message,
	};
}

const get = (url, params) => {
	return request(url, params);
};

const create = (url, params) => {
	return request(url, params, 'POST');
};

const update = (url, params) => {
	return request(url, params, 'PUT');
};

const remove = (url, params) => {
	return request(url, params, 'DELETE');
};

export default {
	get,
	create,
	update,
	remove,
};
