var tagCount = 0;

function eraseText() {
	document.getElementById('output').value = '';
}

const tagSubmit = (event) => {
	event.preventDefault();

	const tag_name = document.querySelector('#tag-input').value;
	console.log('tagSubmit is being run');
	if (tagCount < 6) {
		console.log(this.tagCount);
		this.tagCount++;
		$('.tag-list').append(`<li class="list-group-item">
		<h5 class="new-tag" style="float: left;">${tag_name}</h5>
		<button type="button" class="btn btn-danger tag-remove" id="tag-remove" style="float: right;">Remove</button>
		</li>`);
		$('.tag-remove').click(removeDiv);
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

const removeDiv = (event) => {
	event.preventDefault();
	console.log('tagRemove is running');
	$(event.currentTarget).closest('li').remove();
	this.tagCount--;
	console.log(this.tagCount);
};

document.querySelector('.new-project-form').addEventListener('submit', projectSetup);
document.querySelector('.tag-submit').addEventListener('click', tagSubmit);
