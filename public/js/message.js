function addMessages(message) {
	$('#messages').prepend(`
      <p>  ${message.chat_text} </p>`);
}

const sendMessage = async (event) => {
	event.preventDefault();

	const chat_text = document.querySelector('#message').value;
	try {
		const response = await fetch('/api/messages', {
			method: 'POST',
			body: JSON.stringify({ chat_text }),
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.log(err);
	}
	socket.emit('inputtedMessage', { chat_text });
};

document.querySelector('#send').addEventListener('click', sendMessage);

socket.on('sentMessage', addMessages);
