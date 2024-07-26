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

    axios.post('http://localhost:3000/signup', signUpData)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
};

