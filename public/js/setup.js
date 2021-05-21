const { Tag } = require('../../models');

const projectSetup = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#project-name').value;
	const description = document.querySelector('#project-desc').value;
	// const tags = document.querySelectorAll('#tag').value;
	const response = await fetch('/api/projects', {
		method: 'POST',
		body: JSON.stringify({ name, description }),
		headers: { 'Content-Type': 'application/json' }
	});

	// for(i = 0; i < tags.length; i++){
	//     var tag_name = tags[i];
	//     project_id = 1;
	//     const response = await fetch('/api/tags', {
	//         method: 'POST',
	//         body: JSON.stringify({ tag_name, project_id }),
	//         headers: { 'Content-Type': 'application/json' }
	//     });
	// }
};

document.querySelector('.submit-setup').addEventListener('submit', projectSetup);
