import axios from 'axios';

axios.post('http://localhost:8000/api/login', {
    email: 'user@example.com',
    password: 'password123'
})
.then(response => {
    // Store the access token for future requests
    const token = response.data.token;
    // Do something with the token
})
.catch(error => {
    console.error(error);
});