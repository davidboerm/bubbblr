const projectSetup = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#post-title').value;
	const body = document.querySelector('#post-body').value;

	const response = await fetch('/api/projects/', {
		method: 'POST',
		body: JSON.stringify({ title, body }),
		headers: { 'Content-Type': 'application/json' }
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	}
};

document.querySelector('.post-form').addEventListener('submit', postHandler);
