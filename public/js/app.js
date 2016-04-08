
var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server');
});

// modify function to 
socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New message: ');
	console.log(message.text);

	jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>');
});

// Handles submitting od new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault(); // handle the form submission on our own - no refresh needed
	var $message = $form.find('input[name=message]');
	socket.emit('message', {
		text: $message.val()
	});

	// erase contents of input
	$message.val("");

});