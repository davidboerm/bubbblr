async function addMessages(message) {
	let userName;
	const date = new Date();
	let currentDate = date.toLocaleDateString();
	let currentTime = date.toLocaleTimeString();
	const response = await fetch(`/api/users/${message.user_id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then((response) => response.json())
		.then((data) => {
			userName = data.name;
		});

	$('#messages').prepend(
		`<div class= "chat-bubble">

		<h4>${message.chat_text} </h4>
	   <h6> Posted by: ${userName} </h6>
	   <p>  ${currentDate} at ${currentTime} </p>
	 </div>`
	);
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
