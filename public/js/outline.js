async function outlineHandeler(project) {
	let projectName;
	const response = await fetch(`/api/projects/${project.message_id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then((response) => response.json())
		.then((data) => {
			userName = data.name;
		});
	$('#projects').prepend(`
	<h4> ${projectName} </h4>
    <p>  ${project.message} </p>
    `);
}
