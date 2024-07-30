window.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSignup(event);
    })

    const login = document.getElementById('log');
    login.addEventListener('click', (event) => {
        redirectToLogin();
    });
});


function handleSignup(event){
    const formData = event.target.elements;

    const signUpData = {
        name: formData.name.value,
        email: formData.email.value,
        phone: formData.phone.value,
        password: formData.password.value,
    }
    const message = document.getElementById('message');

    axios.post('http://localhost:3000/user/signup', signUpData)
        .then(response => {
            message.innerHTML = response.data.message;
            window.location.href = '.././login/login.html';
        })
        .catch(err => {
            message.innerHTML = err.response.data.message;
        })
};

function redirectToLogin() {
    window.location.href = '.././login/login.html';
}

function clearform() {
    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
}
