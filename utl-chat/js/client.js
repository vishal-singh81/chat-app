const socket = io('http://localhost:5000')
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('msgInp');
const messageContainer = document.getElementById('container');
var audio = new Audio('audio.mp3');

const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if(position === 'left'){
        audio.play();
    }

}

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send-chat-message', message);
    messageInput.value = '';
})

const name = prompt('What is your name?');
socket.emit('new-user', name);

socket.on('user-connected', name => {
    append(`${name} joined the chat`, 'left');
})

socket.on('chat-message', data => {
    append(`${data.name}: ${data.message}`,'left');
});
socket.on('user-disconnected', name => {
    append(`${name} left the chat`, 'left');
})
