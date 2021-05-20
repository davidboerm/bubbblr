function addMessages(message) {
	$('#messages').prepend(`
		<p>  ${message.user_id} </p>
      <p>  ${message.chat_text} </p>
	  <p>  ${message.dateCreated} </p>`);
}

const sendMessage = async (event) => {
	event.preventDefault();
	const chat_text = document.querySelector('#message').value;

	try {
		const response = await fetch('/api/messages', {
			method: 'POST',
			body: JSON.stringify({ chat_text }),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				response.json();
			})
			.then((response) => {
				console.log(response);
				// socket.emit('inputtedMessage', response);
			});
	} catch (err) {
		console.log(err);
	}
};

document.querySelector('#send').addEventListener('click', sendMessage);

socket.on('sentMessage', addMessages);
