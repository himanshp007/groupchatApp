
window.addEventListener('DOMContentLoaded', (event)=> {
    const token = localStorage.getItem('token');

    axios.get("http://localhost:3000/chat/getchats", {headers: {'Authorization': token}})
    .then((response)=> {
        displayChats(response);
    })
    .catch(err => {
        console.log(err)
    })

    const chatbox = document.getElementById('messageForm');
    chatbox.addEventListener('submit', function(event){
        event.preventDefault();
        handlePostChat(event);
    })
});


function displayChats(res) {

    const data = res.data.chats;
    console.log(data)

    const ul = document.getElementsByClassName('messageul')[0];

    data.forEach(chat => {
        const li = document.createElement('li');
        li.id = "mymessage";
        li.innerHTML = chat.chat;
        ul.appendChild(li);
    });

    
}


function handlePostChat(event) {

    const formData = event.target.elements;

    const messages = {
        chat: formData.chat.value,
    }
    const token = localStorage.getItem('token');

    axios.post("http://localhost:3000/chat/sendchats", messages, {headers: {'Authorization': token}})
    .then((response)=> {
        displayChats(response);
    })
    .catch(err => {
        console.log(err)
    })
}