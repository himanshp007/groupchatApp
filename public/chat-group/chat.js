
window.addEventListener('DOMContentLoaded', (event)=> {
    const token = localStorage.getItem('token');

    axios.get("http://localhost:3000/chat/getchats", {headers: {'Authorization': token}})
    .then((response)=> {
        displayChats();
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


function displayChats() {

    const token = localStorage.getItem('token');

    axios.get("http://localhost:3000/chat/getchats", {headers: {'Authorization': token}})
    .then((response)=> {
        const data = response.data.chats;
        console.log(data)

        const ul = document.getElementsByClassName('messageul')[0];
        ul.innerHTML = "";

        for (let i = 0; i < data.length; i++){
            
            const li = document.createElement('li');
            if(i%2 === 0) {
                li.id = "mymessage";
            } else {
                li.id = "othermessage";
            }
            li.innerHTML = data[i].chat;
            ul.appendChild(li);
        }
    })
    .catch(err => {
        console.log(err)
    })    
}


function handlePostChat(event) {

    const formData = event.target.elements;

    const messages = {
        chat: formData.chat.value,
    }
    const token = localStorage.getItem('token');

    axios.post("http://localhost:3000/chat/sendchats", messages, {headers: {'Authorization': token}})
    .then((response)=> {
        displayChats();
        clearform();
    })
    .catch(err => {
        console.log(err)
    })
}

function clearform() {
    document.getElementById("sendchat").value = "";
}