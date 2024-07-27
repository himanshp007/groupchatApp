window.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSignup(event);
    })
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
        })
        .catch(err => {
            message.innerHTML = err.response.data.message;
        })
};

