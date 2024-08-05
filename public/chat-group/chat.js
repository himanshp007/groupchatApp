window.addEventListener('DOMContentLoaded', (event) => {
    if (!localStorage.getItem("message")) {
        localStorage.setItem("message", JSON.stringify([]));
    }
    const token = localStorage.getItem('token');

    fetchChats();

    const chatbox = document.getElementById('messageForm');
    chatbox.addEventListener('submit', function (event) {
        event.preventDefault();
        handlePostChat(event);
    });

    setInterval(fetchChats, 1000);
});

function fetchChats() {
    const localMessage = JSON.parse(localStorage.getItem("message")) || [];
    const lastMessageId = localMessage.length > 0 ? localMessage[localMessage.length - 1].id : -1;

    const token = localStorage.getItem('token');

    axios.get(`http://localhost:3000/chat/getchats/${lastMessageId}`, { headers: { 'Authorization': token } })
        .then((response) => {
            const data = response.data.chats;
            const messageArray = data.map(chat => ({
                id: chat.id,
                chat: chat.chat
            }));

            const finalArray = localMessage.concat(messageArray);
            localStorage.setItem("message", JSON.stringify(finalArray));
            displayChats();
        })
        .catch(err => {
            console.log(err);
        });
}

function displayChats() {
    const data = JSON.parse(localStorage.getItem('message'));

    const ul = document.getElementsByClassName('messageul')[0];
    ul.innerHTML = "";

    data.forEach((message, index) => {
        const li = document.createElement('li');
        li.id = (index % 2 === 0) ? "mymessage" : "othermessage";
        li.innerHTML = message.chat;
        ul.appendChild(li);
    });
}

function handlePostChat(event) {
    const formData = event.target.elements;
    const messages = { chat: formData.chat.value };
    const token = localStorage.getItem('token');

    axios.post("http://localhost:3000/chat/sendchats", messages, { headers: { 'Authorization': token } })
        .then((response) => {
            fetchChats();
            clearForm();
        })
        .catch(err => {
            console.log(err);
        });
}

function clearForm() {
    document.getElementById("sendchat").value = "";
}
