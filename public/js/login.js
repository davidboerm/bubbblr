const loginFormHandler = async (event) => {
	event.preventDefault();

	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			document.location.replace('/chat');
		} else {
			alert('Failed to log in.');
		}
	}
};

const signupFormHandler = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();
	const is_leader = document.querySelector('#leader-check').checked;

	if (name && email && password) {
		console.log('is_leader: ' + is_leader);
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ name, email, is_leader, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok && is_leader) {
			document.location.replace('/setup');
		} else if (response.ok && !is_leader) {
			document.location.replace('/chat');
		} else {
			alert('Failed to sign up.');
		}
	}
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
