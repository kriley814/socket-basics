var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

// update h1 tag
jQuery('.room-title').text(room);

socket.on('connect', function () {
	console.log('Connected to socket.io server');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});
 
socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	console.log('New message: ');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message); // need this for actual message to show up in browser
});

// Handles submitting od new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault(); // handle the form submission on our own - no refresh needed
	
	var $message = $form.find('input[name=message]');
	
	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	// erase contents of input
	$message.val('');

});

