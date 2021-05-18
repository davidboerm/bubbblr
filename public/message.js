const initializeMessages = async (data) => {
	try {
		const response = await fetch('/', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		console.log(response);
	} catch (err) {
		console.log(err);
	}
};

function addMessages(message) {
	$('#messages').prepend(`
      <h4> ${message.name} </h4>
      <p>  ${message.text} </p>`);
}

const sendMessage = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#name').value;
	const text = document.querySelector('#message').value;
	try {
		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({ name, text }),
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.log(err);
	}
	socket.emit('inputtedMessage', { name, text });
};

document.querySelector('#send').addEventListener('click', sendMessage);

socket.on('sentMessage', addMessages);
socket.on('initialize', initializeMessage);
