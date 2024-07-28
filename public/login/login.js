window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handlelogin(event);
    })

    const signup = document.getElementById('sign');
    signup.addEventListener('click', (event) => {
        redirectToSignup();
    });
    

});


function handlelogin(event){
    const formData = event.target.elements;

    const loginData = {
        email: formData.email.value,
        password: formData.password.value,
    }
    const message = document.getElementById('message');

    axios.post('http://localhost:3000/user/login', loginData)
        .then(response => {
            message.innerHTML = response.data.message;
        })
        .catch(err => {
            message.innerHTML = err.response.data.message;
        })
};

function redirectToSignup() {

    window.location.href = '.././signup/signup.html';
}
