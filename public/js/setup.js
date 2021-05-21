var tagCount = 0;

const tagSubmit = (event) => {
	event.preventDefault();

	const tag_name = document.querySelector('#tag-input').value;
	console.log('tagSubmit is being run');
	if (tagCount < 6) {
		console.log(this.tagCount);
		this.tagCount++;
		$('.tag-div').append(`
		<h4 class = "new-tag color-${tagCount}">${tag_name}</h4>`);
	} else {
		alert('Cannot add more tags');
	}
};

const projectSetup = async (event) => {
	event.preventDefault();
	console.log('projectSetup is being run');
	const name = document.querySelector('#project-name').value;
	const description = document.querySelector('#project-desc').value;
	const tags = $('.new-tag').toArray();

	const response = await fetch('/api/projects', {
		method: 'POST',
		body: JSON.stringify({ name, description }),
		headers: { 'Content-Type': 'application/json' }
	})
		.then((res) => res.json())
		.then(async (data) => {
			var project_id = data.id;
			for (i = 0; i < tags.length; i++) {
				var tag_name = tags[i].textContent;
				console.log('project_id: ' + project_id);
				const response = fetch('/api/tags', {
					method: 'POST',
					body: JSON.stringify({ tag_name, project_id }),
					headers: { 'Content-Type': 'application/json' }
				}).then((res) => res.json());
			}
			document.location.replace(`/project/${data.id}`);
		});
};

document.querySelector('.new-project-form').addEventListener('submit', projectSetup);
document.querySelector('.tag-input').addEventListener('click', tagSubmit);
