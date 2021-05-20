async function addMessages(message) {
	let userName;
	const response = await fetch(`/api/users/${message.user_id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then((response) => response.json())
		.then((data) => {
			userName = data.name;
			// socket.emit('inputtedMessage', data.user_id, data.chat_text, data.createdAt);
		});

	$('#messages').prepend(`
	<h4> ${userName} </h4>
    <p>  ${message.chat_text} </p>
    <p>  ${message.updatedAt} </p>
`);
}

const sendMessage = async (event) => {
	event.preventDefault();
	const chat_text = document.querySelector('#message').value;

	const response = await fetch('/api/messages', {
		method: 'POST',
		body: JSON.stringify({ chat_text }),
		headers: { 'Content-Type': 'application/json' }
	})
		.then((response) => response.json())
		.then((data) => {
			socket.emit('inputtedMessage', data);
		});
};

document.querySelector('#send').addEventListener('click', sendMessage);

socket.on('sentMessage', addMessages);
