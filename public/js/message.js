function addMessages(message) {
	$('#messages').prepend(`
	<p>  ${message.user.name} </p>
      <p>  ${message.chat_text} </p>
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
			console.log(data.user_id);
			// socket.emit('inputtedMessage', data.user_id, data.chat_text, data.createdAt);
		});
};

document.querySelector('#send').addEventListener('click', sendMessage);

socket.on('sentMessage', addMessages);
