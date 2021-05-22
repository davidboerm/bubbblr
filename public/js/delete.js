const deleteHandler = async (event) => {
	const project_id = $(event.currentTarget).attr('data-project_id');
	const response = await fetch(`/api/projects/${project_id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	}
};

var buttons = document.querySelectorAll('.delete-button').length;

for (var i = 0; i < buttons; i++) {
	document.querySelectorAll('.delete-button')[i].addEventListener('click', deleteHandler);
}
