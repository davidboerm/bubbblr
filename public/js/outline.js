// async function outlineHandeler(project) {
// 	let projectName;
// 	const response = await fetch(`/api/project/${1}`, {
// 		method: 'GET',
// 		headers: { 'Content-Type': 'application/json' }
// 	})
// 		.then((response) => response.json())
// 		.then((data) => {
// 			userName = data.name;
// 		});
// 	$('#projects').prepend(`
// 	<h4> ${projectName} </h4>
//     <p>  ${project.message} </p>
//     `);
// }

async function outlineMessageHandeler(message) {
	let messageText;
	const response = await fetch(`/api/projects/1`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
console.log(response)
	$('#messages').prepend(`
		<h4> ${message} <h4>
	`)
}
outlineMessageHandeler();